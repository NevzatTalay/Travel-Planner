import React, { createContext, useState, useEffect, useMemo } from 'react';
import type { User } from '../types';
import { authService } from '../services/authService';
import type { LoginCredentials, RegisterCredentials } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Failed to load user from session:", error);
      authService.logout(); // Clear corrupted session
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const loggedInUser = authService.login(credentials);
    setUser(loggedInUser);
  };

  const register = async (credentials: RegisterCredentials) => {
    const newUser = authService.register(credentials);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
  }), [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
