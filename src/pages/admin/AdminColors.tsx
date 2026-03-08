import { useState, useEffect } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminColors() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [form, setForm] = useState(data.colors);

  useEffect(() => { setForm(data.colors); }, [data.colors]);

  const handleSave = async () => {
    await api.updateColors(form);
    await refresh();
    toast({ title: 'Cores atualizadas!' });
  };

  const colorFields = [
    { key: 'primary' as const, label: 'Primária', desc: 'Cor principal do site (HSL: ex: 263 83% 58%)' },
    { key: 'secondary' as const, label: 'Secundária', desc: 'Cor secundária (HSL: ex: 330 81% 60%)' },
    { key: 'accent' as const, label: 'Destaque', desc: 'Cor de destaque/CTAs (HSL: ex: 160 84% 39%)' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Personalizar Cores</h1>
        <Button onClick={handleSave}>Salvar</Button>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm max-w-md flex flex-col gap-6">
        {colorFields.map(field => (
          <div key={field.key}>
            <Label>{field.label}</Label>
            <div className="flex gap-3 items-center mt-2">
              <div className="w-10 h-10 rounded-lg border border-border shrink-0" style={{ background: `hsl(${form[field.key]})` }} />
              <Input value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{field.desc}</p>
          </div>
        ))}

        {/* Preview */}
        <div className="mt-4 p-4 rounded-xl border border-border">
          <p className="text-sm font-medium text-foreground mb-3">Preview</p>
          <div className="flex gap-3">
            <div className="h-12 flex-1 rounded-lg flex items-center justify-center text-xs font-medium" style={{ background: `hsl(${form.primary})`, color: 'white' }}>Primária</div>
            <div className="h-12 flex-1 rounded-lg flex items-center justify-center text-xs font-medium" style={{ background: `hsl(${form.secondary})`, color: 'white' }}>Secundária</div>
            <div className="h-12 flex-1 rounded-lg flex items-center justify-center text-xs font-medium" style={{ background: `hsl(${form.accent})`, color: 'white' }}>Destaque</div>
          </div>
        </div>
      </div>
    </div>
  );
}
