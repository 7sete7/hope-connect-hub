import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().min(1, 'Telefone é obrigatório').max(20),
  message: z.string().trim().min(1, 'Mensagem é obrigatória').max(1000),
});

export default function Contact() {
  const { data } = useSite();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      await api.sendContactMessage(result.data as { name: string; email: string; phone: string; message: string });
      toast({ title: 'Mensagem enviada!', description: 'Entraremos em contato em breve.' });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast({ title: 'Erro', description: 'Não foi possível enviar. Tente novamente.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contato</h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">Entre em contato conosco</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* WhatsApp CTA */}
            <ScrollFadeIn direction="left">
              <div className="flex flex-col gap-6">
                <h2 className="font-display text-2xl font-bold text-foreground">Fale conosco</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tem alguma dúvida, sugestão ou deseja ser nosso parceiro? Entre em contato pelo WhatsApp ou envie uma mensagem pelo formulário.
                </p>
                <a
                  href={`https://wa.me/${encodeURIComponent(data.contact.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Falar pelo WhatsApp
                  </Button>
                </a>
              </div>
            </ScrollFadeIn>

            {/* Form */}
            <ScrollFadeIn direction="right">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Seu nome" />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="seu@email.com" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(11) 99999-9999" />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Sua mensagem..." rows={4} />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" disabled={loading} className="gap-2">
                  <Send className="w-4 h-4" />
                  {loading ? 'Enviando...' : 'Enviar mensagem'}
                </Button>
              </form>
            </ScrollFadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
