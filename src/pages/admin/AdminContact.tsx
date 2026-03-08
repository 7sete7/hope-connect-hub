import { useState, useEffect } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminContact() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [form, setForm] = useState(data.contact);

  useEffect(() => { setForm(data.contact); }, [data.contact]);

  const handleSave = async () => {
    await api.updateContactSettings(form);
    await refresh();
    toast({ title: 'Configurações atualizadas!' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Contato</h1>
        <Button onClick={handleSave}>Salvar</Button>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm max-w-lg space-y-5">
        <div>
          <Label>Número do WhatsApp</Label>
          <Input value={form.whatsappNumber} onChange={e => setForm(f => ({ ...f, whatsappNumber: e.target.value }))} placeholder="5551999999999" className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">Formato: código do país + DDD + número</p>
        </div>
        <div>
          <Label>Email</Label>
          <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="contato@exemplo.com" className="mt-2" />
        </div>
        <div>
          <Label>Telefone</Label>
          <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(11) 99999-9999" className="mt-2" />
        </div>
        <div>
          <Label>Endereço</Label>
          <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Rua, número - Cidade, UF" className="mt-2" />
        </div>
      </div>
    </div>
  );
}
