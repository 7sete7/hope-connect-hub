import { SiteData, SlideItem, EventItem, PartnerItem, AssociateItem, AboutContent, ContactSettings, SiteColors } from '@/types';
import { defaultSiteData } from '@/data/mockData';

const STORAGE_KEY = 'cooperativa_site_data';

function getData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { ...defaultSiteData };
}

function saveData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Generic CRUD helpers
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const api = {
  // Site Data
  getSiteData: async (): Promise<SiteData> => getData(),

  // Slides
  getSlides: async (): Promise<SlideItem[]> => getData().slides.sort((a, b) => a.order - b.order),
  createSlide: async (slide: Omit<SlideItem, 'id'>): Promise<SlideItem> => {
    const data = getData();
    const newSlide = { ...slide, id: generateId() };
    data.slides.push(newSlide);
    saveData(data);
    return newSlide;
  },
  updateSlide: async (id: string, updates: Partial<SlideItem>): Promise<SlideItem> => {
    const data = getData();
    const idx = data.slides.findIndex(s => s.id === id);
    if (idx === -1) throw new Error('Slide não encontrado');
    data.slides[idx] = { ...data.slides[idx], ...updates };
    saveData(data);
    return data.slides[idx];
  },
  deleteSlide: async (id: string): Promise<void> => {
    const data = getData();
    data.slides = data.slides.filter(s => s.id !== id);
    saveData(data);
  },

  // Events
  getEvents: async (): Promise<EventItem[]> => getData().events,
  getPublishedEvents: async (): Promise<EventItem[]> => getData().events.filter(e => e.status === 'published'),
  getEvent: async (id: string): Promise<EventItem | undefined> => getData().events.find(e => e.id === id),
  createEvent: async (event: Omit<EventItem, 'id'>): Promise<EventItem> => {
    const data = getData();
    const newEvent = { ...event, id: generateId() };
    data.events.push(newEvent);
    saveData(data);
    return newEvent;
  },
  updateEvent: async (id: string, updates: Partial<EventItem>): Promise<EventItem> => {
    const data = getData();
    const idx = data.events.findIndex(e => e.id === id);
    if (idx === -1) throw new Error('Evento não encontrado');
    data.events[idx] = { ...data.events[idx], ...updates };
    saveData(data);
    return data.events[idx];
  },
  deleteEvent: async (id: string): Promise<void> => {
    const data = getData();
    data.events = data.events.filter(e => e.id !== id);
    saveData(data);
  },

  // Partners
  getPartners: async (): Promise<PartnerItem[]> => getData().partners,
  createPartner: async (partner: Omit<PartnerItem, 'id'>): Promise<PartnerItem> => {
    const data = getData();
    const newPartner = { ...partner, id: generateId() };
    data.partners.push(newPartner);
    saveData(data);
    return newPartner;
  },
  updatePartner: async (id: string, updates: Partial<PartnerItem>): Promise<PartnerItem> => {
    const data = getData();
    const idx = data.partners.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Parceiro não encontrado');
    data.partners[idx] = { ...data.partners[idx], ...updates };
    saveData(data);
    return data.partners[idx];
  },
  deletePartner: async (id: string): Promise<void> => {
    const data = getData();
    data.partners = data.partners.filter(p => p.id !== id);
    saveData(data);
  },

  // Associates
  getAssociates: async (): Promise<AssociateItem[]> => getData().associates,
  createAssociate: async (associate: Omit<AssociateItem, 'id'>): Promise<AssociateItem> => {
    const data = getData();
    const newAssociate = { ...associate, id: generateId() };
    data.associates.push(newAssociate);
    saveData(data);
    return newAssociate;
  },
  updateAssociate: async (id: string, updates: Partial<AssociateItem>): Promise<AssociateItem> => {
    const data = getData();
    const idx = data.associates.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Associado não encontrado');
    data.associates[idx] = { ...data.associates[idx], ...updates };
    saveData(data);
    return data.associates[idx];
  },
  deleteAssociate: async (id: string): Promise<void> => {
    const data = getData();
    data.associates = data.associates.filter(a => a.id !== id);
    saveData(data);
  },

  // About
  getAbout: async (): Promise<AboutContent> => getData().about,
  updateAbout: async (updates: Partial<AboutContent>): Promise<AboutContent> => {
    const data = getData();
    data.about = { ...data.about, ...updates };
    saveData(data);
    return data.about;
  },

  // Contact
  getContactSettings: async (): Promise<ContactSettings> => getData().contact,
  updateContactSettings: async (updates: Partial<ContactSettings>): Promise<ContactSettings> => {
    const data = getData();
    data.contact = { ...data.contact, ...updates };
    saveData(data);
    return data.contact;
  },

  // Colors
  getColors: async (): Promise<SiteColors> => getData().colors,
  updateColors: async (updates: Partial<SiteColors>): Promise<SiteColors> => {
    const data = getData();
    data.colors = { ...data.colors, ...updates };
    saveData(data);
    return data.colors;
  },

  // Auth (mock)
  login: async (email: string, password: string): Promise<{ token: string }> => {
    if (email === 'admin@cooperativa.com' && password === 'admin123') {
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('auth_token', token);
      return { token };
    }
    throw new Error('Credenciais inválidas');
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  // Contact form (mock)
  sendContactMessage: async (data: { name: string; email: string; phone: string; message: string }): Promise<void> => {
    console.log('Contact message sent:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  // Image upload (mock)
  uploadImage: async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  },
};
