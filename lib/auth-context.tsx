'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User, UserRole, AuthContextType } from '@/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('rnpl_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          // Invalid stored data, clear it
          localStorage.removeItem('rnpl_user');
        }
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (password: string) => {
    // Prototype: Always create Admin user with all permissions
    const adminUser: User = {
      id: 'admin-001',
      name: 'Abdul Karim',
      email: 'abdul.karim@rnpl.com',
      role: 'Admin',
      office: 'Administration',
    };

    setUser(adminUser);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('rnpl_user', JSON.stringify(adminUser));
    }

    // Always redirect to dashboard
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rnpl_user');
    }
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

