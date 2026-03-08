import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { useSite } from '@/contexts/SiteContext';
import { Target, Eye, Gem } from 'lucide-react';

export default function About() {
  const { data } = useSite();
  const { about } = data;

  const sections = [
    { title: 'Missão', text: about.mission, image: about.missionImage, icon: Target },
    { title: 'Visão', text: about.vision, image: about.visionImage, icon: Eye },
    { title: 'Valores', text: about.values, image: about.valuesImage, icon: Gem },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Quem Somos
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Conheça nossa história e propósito
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn direction="left">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  Nossa História
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {about.intro}
                </p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn direction="right">
              <img
                src={about.introImage}
                alt="Quem Somos"
                className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
              />
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      {sections.map((section, i) => {
        const Icon = section.icon;
        const reversed = i % 2 === 1;
        return (
          <section key={section.title} className={`py-20 ${i % 2 === 0 ? 'bg-muted/50' : 'bg-background'}`}>
            <div className="container mx-auto px-4">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reversed ? 'md:[direction:rtl]' : ''}`}>
                <ScrollFadeIn direction={reversed ? 'right' : 'left'}>
                  <div className={reversed ? 'md:[direction:ltr]' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h2 className="font-display text-3xl font-bold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                      {section.text}
                    </p>
                  </div>
                </ScrollFadeIn>
                <ScrollFadeIn direction={reversed ? 'left' : 'right'}>
                  <div className={reversed ? 'md:[direction:ltr]' : ''}>
                    <img
                      src={section.image}
                      alt={section.title}
                      className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </ScrollFadeIn>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
