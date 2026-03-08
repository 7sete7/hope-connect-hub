import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { useSite } from '@/contexts/SiteContext';

export default function Events() {
  const { data } = useSite();
  const events = data.events.filter(e => e.status === 'published');

  return (
    <div>
      <section className="relative py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Eventos
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Acompanhe nossas ações e participe
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {events.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg">Nenhum evento disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <ScrollFadeIn key={event.id} delay={(i % 3) * 0.1}>
                  <Link to={`/eventos/${event.id}`}>
                    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="aspect-[3/2] overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{event.content}</p>
                        <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary">
                          Ler mais <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollFadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
