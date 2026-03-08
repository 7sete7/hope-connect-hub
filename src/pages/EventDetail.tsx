import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { useSite } from '@/contexts/SiteContext';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { data } = useSite();
  const event = data.events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="font-display text-2xl font-bold text-foreground">Evento não encontrado</h2>
        <Button asChild variant="outline">
          <Link to="/eventos"><ArrowLeft className="w-4 h-4 mr-2" />Voltar aos eventos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px]">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
      </div>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-3xl -mt-24 relative z-10">
          <ScrollFadeIn>
            <div className="bg-card rounded-2xl shadow-xl p-8">
              <Button asChild variant="ghost" size="sm" className="mb-4">
                <Link to="/eventos"><ArrowLeft className="w-4 h-4 mr-2" />Voltar</Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{event.title}</h1>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.content}
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </div>
  );
}
