import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, ExternalLink, ArrowRight } from 'lucide-react';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { useSite } from '@/contexts/SiteContext';
import { instagramUrl } from '@/lib/utils';

export function PartnersCarousel() {
  const { data } = useSite();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate partners for infinite scroll effect
  const partners = data.partners;
  const duplicated = [...partners, ...partners];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || partners.length === 0) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // px per frame

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        // Reset when we've scrolled past first set
        const halfWidth = el.scrollWidth / 2;
        if (scrollPos >= halfWidth) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, partners.length]);

  if (partners.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn>
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Nossos Parceiros
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empresas comprometidas com a luta contra o câncer
            </p>
            <div className="w-16 h-1 rounded-full bg-primary mt-4 mx-auto" />
          </div>
        </ScrollFadeIn>

        {/* Auto-scrolling carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicated.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="shrink-0 w-40 sm:w-48 group"
            >
              <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border hover:border-primary/25 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-muted flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 leading-tight">
                  {partner.name}
                </h3>
                <div className="flex gap-2 mt-auto pt-2">
                  {partner.whatsapp && (
                    <a
                      href={`https://wa.me/${partner.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp de ${partner.name}`}
                      className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {partner.instagram && (
                    <a
                      href={instagramUrl(partner.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram de ${partner.name}`}
                      className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center hover:bg-secondary/20 transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-border transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ScrollFadeIn>
          <div className="text-center mt-10">
            <Link
              to="/parceiros"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-primary-foreground bg-primary transition-all hover:opacity-90 hover:shadow-lg"
            >
              Ver todos os parceiros
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 sm:p-8">
              <p className="text-foreground font-medium">Quer fazer parte dessa causa?</p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-secondary-foreground bg-secondary transition-all hover:opacity-90 hover:shadow-lg"
              >
                Seja Nosso Parceiro
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
