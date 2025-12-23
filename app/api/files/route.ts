import { NextRequest, NextResponse } from 'next/server';
import { loadAllFiles, saveFile, getFileById, deleteFile } from '@/lib/file-storage';
import { File } from '@/types/file';

/**
 * GET /api/files - Get all files
 */
export async function GET() {
  try {
    const files = await loadAllFiles();
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error loading files:', error);
    return NextResponse.json(
      { error: 'Failed to load files' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/files - Create or update a file
 */
export async function POST(request: NextRequest) {
  try {
    const file: File = await request.json();
    
    // Validate required fields
    if (!file.id || !file.title || !file.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await saveFile(file);
    return NextResponse.json({ success: true, file });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json(
      { error: 'Failed to save file' },
      { status: 500 }
    );
  }
}

