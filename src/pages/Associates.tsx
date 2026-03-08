import { MessageCircle, ExternalLink, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { PageBanner } from '@/components/PageBanner';
import { useSite } from '@/contexts/SiteContext';

export default function Associates() {
  const { data } = useSite();

  return (
    <div>
      <PageBanner
        title="Nossos Associados"
        backgroundImage="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
              Conheça as empresas que fazem parte da nossa cooperativa
            </p>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.associates.map((associate, i) => (
              <ScrollFadeIn key={associate.id} delay={(i % 4) * 0.08}>
                <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <img
                      src={associate.logo}
                      alt={associate.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{associate.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">Membro da cooperativa</p>
                  <div className="flex items-center gap-2 mt-auto">
                    {associate.whatsapp && (
                      <a
                        href={`https://wa.me/${associate.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    )}
                    {associate.website && (
                      <a
                        href={associate.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Site
                      </a>
                    )}
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

          {/* CTA */}
          <ScrollFadeIn>
            <div className="mt-20 text-center">
              <div className="inline-block bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-10">
                <h3 className="text-2xl font-bold text-foreground mb-2">Quer fazer parte?</h3>
                <p className="text-muted-foreground mb-6">Entre em contato e associe-se à nossa cooperativa</p>
                <Link
                  to="/contato"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
                >
                  Entre em Contato
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </div>
  );
}
