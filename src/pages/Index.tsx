import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ExternalLink, MessageCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { useSite } from '@/contexts/SiteContext';

export default function Index() {
  const { data } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = data.slides.sort((a, b) => a.order - b.order);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  const publishedEvents = data.events.filter(e => e.status === 'published').slice(0, 3);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-foreground">
        <AnimatePresence mode="wait">
          {slides.length > 0 && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide]?.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide text */}
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {slides[currentSlide]?.title && (
                  <h1 className="font-display text-4xl md:text-6xl font-bold text-background mb-4 max-w-3xl">
                    {slides[currentSlide].title}
                  </h1>
                )}
                {slides[currentSlide]?.subtitle && (
                  <p className="text-lg md:text-xl text-background/80 max-w-2xl">
                    {slides[currentSlide].subtitle}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        {slides.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/40 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentSlide ? 'bg-background w-8' : 'bg-background/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Events Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <ScrollFadeIn>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Próximos Eventos
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Participe das nossas ações e faça parte desta corrente de solidariedade
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {publishedEvents.map((event, i) => (
              <ScrollFadeIn key={event.id} delay={i * 0.15}>
                <Link to={`/eventos/${event.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.content}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollFadeIn>
            ))}
          </div>

          <ScrollFadeIn>
            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/eventos">
                  Ver todos os eventos
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollFadeIn>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Nossos Parceiros
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Empresas que acreditam na nossa causa e caminham conosco
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-10">
            {data.partners.map((partner, i) => (
              <ScrollFadeIn key={partner.id} delay={(i % 6) * 0.05}>
                <div className="group relative bg-card rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 rounded-lg object-contain"
                  />
                  <span className="text-xs font-medium text-muted-foreground text-center truncate w-full">
                    {partner.name}
                  </span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-xl bg-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    {partner.whatsapp && (
                      <a
                        href={`https://wa.me/${partner.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:scale-110 transition-transform"
                        onClick={e => e.stopPropagation()}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

          <ScrollFadeIn>
            <div className="text-center">
              <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
                <Link to="/contato">
                  Seja nosso parceiro
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </div>
  );
}
