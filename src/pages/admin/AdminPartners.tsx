import { useState } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { PartnerItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PhoneInput, fromWhatsapp, toWhatsapp } from '@/components/admin/PhoneInput';
import { ImageInput } from '@/components/admin/ImageInput';

export default function AdminPartners() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PartnerItem | null>(null);
  const [form, setForm] = useState({ name: '', logo: '', whatsapp: '', instagram: '', website: '' });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', logo: '', whatsapp: '', instagram: '', website: '' });
    setDialogOpen(true);
  };

  const openEdit = (item: PartnerItem) => {
    setEditing(item);
    setForm({
      name: item.name,
      logo: item.logo,
      whatsapp: fromWhatsapp(item.whatsapp || ''),
      instagram: item.instagram || '',
      website: item.website || '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.logo) {
      toast({ title: 'Preencha o nome e a logo', variant: 'destructive' });
      return;
    }
    try {
      const payload = { ...form, whatsapp: toWhatsapp(form.whatsapp), instagram: form.instagram.trim(), website: form.website.trim() };
      if (editing) {
        await api.updatePartner(editing.id, payload);
      } else {
        await api.createPartner(payload);
      }
      await refresh();
      setDialogOpen(false);
      toast({ title: editing ? 'Parceiro atualizado!' : 'Parceiro criado!' });
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    }
  };

  const handleDelete = async (item: PartnerItem) => {
    if (!confirm(`Remover o parceiro "${item.name}"?`)) return;
    try {
      await api.deletePartner(item.id);
      await refresh();
      toast({ title: 'Parceiro removido' });
    } catch {
      toast({ title: 'Erro ao remover', variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Parceiros</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2"><Plus className="w-4 h-4" />Novo parceiro</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Editar Parceiro' : 'Novo Parceiro'}</DialogTitle></DialogHeader>
            <div className="flex flex-col gap-4 mt-2">
              <div><Label>Nome</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="mt-1" /></div>
              <ImageInput
                label="Logo"
                value={form.logo}
                onChange={url => setForm(f => ({ ...f, logo: url }))}
                previewClassName="h-20 w-20 object-contain rounded-lg"
              />
              <div>
                <Label>WhatsApp</Label>
                <PhoneInput
                  value={form.whatsapp}
                  onChange={v => setForm(f => ({ ...f, whatsapp: v }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Instagram</Label>
                <Input value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} placeholder="@perfil ou https://instagram.com/perfil" className="mt-1" />
              </div>
              <div><Label>Website</Label><Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." className="mt-1" /></div>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.partners.map(item => (
          <Card key={item.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <img src={item.logo} alt="" className="w-12 h-12 object-contain rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{item.name}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
