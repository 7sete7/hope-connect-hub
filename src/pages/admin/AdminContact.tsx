import { useState, useEffect } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PhoneInput, fromWhatsapp, toWhatsapp } from '@/components/admin/PhoneInput';

export default function AdminContact() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [form, setForm] = useState({
    whatsappNumber: fromWhatsapp(data.contact.whatsappNumber),
    email: data.contact.email,
    phone: fromWhatsapp(data.contact.phone),
    address: data.contact.address,
  });

  useEffect(() => {
    setForm({
      whatsappNumber: fromWhatsapp(data.contact.whatsappNumber),
      email: data.contact.email,
      phone: data.contact.phone,
      address: data.contact.address,
    });
  }, [data.contact]);

  const handleSave = async () => {
    await api.updateContactSettings({
      whatsappNumber: toWhatsapp(form.whatsappNumber),
      email: form.email,
      phone: form.phone,
      address: form.address,
    });
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
          <PhoneInput
            value={form.whatsappNumber}
            onChange={v => setForm(f => ({ ...f, whatsappNumber: v }))}
            className="mt-2"
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="contato@exemplo.com" className="mt-2" />
        </div>
        <div>
          <Label>Telefone</Label>
          <PhoneInput
            value={form.phone}
            onChange={v => setForm(f => ({ ...f, phone: v }))}
            className="mt-2"
          />
        </div>
        <div>
          <Label>Endereço</Label>
          <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Rua, número - Cidade, UF" className="mt-2" />
        </div>
      </div>
    </div>
  );
}
