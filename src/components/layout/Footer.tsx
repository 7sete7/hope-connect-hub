import { Link } from 'react-router-dom';
import { Heart, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">Cooperativa</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Unindo empresas na luta contra o câncer. Juntos somos mais fortes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Navegação</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/" className="hover:opacity-100 transition-opacity">Início</Link>
              <Link to="/quem-somos" className="hover:opacity-100 transition-opacity">Quem Somos</Link>
              <Link to="/eventos" className="hover:opacity-100 transition-opacity">Eventos</Link>
              <Link to="/associados" className="hover:opacity-100 transition-opacity">Associados</Link>
              <Link to="/contato" className="hover:opacity-100 transition-opacity">Contato</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> contato@cooperativa.org.br</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> (11) 99999-9999</span>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-50">
          <span>© {new Date().getFullYear()} Cooperativa Contra o Câncer. Todos os direitos reservados.</span>
          <Link to="/login" className="hover:opacity-100 transition-opacity">
            Área administrativa
          </Link>
        </div>
      </div>
    </footer>
  );
}
