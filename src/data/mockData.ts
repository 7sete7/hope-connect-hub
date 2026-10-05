import { SiteData } from '@/types';

export const defaultSiteData: SiteData = {
  general: {
    siteTitle: "Entre Ellas Oficial",
    tagline: "Conexões que geram conhecimento, oportunidades e novas possibilidades.",
    introTitle: "Conectar mulheres. Compartilhar conhecimento. Criar oportunidades.",
    introText: "Uma rede de mulheres que acredita na força das conexões, da troca de experiências e do conhecimento.\n\nCriamos encontros, workshops, eventos, exposições e parcerias que aproximam pessoas, negócios e novas possibilidades.\n\nConheça o Entre Ellas Oficial.",
  },
  colors: {
    primary: '263 83% 58%',
    secondary: '330 81% 60%',
    accent: '160 84% 39%',
  },
  slides: [
    {
      id: "banner",
      image: "/BannerGrande.jpeg",
      order: 0,
    },
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
    { id: "1", name: "Radio Viva RS", logo: "/RadioVivaRS.jpeg", website: "https://www.radiovivars.com.br" },
    { id: "2", name: "Ateliê Artes da Aldeia", logo: "/AtelieArtesdaAldeia.jpeg" },
    { id: "3", name: "Banho de Lua", logo: "/BanhodeLua.jpeg" },
    { id: "4", name: "Clara Gomes Terapeuta", logo: "/ClaraGomesTerapeuta.jpeg" },
    { id: "5", name: "Essendris", logo: "/Essendris.jpeg" },
    { id: "6", name: "Grazi Ferreira Fotografia", logo: "/GraziFerreiraFotografia.jpeg" },
    { id: "7", name: "Josy Barbosa Estrategista de Imagem", logo: "/JosyBarbosa.jpeg" },
    { id: "8", name: "K&R Store", logo: "/KRStore.jpeg" },
    { id: "9", name: "Marias Quitutes", logo: "/MariasQuitutes.jpeg" },
    { id: "10", name: "MR Estética", logo: "/MREstética.jpeg" },
    { id: "11", name: "Amor de Vó", logo: "/AmordeVo.jpeg" },
    { id: "12", name: "Aventurina Semijoias", logo: "/Semijoias.jpeg" },
  ],
  about: {
    intro: "O Entre Ellas Oficial é um espaço de encontro, participação e desenvolvimento para mulheres que empreendem, trabalham, criam e movimentam seus negócios.\n\nMais do que uma rede de contatos, buscamos proporcionar experiências que aproximem pessoas, estimulem novas ideias e favoreçam o crescimento profissional e empresarial.\n\nPor meio de encontros, conteúdos, eventos e ações colaborativas, abrimos espaço para que cada participante possa apresentar seu trabalho, ampliar sua visibilidade e estabelecer novas conexões.",
    introImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop',
    mission: "Criar um ambiente que estimule o crescimento de mulheres empreendedoras e profissionais, valorizando seus talentos, suas experiências e seus negócios.\n\nO Entre Ellas Oficial busca aproximar diferentes áreas e trajetórias, incentivar a colaboração e criar momentos que contribuam para o desenvolvimento pessoal e profissional de quem participa.\n\nNossa proposta é transformar encontros em experiências que possam gerar novas ideias, visibilidade, aprendizado e possibilidades para os negócios.",
    missionImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop',
    vision: "O Entre Ellas Oficial é voltado especialmente para mulheres empreendedoras que desejam apresentar seus negócios, desenvolver novas habilidades, ampliar sua presença profissional e encontrar novas possibilidades para crescer.\n\nCriamos uma programação que valoriza a participação das empreendedoras e coloca seus negócios, conhecimentos e experiências em evidência.",
    visionImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop',
    values: "Encontros e networking: Promovemos encontros para aproximar profissionais de diferentes áreas, favorecendo a troca de experiências e a formação de novas relações profissionais.\nWorkshops: Criamos momentos de aprendizado sobre temas que contribuem para o desenvolvimento dos negócios e das profissionais.\nEventos: Realizamos eventos com assuntos relevantes para as mulheres e para a sociedade, combinando conteúdo, convivência e participação.\nExposições: As associadas contam com espaço para apresentar seus produtos, serviços e marcas, ampliando sua visibilidade e aproximando seus negócios do público.\nParcerias: Desenvolvemos ações em parceria com empresas, profissionais e instituições que possam agregar conhecimento, estrutura e novas possibilidades às iniciativas do Entre Ellas Oficial.",
    valuesImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
  },
  contact: {
    whatsappNumber: '5551997602948',
    email: 'comunidadeentreellas@gmail.com',
    phone: '(51) 99760-2948',
    address: 'Av. Ely Corrêa - Gravataí, RS',
  },
};
