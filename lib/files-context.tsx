'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { File } from '@/types/file';
import { initialFiles } from './mock-data';

interface FilesContextType {
  files: File[];
  addFile: (file: File) => void;
  updateFile: (id: string, updates: Partial<File>) => void;
  getMyFiles: () => File[];
  getPendingFiles: () => File[];
  isLoading: boolean;
  refreshFiles: () => Promise<void>;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [isLoading, setIsLoading] = useState(true);

  // Load files from API on mount
  const loadFiles = useCallback(async () => {
    try {
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        // Merge with initial files if API returns empty (for initial setup)
        if (data.files && data.files.length > 0) {
          setFiles(data.files);
        } else {
          // If no files in storage, use initial mock files and save them
          setFiles(initialFiles);
          // Save initial files to storage
          for (const file of initialFiles) {
            try {
              await fetch('/api/files', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(file),
              });
            } catch (error) {
              console.error('Error saving initial file:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading files:', error);
      // Fallback to initial files if API fails
      setFiles(initialFiles);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const addFile = useCallback(async (file: File) => {
    setFiles(prev => [file, ...prev]);
    
    // Persist to file system
    try {
      await fetch('/api/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
      });
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }, []);

  const updateFile = useCallback(async (id: string, updates: Partial<File>) => {
    const updatedFiles = files.map(f => f.id === id ? { ...f, ...updates } : f);
    setFiles(updatedFiles);
    
    // Persist to file system
    try {
      const updatedFile = updatedFiles.find(f => f.id === id);
      if (updatedFile) {
        await fetch(`/api/files/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
      }
    } catch (error) {
      console.error('Error updating file:', error);
    }
  }, [files]);

  const getMyFiles = useCallback(() => {
    // For Admin, show all files; for others, show only their files
    return files;
  }, [files]);

  const getPendingFiles = useCallback(() => {
    return files.filter(f => f.isApproverAction && (f.status === 'Pending' || f.status === 'Returned'));
  }, [files]);

  const refreshFiles = useCallback(async () => {
    await loadFiles();
  }, [loadFiles]);

  return (
    <FilesContext.Provider
      value={{
        files,
        addFile,
        updateFile,
        getMyFiles,
        getPendingFiles,
        isLoading,
        refreshFiles,
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

