import { useState } from 'react';
import { MessageCircle, Send, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { PageBanner } from '@/components/PageBanner';
import { useSite } from '@/contexts/SiteContext';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, 'Mensagem é obrigatória').max(1000),
});

export default function Contact() {
  const { data } = useSite();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contact = data.contact;

  const contactInfo = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contact.whatsappNumber,
      href: `https://wa.me/+${contact.whatsappNumber.replace(/\D/g, '')}`,
      color: 'bg-accent text-accent-foreground',
    },
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: 'bg-primary text-primary-foreground',
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\D/g, '')}`,
      color: 'bg-secondary/15 text-secondary',
    },
    {
      icon: MapPin,
      label: 'Endereço',
      value: contact.address,
      href: undefined,
      color: 'bg-primary/10 text-primary',
    },
  ];

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
      await api.sendContactMessage({ name: form.name, email: form.email, phone: form.phone, message: form.message });
      toast({ title: 'Mensagem enviada!', description: 'Entraremos em contato em breve.' });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast({ title: 'Erro', description: 'Não foi possível enviar. Tente novamente.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageBanner title="Contato" backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80" />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <ScrollFadeIn direction="left">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">Fale Conosco</h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                  Estamos sempre prontos para ouvir você. Envie sua mensagem ou entre em contato diretamente.
                </p>

                <div className="flex flex-col gap-4">
                  {contactInfo.map((item) => {
                    const content = (
                      <div className="flex items-center gap-4 bg-card rounded-2xl p-5 border border-border hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.label}</p>
                          <p className="text-muted-foreground text-sm">{item.value}</p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>
              </div>
            </ScrollFadeIn>

            {/* Right: Form */}
            <ScrollFadeIn direction="right">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Envie sua mensagem</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome *</Label>
                      <Input id="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Seu nome" className="mt-1.5" />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="seu@email.com" className="mt-1.5" />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(11) 99999-9999" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Assunto</Label>
                      <Input id="subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Assunto da mensagem" className="mt-1.5" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea id="message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Escreva sua mensagem..." rows={5} className="mt-1.5" />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>
                  <Button type="submit" disabled={loading} className="w-full gap-2 py-6 text-base">
                    <Send className="w-4 h-4" />
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
