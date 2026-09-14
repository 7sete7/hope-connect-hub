import { SiteData } from '@/types';

export const defaultSiteData: SiteData = {
  general: {
    siteTitle: 'Ser Mulher de Impacto entre Ellas',
    tagline: 'Juntas podemos fazer impacto',
    // introTitle: 'Nossa causa',
    introText: 'Uma rede que aproxima mulheres empreendedoras, profissionais, empresas e ideias por meio de encontros, experiências e novas conexões.\\nConheça o Ser Mulheres de Impacto Entre Ellas',
  },
  colors: {
    primary: '263 83% 58%',
    secondary: '330 81% 60%',
    accent: '160 84% 39%',
  },
  slides: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&h=600&fit=crop",
      title: "Conexões que criam oportunidades",
      subtitle: "Aproximamos mulheres, profissionais e negócios para fortalecer relações, ampliar contatos e abrir novos caminhos",
      order: 1,
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&h=600&fit=crop",
      title: "Conhecimento que transforma",
      subtitle: "Workshops, encontros e experiências que incentivam a troca de ideias, aprendizados e vivências entre mulheres",
      order: 2,
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&h=600&fit=crop",
      title: "Espaço para mostrar o seu negócio",
      subtitle: "Feiras, exposições e eventos que valorizam empreendedoras, marcas, produtos e serviços",
      order: 3,
    },
  ],
  events: [],
  partners: [
    { id: "1", name: "Radio Viva RS", logo: "/Radio Viva RS.jpeg", website: "https://www.radiovivars.com.br" },
    { id: "2", name: "Ateliê Artes da Aldeia", logo: "/Atelie Artes da Aldeia.jpeg" },
    { id: "3", name: "Banho de Lua", logo: "/Banho de Lua.jpeg" },
    { id: "4", name: "Clara Gomes Terapeuta", logo: "/Clara Gomes Terapeuta.jpeg" },
    { id: "5", name: "Essendris", logo: "/Essendris.jpeg" },
    { id: "6", name: "Grazi Ferreira Fotografia", logo: "/Grazi Ferreira Fotografia.jpeg" },
    { id: "7", name: "Josy Barbosa Estrategista de Imagem", logo: "/Josy Barbosa Estrategista de Imagem.jpeg" },
    { id: "8", name: "K&R Store", logo: "/K&R Store.jpeg" },
    { id: "9", name: "Marias Quitutes", logo: "/Marias Quitutes.jpeg" },
    { id: "10", name: "MR Estética", logo: "/MR Estética.jpeg" },
    { id: "11", name: "Amor de Vó", logo: "/Amor de Vó.jpeg" },
    { id: "12", name: "Aventurina Semijoias", logo: "/Semijoias.jpeg" },
  ],
  about: {
    intro: 'O Ser Mulheres de Impacto Entre Ellas é uma rede de mulheres empreendedoras criada para promover conexões, compartilhar conhecimento e gerar novas oportunidades. \nCriamos um espaço onde mulheres podem apresentar seus negócios, trocar experiências, ampliar sua rede de contatos e construir parcerias.',
    introImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop',
    mission: 'Nosso objetivo é fortalecer o empreendedorismo feminino criando oportunidades para que mulheres se conectem, aprendam umas com as outras e desenvolvam novos caminhos para seus negócios e projetos.\nPor meio de diferentes ações e experiências, buscamos unir empreendedorismo, conhecimento e relacionamento em torno de temas atuais e relevantes para a comunidade.',
    missionImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop',
    vision: 'Ser uma rede de referência na conexão e no fortalecimento de mulheres, criando oportunidades de crescimento, colaboração e desenvolvimento por meio de experiências, conhecimento e empreendedorismo.',
    visionImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop',
    values: 'Conexão: Acreditamos que boas relações podem gerar novas ideias, parcerias e oportunidades.\nColaboração: Valorizamos a troca de experiências, conhecimentos e apoio entre mulheres, profissionais e empresas.\nEmpreendedorismo: Incentivamos mulheres a desenvolverem seus projetos, apresentarem seus negócios e ampliarem suas possibilidades.\nConhecimento: Promovemos espaços de aprendizado, desenvolvimento e compartilhamento de experiências.\nValorização das mulheres: Buscamos criar ambientes onde mulheres possam se expressar, fortalecer suas trajetórias e ocupar novos espaços.',
    valuesImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
  },
  contact: {
    whatsappNumber: '5551997602948',
    email: 'comunidadeentreellas@gmail.com',
    phone: '5551997602948',
    address: 'Av. Ely Corrêa - Gravataí, RS',
  },
};
