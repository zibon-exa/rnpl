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
          const parsedUser = JSON.parse(storedUser);
          // Migrate old user data if needed
          if (parsedUser.name === 'Abdul Karim' || parsedUser.name === 'Toufique Joarder') {
            parsedUser.name = 'তৌফিক জোয়ার্দার';
            parsedUser.email = 'toufique.joarder@rnpl.com';
            localStorage.setItem('rnpl_user', JSON.stringify(parsedUser));
          }
          setUser(parsedUser);
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
      name: 'তৌফিক জোয়ার্দার',
      email: 'toufique.joarder@rnpl.com',
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

