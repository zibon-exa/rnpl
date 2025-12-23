/**
 * File storage utilities for local file system persistence
 * Files are stored in data/files/ directory organized by year/month
 */

import { File } from '@/types/file';
import { promises as fs } from 'fs';
import path from 'path';

// Use absolute path for data directory
const DATA_DIR = path.join(process.cwd(), 'data', 'files');

/**
 * Get file path based on file ID and date
 * Organizes files by year/month: data/files/YYYY/MM/fileId.json
 */
function getFilePath(fileId: string, date: string): string {
  const dateObj = new Date(date + 'T00:00:00');
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dirPath = path.join(DATA_DIR, String(year), month);
  return path.join(dirPath, `${fileId}.json`);
}

/**
 * Ensure directory exists
 */
async function ensureDirectory(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Save file to disk
 */
export async function saveFile(file: File): Promise<void> {
  try {
    const filePath = getFilePath(file.id, file.lastUpdated);
    await ensureDirectory(filePath);
    await fs.writeFile(filePath, JSON.stringify(file, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file');
  }
}

/**
 * Load file from disk
 */
export async function loadFile(fileId: string, date: string): Promise<File | null> {
  try {
    const filePath = getFilePath(fileId, date);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as File;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null; // File doesn't exist
    }
    console.error('Error loading file:', error);
    throw new Error('Failed to load file');
  }
}

/**
 * Delete file from disk
 */
export async function deleteFile(fileId: string, date: string): Promise<void> {
  try {
    const filePath = getFilePath(fileId, date);
    await fs.unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }
}

/**
 * Load all files from disk
 * Scans the data/files directory recursively
 */
export async function loadAllFiles(): Promise<File[]> {
  try {
    const files: File[] = [];
    
    async function scanDirectory(dir: string): Promise<void> {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            await scanDirectory(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.json')) {
            try {
              const content = await fs.readFile(fullPath, 'utf-8');
              const file = JSON.parse(content) as File;
              files.push(file);
            } catch (error) {
              console.error(`Error reading file ${fullPath}:`, error);
            }
          }
        }
      } catch (error) {
        // Directory might not exist yet, that's okay
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          console.error(`Error scanning directory ${dir}:`, error);
        }
      }
    }
    
    await scanDirectory(DATA_DIR);
    
    // Sort by lastUpdated descending (newest first)
    return files.sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  } catch (error) {
    console.error('Error loading all files:', error);
    return [];
  }
}

/**
 * Get file by ID (searches all directories)
 */
export async function getFileById(fileId: string): Promise<File | null> {
  try {
    const allFiles = await loadAllFiles();
    return allFiles.find(f => f.id === fileId) || null;
  } catch (error) {
    console.error('Error getting file by ID:', error);
    return null;
  }
}

