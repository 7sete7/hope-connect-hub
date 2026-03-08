import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Lock, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[hsl(220,20%,8%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Cooperativa Vida Contra o Câncer</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unindo empresas na luta contra o câncer. Juntos somos mais fortes.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Navegação</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Início</Link></li>
              <li><Link to="/quem-somos" className="text-gray-400 hover:text-white text-sm transition-colors">Quem Somos</Link></li>
              <li><Link to="/eventos" className="text-gray-400 hover:text-white text-sm transition-colors">Eventos</Link></li>
              <li><Link to="/parceiros" className="text-gray-400 hover:text-white text-sm transition-colors">Parceiros</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-white text-sm transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contato@cooperativavida.org.br</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(51) 99999-9999</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Faça parte</h3>
            <p className="text-gray-400 text-sm mb-4">
              Sua empresa pode fazer a diferença. Junte-se à nossa cooperativa.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-primary-foreground bg-primary transition-all hover:opacity-90"
            >
              Seja Nosso Parceiro
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Cooperativa Vida Contra o Câncer. Todos os direitos reservados.
          </p>
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-400 transition-colors flex items-center gap-1 text-xs"
          >
            <Lock className="w-3 h-3" />
            Área administrativa
          </Link>
        </div>
      </div>
    </footer>
  );
}
