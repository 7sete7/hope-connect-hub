import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Image, CalendarDays, Handshake, Info, Phone, Palette, LogOut, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/geral', label: 'Geral', icon: Settings },
  { to: '/admin/carrossel', label: 'Carrossel', icon: Image },
  { to: '/admin/eventos', label: 'Eventos', icon: CalendarDays },
  { to: '/admin/parceiros', label: 'Parceiros', icon: Handshake },
  { to: '/admin/quem-somos', label: 'Quem Somos', icon: Info },
  { to: '/admin/contato', label: 'Contato', icon: Phone },
  { to: '/admin/cores', label: 'Cores', icon: Palette },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {adminLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
