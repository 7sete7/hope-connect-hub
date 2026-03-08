import { useState, useEffect } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminAbout() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [form, setForm] = useState(data.about);

  useEffect(() => { setForm(data.about); }, [data.about]);

  const handleSave = async () => {
    await api.updateAbout(form);
    await refresh();
    toast({ title: 'Conteúdo atualizado!' });
  };

  const handleImageUpload = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await api.uploadImage(file);
    setForm(f => ({ ...f, [field]: url }));
  };

  const sections = [
    { label: 'Introdução', textKey: 'intro' as const, imageKey: 'introImage' as const },
    { label: 'Missão', textKey: 'mission' as const, imageKey: 'missionImage' as const },
    { label: 'Visão', textKey: 'vision' as const, imageKey: 'visionImage' as const },
    { label: 'Valores', textKey: 'values' as const, imageKey: 'valuesImage' as const },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Quem Somos</h1>
        <Button onClick={handleSave}>Salvar alterações</Button>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map(section => (
          <div key={section.textKey} className="bg-card rounded-xl p-6 shadow-sm">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">{section.label}</h3>
            <div className="flex flex-col gap-3">
              <div>
                <Label>Texto</Label>
                <Textarea
                  value={form[section.textKey]}
                  onChange={e => setForm(f => ({ ...f, [section.textKey]: e.target.value }))}
                  rows={4}
                />
              </div>
              <div>
                <Label>Imagem</Label>
                <Input
                  value={form[section.imageKey]}
                  onChange={e => setForm(f => ({ ...f, [section.imageKey]: e.target.value }))}
                  placeholder="https://..."
                />
                <input type="file" accept="image/*" onChange={e => handleImageUpload(section.imageKey, e)} className="mt-2 text-sm" />
                {form[section.imageKey] && (
                  <img src={form[section.imageKey]} alt="" className="mt-2 h-24 w-full object-cover rounded-lg" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
