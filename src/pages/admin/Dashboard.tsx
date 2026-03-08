import { useSite } from '@/contexts/SiteContext';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Handshake, Users, Image } from 'lucide-react';

export default function Dashboard() {
  const { data } = useSite();

  const stats = [
    { label: 'Slides', value: data.slides.length, icon: Image, color: 'text-primary' },
    { label: 'Eventos', value: data.events.length, icon: CalendarDays, color: 'text-secondary' },
    { label: 'Parceiros', value: data.partners.length, icon: Handshake, color: 'text-accent' },
    { label: 'Associados', value: data.associates.length, icon: Users, color: 'text-primary' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-0 shadow-md">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
