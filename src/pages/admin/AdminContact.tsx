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
  const [whatsapp, setWhatsapp] = useState(data.contact.whatsappNumber);

  useEffect(() => { setWhatsapp(data.contact.whatsappNumber); }, [data.contact]);

  const handleSave = async () => {
    await api.updateContactSettings({ whatsappNumber: whatsapp });
    await refresh();
    toast({ title: 'Número atualizado!' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Contato</h1>
        <Button onClick={handleSave}>Salvar</Button>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm max-w-md">
        <Label>Número do WhatsApp</Label>
        <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="5511999999999" className="mt-2" />
        <p className="text-xs text-muted-foreground mt-2">Formato: código do país + DDD + número (sem espaços ou traços)</p>
      </div>
    </div>
  );
}
