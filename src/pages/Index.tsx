import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { PartnersCarousel } from '@/components/PartnersCarousel';
import { useSite } from '@/contexts/SiteContext';
import { formatBrPhone } from '@/lib/utils';

export default function Index() {
  const { data } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [...data.slides].sort((a, b) => a.order - b.order);
  const whatsappDigits = data.contact.whatsappNumber.replace(/\D/g, '');

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
      <h1 className="sr-only">{data.general.siteTitle}</h1>

      {/* Hero Carousel (abaixo do cabeçalho fixo) */}
      <section className="relative mt-[60px] h-[60vh] sm:h-[70vh] min-h-[420px] overflow-hidden bg-foreground">
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
              {slides[currentSlide]?.title || slides[currentSlide]?.subtitle ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slides[currentSlide]?.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                </div>
              ) : (
                // Slide só de imagem (ex.: banner com texto próprio): exibida inteira, sem escurecer,
                // sobre um fundo desfocado da mesma imagem que preenche as sobras
                <div className="absolute inset-0 bg-[#f9f6ef]">
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
                    style={{ backgroundImage: `url(${slides[currentSlide]?.image})` }}
                  />
                  <img
                    src={slides[currentSlide]?.image}
                    alt={data.general.siteTitle}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative h-full flex items-end pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {slides[currentSlide]?.title && (
                  <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 max-w-3xl leading-tight">
                    {slides[currentSlide].title}
                  </h2>
                )}
                {slides[currentSlide]?.subtitle && (
                  <p className="text-lg sm:text-xl text-white/80 max-w-xl">
                    {slides[currentSlide].subtitle}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all z-10">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all z-10">
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Intro Text Section */}
      {(data.general.introTitle || data.general.introText) && (
        <section className="py-20 sm:py-28 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollFadeIn>
              {data.general.introTitle && (
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 leading-tight">
                  {data.general.introTitle}
                </h2>
              )}
              {data.general.introText && (
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-muted-foreground whitespace-pre-line">
                  {data.general.introText}
                </p>
              )}
              <div className="w-16 h-1 rounded-full bg-primary mt-8 mx-auto" />
            </ScrollFadeIn>
          </div>
        </section>
      )}

      {/* Events Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Nossos Eventos
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cada evento do Entre Ellas Oficial é pensado para oferecer mais do que um encontro.
              </p>
              <div className="w-16 h-1 rounded-full bg-primary mt-4 mx-auto" />
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedEvents.map((event, i) => {
              const eventDate = new Date(event.date);
              const month = eventDate.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
              const day = eventDate.toLocaleDateString('pt-BR', { day: '2-digit' });

              return (
                <ScrollFadeIn key={event.id} delay={i * 0.15}>
                  <Link to={`/eventos/${event.id}`} className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                        <p className="text-xs font-bold uppercase text-primary">{month}</p>
                        <p className="text-2xl font-bold text-foreground leading-none">{day}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Local do evento</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {event.content}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                        Saiba mais
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </ScrollFadeIn>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/eventos"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-primary-foreground bg-primary transition-all hover:opacity-90 hover:shadow-lg"
            >
              Ver todos os eventos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <PartnersCarousel />

      {/* Faça parte */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollFadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Faça Parte</h2>
            <div className="w-16 h-1 rounded-full bg-primary mb-8 mx-auto" />
            <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
              <p>
                O Entre Ellas Oficial foi criado para mulheres que querem movimentar seus negócios, compartilhar
                experiências, aprender, apresentar seu trabalho e construir novas possibilidades.
              </p>
              <p className="text-foreground font-semibold">
                Se você é uma mulher empreendedora, venha fazer parte do Entre Ellas Oficial.
              </p>
              <p>
                Conheça nossa proposta, participe das nossas ações e encontre um espaço para apresentar seu trabalho,
                ampliar sua rede de contatos e estar mais perto de outras profissionais.
              </p>
            </div>
            <p className="text-foreground font-medium mt-10 mb-5">Quer participar ou saber mais? Entre em contato conosco.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {whatsappDigits && (
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-accent-foreground bg-accent transition-all hover:opacity-90 hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: {formatBrPhone(data.contact.whatsappNumber)}
                </a>
              )}
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-primary-foreground bg-primary transition-all hover:opacity-90 hover:shadow-lg"
              >
                Entre em contato
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </div>
  );
}
