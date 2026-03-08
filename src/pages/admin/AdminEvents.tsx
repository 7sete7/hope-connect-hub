import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { EventItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminEvents() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState({ title: '', content: '', image: '', date: '', status: 'published' as 'published' | 'draft' });

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', content: '', image: '', date: new Date().toISOString().split('T')[0], status: 'published' });
    setDialogOpen(true);
  };

  const openEdit = (event: EventItem) => {
    setEditing(event);
    setForm({ title: event.title, content: event.content, image: event.image, date: event.date, status: event.status });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await api.updateEvent(editing.id, form);
      } else {
        await api.createEvent(form);
      }
      await refresh();
      setDialogOpen(false);
      toast({ title: editing ? 'Evento atualizado!' : 'Evento criado!' });
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    await api.deleteEvent(id);
    await refresh();
    toast({ title: 'Evento removido' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await api.uploadImage(file);
    setForm(f => ({ ...f, image: url }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Eventos</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" />Novo evento</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? 'Editar Evento' : 'Novo Evento'}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2 max-h-[70vh] overflow-y-auto">
              <div>
                <Label>Título</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <Label>Conteúdo</Label>
                <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={6} />
              </div>
              <div>
                <Label>Imagem</Label>
                <Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 text-sm" />
              </div>
              <div>
                <Label>Data</Label>
                <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v: 'published' | 'draft') => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Publicado</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3">
        {data.events.map(event => (
          <Card key={event.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <img src={event.image} alt="" className="w-20 h-14 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground truncate">{event.title}</p>
                  <Badge variant={event.status === 'published' ? 'default' : 'secondary'} className="shrink-0">
                    {event.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(event)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
