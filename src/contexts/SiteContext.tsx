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

  const refresh = useCallback(async () => {
    const siteData = await api.getSiteData();
    setData(siteData);
  }, []);

  useEffect(() => {
    refresh();
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
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
