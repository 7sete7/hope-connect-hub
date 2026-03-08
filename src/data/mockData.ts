import { SiteData } from '@/types';

export const defaultSiteData: SiteData = {
  colors: {
    primary: '263 83% 58%',
    secondary: '330 81% 60%',
    accent: '160 84% 39%',
  },
  slides: [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&h=600&fit=crop',
      title: 'Juntos Contra o Câncer',
      subtitle: 'Unindo empresas para transformar vidas e construir esperança',
      order: 1,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&h=600&fit=crop',
      title: 'Solidariedade em Ação',
      subtitle: 'Cada parceria faz a diferença na luta contra o câncer',
      order: 2,
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&h=600&fit=crop',
      title: 'Esperança que Transforma',
      subtitle: 'Apoiando pacientes e famílias em sua jornada',
      order: 3,
    },
  ],
  events: [
    {
      id: '1',
      title: 'Caminhada pela Vida 2026',
      content: 'Participe da nossa caminhada anual em prol da conscientização sobre o câncer. Um evento que reúne centenas de pessoas em nome da esperança e solidariedade. O percurso será de 5km pelo centro da cidade, com paradas para atividades de conscientização e arrecadação de fundos. Teremos música ao vivo, alimentação saudável e muita alegria. Traga sua família e amigos!',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
      date: '2026-04-15',
      status: 'published',
    },
    {
      id: '2',
      title: 'Palestra: Prevenção e Diagnóstico Precoce',
      content: 'Evento gratuito com especialistas renomados em oncologia. Venha aprender sobre a importância da prevenção e do diagnóstico precoce no combate ao câncer. Nossos palestrantes incluem Dr. Maria Silva, oncologista com 20 anos de experiência, e Dr. João Santos, especialista em radiologia diagnóstica. Vagas limitadas, inscreva-se já!',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
      date: '2026-05-20',
      status: 'published',
    },
    {
      id: '3',
      title: 'Bazar Beneficente de Inverno',
      content: 'Nosso tradicional bazar beneficente está de volta! Roupas, acessórios, artesanato e muito mais com preços acessíveis. Toda a renda será revertida para o tratamento de pacientes em situação de vulnerabilidade social. Aceitamos doações de roupas em bom estado até o dia do evento.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
      date: '2026-06-10',
      status: 'published',
    },
  ],
  partners: Array.from({ length: 18 }, (_, i) => ({
    id: String(i + 1),
    name: `Parceiro ${i + 1}`,
    logo: `https://ui-avatars.com/api/?name=P${i + 1}&background=${['7C3AED', 'EC4899', '10B981', '6366F1', 'F59E0B', '8B5CF6'][i % 6]}&color=fff&size=120&bold=true&format=svg`,
    whatsapp: '5511999999999',
    website: 'https://example.com',
  })),
  associates: Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    name: `Associado ${i + 1}`,
    logo: `https://ui-avatars.com/api/?name=A${i + 1}&background=${['7C3AED', 'EC4899', '10B981', '6366F1', 'F59E0B', '8B5CF6'][i % 6]}&color=fff&size=120&bold=true&format=svg`,
    whatsapp: '5511999999999',
    website: 'https://example.com',
  })),
  about: {
    intro: 'Somos uma cooperativa formada por empresas comprometidas com a luta contra o câncer. Acreditamos que juntos podemos transformar vidas e oferecer esperança a milhares de pessoas que enfrentam essa batalha. Nossa rede de parceiros e associados trabalha incansavelmente para apoiar pacientes, famílias e profissionais de saúde.',
    introImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop',
    mission: 'Promover a união de empresas e profissionais em prol do combate ao câncer, oferecendo apoio integral a pacientes e suas famílias, por meio de ações de conscientização, prevenção e assistência social.',
    missionImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop',
    vision: 'Ser referência nacional como cooperativa de empresas no combate ao câncer, reconhecida pela excelência em suas ações e pelo impacto positivo na vida de milhares de pessoas.',
    visionImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop',
    values: 'Solidariedade: acreditamos no poder da união.\nEsperança: mantemos o otimismo mesmo nos momentos difíceis.\nTransparência: agimos com ética e responsabilidade.\nInclusão: respeitamos e acolhemos todas as pessoas.\nCompromisso: dedicamo-nos integralmente à nossa causa.',
    valuesImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
  },
  contact: {
    whatsappNumber: '5551999999999',
    email: 'contato@cooperativavida.org.br',
    phone: '(51) 99999-9999',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
  },
};
