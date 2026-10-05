import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { PageBanner } from '@/components/PageBanner';
import { useSite } from '@/contexts/SiteContext';
import { Target, Sparkles, Users, GraduationCap, CalendarDays, Store, Handshake, LucideIcon } from 'lucide-react';

// "O que fazemos": uma linha por item no formato "Título: descrição" (campo values)
function parseItems(text: string) {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const idx = line.indexOf(':');
      return idx === -1
        ? { title: line, description: '' }
        : { title: line.slice(0, idx).trim(), description: line.slice(idx + 1).trim() };
    });
}

const itemIcons: LucideIcon[] = [Users, GraduationCap, CalendarDays, Store, Handshake];

export default function About() {
  const { data } = useSite();
  const { about, general } = data;
  const items = parseItems(about.values);

  return (
    <div>
      {/* Banner */}
      <PageBanner title="Quem Somos" backgroundImage={about.introImage} />

      {/* Quem somos */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn direction="left">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">{general.siteTitle}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{about.intro}</p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn direction="right">
              <div className="relative">
                <img
                  src={about.introImage}
                  alt="Quem somos"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-primary/10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-secondary/10" />
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Nosso objetivo */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn direction="left">
              <img
                src={about.missionImage}
                alt="Nosso objetivo"
                className="rounded-2xl shadow-2xl w-full h-[350px] object-cover"
              />
            </ScrollFadeIn>
            <ScrollFadeIn direction="right">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Nosso Objetivo</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                  {about.mission}
                </p>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* O que fazemos */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">O Que Fazemos</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{about.vision}</p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const Icon = itemIcons[i % itemIcons.length];
              return (
                <ScrollFadeIn key={item.title} delay={i * 0.1}>
                  <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow h-full">
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </ScrollFadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
