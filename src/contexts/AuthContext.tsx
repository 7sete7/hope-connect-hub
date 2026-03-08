import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '@/services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());

  const login = useCallback(async (email: string, password: string) => {
    await api.login(email, password);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
