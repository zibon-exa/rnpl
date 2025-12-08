'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { Header } from '@/components/header';
import { CreateFileForm } from '@/components/create-file-form';
import { useRouter } from 'next/navigation';
import { File } from '@/types/file';

export default function CreateFilePage() {
  const { user } = useRequireAuth();
  const { addFile } = useFiles();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleCreateSuccess = (file: File, isDraft: boolean) => {
    addFile(file);
    if (isDraft) {
      router.push('/dashboard/files');
    } else {
      router.push(`/dashboard/files/${file.id}`);
    }
  };


  return (
    <div className="h-screen overflow-hidden bg-slate-50/50 flex flex-col">
      <Header />
      
      <main className="flex-1 overflow-hidden">
        <CreateFileForm 
          user={user} 
          onCreateSuccess={handleCreateSuccess}
          onCancel={() => router.push('/dashboard')}
        />
      </main>
    </div>
  );
}

