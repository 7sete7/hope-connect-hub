import { SiteData, SlideItem, EventItem, PartnerItem, AboutContent, ContactSettings, SiteColors } from '@/types';
import { defaultSiteData } from '@/data/mockData';

const API_URL = import.meta.env.VITE_API_URL || '';
const USE_API = !!API_URL;

// ─── localStorage fallback (Lovable preview) ───────────────────────────
const STORAGE_KEY = 'cooperativa_site_data';

function getData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Migration: merge associates into partners if old format
      if (parsed.associates && Array.isArray(parsed.associates)) {
        parsed.partners = [...(parsed.partners || []), ...parsed.associates];
        delete parsed.associates;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch {}
  return { ...defaultSiteData };
}

function saveData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// ─── HTTP helpers (real backend) ────────────────────────────────────────
function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options.headers as Record<string, string> || {}) };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

async function httpForm<T>(path: string, formData: FormData): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { method: 'POST', headers, body: formData });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── API implementation ─────────────────────────────────────────────────
export const api = USE_API ? {
  getSiteData: async (): Promise<SiteData> => {
    const [slides, events, partners, about, contact, colors] = await Promise.all([
      http<SlideItem[]>('/api/slides'),
      http<EventItem[]>('/api/events'),
      http<PartnerItem[]>('/api/partners'),
      http<AboutContent>('/api/about'),
      http<ContactSettings>('/api/contact'),
      http<SiteColors>('/api/colors'),
    ]);
    return { slides, events, partners, about, contact, colors };
  },

  getSlides: () => http<SlideItem[]>('/api/slides'),
  createSlide: (slide: Omit<SlideItem, 'id'>) => http<SlideItem>('/api/slides', { method: 'POST', body: JSON.stringify(slide) }),
  updateSlide: (id: string, updates: Partial<SlideItem>) => http<SlideItem>(`/api/slides/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteSlide: (id: string) => http<void>(`/api/slides/${id}`, { method: 'DELETE' }),

  getEvents: () => http<EventItem[]>('/api/events'),
  getPublishedEvents: () => http<EventItem[]>('/api/events?status=published'),
  getEvent: async (id: string) => http<EventItem | undefined>(`/api/events/${id}`),
  createEvent: (event: Omit<EventItem, 'id'>) => http<EventItem>('/api/events', { method: 'POST', body: JSON.stringify(event) }),
  updateEvent: (id: string, updates: Partial<EventItem>) => http<EventItem>(`/api/events/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteEvent: (id: string) => http<void>(`/api/events/${id}`, { method: 'DELETE' }),

  getPartners: () => http<PartnerItem[]>('/api/partners'),
  createPartner: (partner: Omit<PartnerItem, 'id'>) => http<PartnerItem>('/api/partners', { method: 'POST', body: JSON.stringify(partner) }),
  updatePartner: (id: string, updates: Partial<PartnerItem>) => http<PartnerItem>(`/api/partners/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deletePartner: (id: string) => http<void>(`/api/partners/${id}`, { method: 'DELETE' }),

  getAbout: () => http<AboutContent>('/api/about'),
  updateAbout: (updates: Partial<AboutContent>) => http<AboutContent>('/api/about', { method: 'PUT', body: JSON.stringify(updates) }),

  getContactSettings: () => http<ContactSettings>('/api/contact'),
  updateContactSettings: (updates: Partial<ContactSettings>) => http<ContactSettings>('/api/contact', { method: 'PUT', body: JSON.stringify(updates) }),

  getColors: () => http<SiteColors>('/api/colors'),
  updateColors: (updates: Partial<SiteColors>) => http<SiteColors>('/api/colors', { method: 'PUT', body: JSON.stringify(updates) }),

  login: async (email: string, password: string): Promise<{ token: string }> => {
    const result = await http<{ token: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    localStorage.setItem('auth_token', result.token);
    return result;
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem('auth_token');
  },
  isAuthenticated: (): boolean => !!localStorage.getItem('auth_token'),

  sendContactMessage: (data: { name: string; email: string; phone: string; message: string }) =>
    http<void>('/api/contact/message', { method: 'POST', body: JSON.stringify(data) }),

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const result = await httpForm<{ url: string }>('/api/upload', formData);
    return result.url;
  },
} : {
  // ─── localStorage fallback ──────────────────
  getSiteData: async (): Promise<SiteData> => getData(),

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

  getAbout: async (): Promise<AboutContent> => getData().about,
  updateAbout: async (updates: Partial<AboutContent>): Promise<AboutContent> => {
    const data = getData();
    data.about = { ...data.about, ...updates };
    saveData(data);
    return data.about;
  },

  getContactSettings: async (): Promise<ContactSettings> => getData().contact,
  updateContactSettings: async (updates: Partial<ContactSettings>): Promise<ContactSettings> => {
    const data = getData();
    data.contact = { ...data.contact, ...updates };
    saveData(data);
    return data.contact;
  },

  getColors: async (): Promise<SiteColors> => getData().colors,
  updateColors: async (updates: Partial<SiteColors>): Promise<SiteColors> => {
    const data = getData();
    data.colors = { ...data.colors, ...updates };
    saveData(data);
    return data.colors;
  },

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
  isAuthenticated: (): boolean => !!localStorage.getItem('auth_token'),

  sendContactMessage: async (data: { name: string; email: string; phone: string; message: string }): Promise<void> => {
    console.log('Contact message sent:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  uploadImage: async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  },
};
