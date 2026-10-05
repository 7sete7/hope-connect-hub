import { useState, useEffect } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ImageInput } from '@/components/admin/ImageInput';
import { AboutContent } from '@/types';

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

  const sections: { label: string; hint?: string; textKey: keyof AboutContent; imageKey?: keyof AboutContent }[] = [
    { label: 'Quem Somos', textKey: 'intro', imageKey: 'introImage' },
    { label: 'Nosso Objetivo', textKey: 'mission', imageKey: 'missionImage' },
    { label: 'O Que Fazemos — texto', textKey: 'vision' },
    {
      label: 'O Que Fazemos — itens',
      hint: 'Um item por linha, no formato "Título: descrição". Cada linha vira um card.',
      textKey: 'values',
    },
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
            <h3 className="font-display font-semibold text-lg text-foreground mb-1">{section.label}</h3>
            <p className="text-sm text-muted-foreground mb-4">{section.hint ?? 'Deixe uma linha em branco entre os parágrafos.'}</p>
            <div className="flex flex-col gap-3">
              <div>
                <Label>Texto</Label>
                <Textarea
                  value={form[section.textKey]}
                  onChange={e => setForm(f => ({ ...f, [section.textKey]: e.target.value }))}
                  rows={7}
                  className="mt-1"
                />
              </div>
              {section.imageKey && (
                <ImageInput
                  label="Imagem"
                  value={form[section.imageKey]}
                  onChange={url => setForm(f => ({ ...f, [section.imageKey!]: url }))}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
