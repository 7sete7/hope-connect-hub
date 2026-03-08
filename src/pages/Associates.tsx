import { MessageCircle, ExternalLink } from 'lucide-react';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { useSite } from '@/contexts/SiteContext';

export default function Associates() {
  const { data } = useSite();

  return (
    <div>
      <section className="relative py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Associados
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Conheça as empresas que fazem parte da nossa rede
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.associates.map((associate, i) => (
              <ScrollFadeIn key={associate.id} delay={(i % 5) * 0.08}>
                <div className="group bg-card rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                  <img
                    src={associate.logo}
                    alt={associate.name}
                    className="w-20 h-20 rounded-xl object-contain"
                  />
                  <span className="font-medium text-sm text-foreground">{associate.name}</span>
                  <div className="flex gap-2">
                    {associate.whatsapp && (
                      <a
                        href={`https://wa.me/${associate.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                    {associate.website && (
                      <a
                        href={associate.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
