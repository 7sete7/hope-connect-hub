import { useState, useEffect } from 'react';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminGeneral() {
  const { data, refresh } = useSite();
  const { toast } = useToast();
  const [form, setForm] = useState(data.general);

  useEffect(() => { setForm(data.general); }, [data.general]);

  const handleSave = async () => {
    await api.updateGeneral(form);
    await refresh();
    toast({ title: 'Configurações gerais atualizadas!' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Geral</h1>
        <Button onClick={handleSave}>Salvar</Button>
      </div>

      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="bg-card rounded-xl p-6 shadow-sm space-y-5">
          <h3 className="font-semibold text-lg text-foreground">Identidade</h3>
          <div>
            <Label>Nome do site</Label>
            <Input
              value={form.siteTitle}
              onChange={e => setForm(f => ({ ...f, siteTitle: e.target.value }))}
              placeholder="Nome que aparece no topo e no rodapé"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Frase do rodapé</Label>
            <Textarea
              value={form.tagline}
              onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))}
              rows={2}
              placeholder="Uma frase curta sobre a cooperativa"
              className="mt-2"
            />
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm space-y-5">
          <div>
            <h3 className="font-semibold text-lg text-foreground">Texto de apresentação</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Aparece na página inicial, logo abaixo das imagens principais.
            </p>
          </div>
          <div>
            <Label>Título (opcional)</Label>
            <Input
              value={form.introTitle}
              onChange={e => setForm(f => ({ ...f, introTitle: e.target.value }))}
              placeholder="Deixe vazio para não exibir"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Texto</Label>
            <Textarea
              value={form.introText}
              onChange={e => setForm(f => ({ ...f, introText: e.target.value }))}
              rows={6}
              placeholder="Texto de apresentação do site"
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
