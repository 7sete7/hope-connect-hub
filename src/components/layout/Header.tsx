import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useSite } from '@/contexts/SiteContext';

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/parceiros', label: 'Parceiros' },
  { to: '/contato', label: 'Contato' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data } = useSite();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasBanner = ['/quem-somos', '/eventos', '/parceiros', '/contato'].includes(location.pathname);
  const showTransparent = hasBanner && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? 'bg-transparent py-4'
          : 'bg-background/95 backdrop-blur-xl shadow-sm py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo-mark.jpg"
              alt={data.general.siteTitle}
              className="w-11 h-11 rounded-full shadow-sm transition-transform group-hover:scale-110"
            />
            <span
              className={`font-bold text-lg hidden sm:block transition-colors ${
                showTransparent ? 'text-white' : 'text-foreground'
              }`}
            >
              {data.general.siteTitle}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  showTransparent
                    ? location.pathname === link.to
                      ? 'text-white bg-white/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    : location.pathname === link.to
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${showTransparent ? 'text-white hover:bg-white/10' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
