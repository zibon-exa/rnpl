'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User, UserRole, AuthContextType } from '@/types/user';
import { mockUsers } from './mock-users';

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
          
          // Migrate old user data to new mock database if needed
          const matchedUser = mockUsers.find(u => 
            u.id === parsedUser.id || 
            u.nameEn === parsedUser.name || 
            u.nameBn === parsedUser.name
          );

          if (matchedUser) {
            setUser(matchedUser);
            localStorage.setItem('rnpl_user', JSON.stringify(matchedUser));
          } else {
            setUser(parsedUser);
          }
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

  const login = (email: string, password: string): boolean => {
    // Validate credentials - for demo, accept any email with password '123123'
    // In production, this would validate against a database
    const validPassword = '123123';
    
    if (password !== validPassword) {
      return false;
    }

    // Find user by email, or use admin as default
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    const userToLogin = foundUser || mockUsers.find(u => u.role === 'Admin') || mockUsers[0];

    setUser(userToLogin);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('rnpl_user', JSON.stringify(userToLogin));
    }

    // Redirect to dashboard
    router.push('/dashboard');
    return true;
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

