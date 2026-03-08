export interface SlideItem {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  order: number;
}

export interface EventItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  status: 'published' | 'draft';
}

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  whatsapp?: string;
  website?: string;
}

export interface AssociateItem {
  id: string;
  name: string;
  logo: string;
  whatsapp?: string;
  website?: string;
}

export interface AboutContent {
  intro: string;
  introImage: string;
  mission: string;
  missionImage: string;
  vision: string;
  visionImage: string;
  values: string;
  valuesImage: string;
}

export interface ContactSettings {
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
}

export interface SiteColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface SiteData {
  slides: SlideItem[];
  events: EventItem[];
  partners: PartnerItem[];
  associates: AssociateItem[];
  about: AboutContent;
  contact: ContactSettings;
  colors: SiteColors;
}
