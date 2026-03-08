import { ScrollFadeIn } from '@/components/ScrollFadeIn';
import { PageBanner } from '@/components/PageBanner';
import { useSite } from '@/contexts/SiteContext';
import { Target, Eye, Sparkles } from 'lucide-react';

const valuesData = [
  { title: 'Solidariedade', description: 'Acreditamos no poder da união e da empatia.' },
  { title: 'Transparência', description: 'Todas as nossas ações são realizadas com total clareza.' },
  { title: 'Compromisso', description: 'Dedicação inabalável à causa e aos nossos parceiros.' },
  { title: 'Inovação', description: 'Buscamos sempre novas formas de fazer a diferença.' },
  { title: 'Esperança', description: 'Cada ação é movida pela certeza de que juntos podemos vencer.' },
];

export default function About() {
  const { data } = useSite();
  const { about } = data;

  return (
    <div>
      {/* Banner */}
      <PageBanner title="Quem Somos" backgroundImage={about.introImage} />

      {/* Nossa História */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn direction="left">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Nossa História</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>{about.intro}</p>
                </div>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn direction="right">
              <div className="relative">
                <img
                  src={about.introImage}
                  alt="Sobre nós"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-primary/10" />
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-secondary/10" />
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn direction="left">
              <img
                src={about.missionImage}
                alt="Missão"
                className="rounded-2xl shadow-2xl w-full h-[350px] object-cover"
              />
            </ScrollFadeIn>
            <ScrollFadeIn direction="right">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Missão</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {about.mission}
                </p>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Visão */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn direction="left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Visão</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {about.vision}
                </p>
              </div>
            </ScrollFadeIn>
            <ScrollFadeIn direction="right">
              <img
                src={about.valuesImage}
                alt="Visão"
                className="rounded-2xl shadow-2xl w-full h-[350px] object-cover"
              />
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Nossos Valores</h2>
              </div>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesData.map((value, i) => (
              <ScrollFadeIn key={value.title} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
