'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { File } from '@/types/file';
import { initialFiles } from './mock-data';

interface FilesContextType {
  files: File[];
  addFile: (file: File) => void;
  updateFile: (id: string, updates: Partial<File>) => void;
  getMyFiles: () => File[];
  getPendingFiles: () => File[];
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<File[]>(initialFiles);

  const addFile = useCallback((file: File) => {
    setFiles(prev => [file, ...prev]);
  }, []);

  const updateFile = useCallback((id: string, updates: Partial<File>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const getMyFiles = useCallback(() => {
    // For Admin, show all files; for others, show only their files
    return files;
  }, [files]);

  const getPendingFiles = useCallback(() => {
    return files.filter(f => f.isApproverAction && (f.status === 'Pending' || f.status === 'Returned'));
  }, [files]);

  return (
    <FilesContext.Provider
      value={{
        files,
        addFile,
        updateFile,
        getMyFiles,
        getPendingFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FilesContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FilesProvider');
  }
  return context;
}

