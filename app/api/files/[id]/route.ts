import { NextRequest, NextResponse } from 'next/server';
import { getFileById, saveFile, deleteFile } from '@/lib/file-storage';
import { File } from '@/types/file';

/**
 * GET /api/files/[id] - Get a specific file
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    const file = await getFileById(fileId);
    
    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ file });
  } catch (error) {
    console.error('Error loading file:', error);
    return NextResponse.json(
      { error: 'Failed to load file' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/files/[id] - Update a file
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    const updates: Partial<File> = await request.json();
    
    const existingFile = await getFileById(fileId);
    if (!existingFile) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    const updatedFile: File = {
      ...existingFile,
      ...updates,
      id: fileId, // Ensure ID doesn't change
      lastUpdated: updates.lastUpdated || existingFile.lastUpdated,
    };
    
    await saveFile(updatedFile);
    return NextResponse.json({ success: true, file: updatedFile });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/files/[id] - Delete a file
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    const file = await getFileById(fileId);
    
    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }
    
    await deleteFile(fileId, file.lastUpdated);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

