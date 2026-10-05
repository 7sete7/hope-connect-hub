import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteData } from '@/types';
import { api } from '@/services/api';
import { defaultSiteData } from '@/data/mockData';

interface SiteContextType {
  data: SiteData;
  refresh: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const siteData = await api.getSiteData();
    setData(siteData);
  }, []);

  // Primeira carga: segura a renderização para não exibir os dados padrão antes dos do banco
  useEffect(() => {
    refresh()
      .catch(err => console.error('Falha ao carregar dados do site:', err))
      .finally(() => setLoaded(true));
  }, [refresh]);

  // Apply custom colors as CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', data.colors.primary);
    root.style.setProperty('--secondary', data.colors.secondary);
    root.style.setProperty('--accent', data.colors.accent);
  }, [data.colors]);

  return (
    <SiteContext.Provider value={{ data, refresh }}>
      {loaded ? children : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
