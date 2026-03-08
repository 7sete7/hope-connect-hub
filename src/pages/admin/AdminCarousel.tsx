import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { SlideItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { ImageInput } from '@/components/admin/ImageInput';

export default function AdminCarousel() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SlideItem | null>(null);
  const [form, setForm] = useState({ image: '', title: '', subtitle: '', order: 0 });

  const openCreate = () => {
    setEditing(null);
    setForm({ image: '', title: '', subtitle: '', order: data.slides.length + 1 });
    setDialogOpen(true);
  };

  const openEdit = (slide: SlideItem) => {
    setEditing(slide);
    setForm({ image: slide.image, title: slide.title || '', subtitle: slide.subtitle || '', order: slide.order });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await api.updateSlide(editing.id, form);
      } else {
        await api.createSlide(form);
      }
      await refresh();
      setDialogOpen(false);
      toast({ title: editing ? 'Slide atualizado!' : 'Slide criado!' });
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    await api.deleteSlide(id);
    await refresh();
    toast({ title: 'Slide removido' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Carrossel</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" />Novo slide</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? 'Editar Slide' : 'Novo Slide'}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <ImageInput
                label="Imagem"
                value={form.image}
                onChange={url => setForm(f => ({ ...f, image: url }))}
              />
              <div>
                <Label>Título (opcional)</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Subtítulo (opcional)</Label>
                <Input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Ordem</Label>
                <Input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} className="mt-1" />
              </div>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3">
        {data.slides.sort((a, b) => a.order - b.order).map(slide => (
          <Card key={slide.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <GripVertical className="w-5 h-5 text-muted-foreground shrink-0" />
              <img src={slide.image} alt="" className="w-24 h-16 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{slide.title || '(Sem título)'}</p>
                <p className="text-sm text-muted-foreground truncate">{slide.subtitle || ''}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(slide)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(slide.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
