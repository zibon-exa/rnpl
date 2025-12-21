'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { DelayedFileData } from '@/lib/dashboard-data';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FileCompactItem } from '@/components/file-compact-item';

interface DelayedFilesListProps {
  data: DelayedFileData[];
}

export function DelayedFilesList({ data }: DelayedFilesListProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DelayedFileData | null>(null);

  const handleNudgeClick = (file: DelayedFileData) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleConfirmNudge = () => {
    if (selectedFile) {
      toast({
        title: 'Priority Reminder Sent',
        description: `Sending priority reminder for file ${selectedFile.id}...`,
      });
      setIsModalOpen(false);
      setSelectedFile(null);
    }
  };

  const handleCancelNudge = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileClick = (file: DelayedFileData) => {
    router.push(`/files/${file.id}`);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Top 5 Delayed Files
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100">
                  <TableHead className="text-xs font-medium text-slate-500 px-6 py-3">
                    File
                  </TableHead>
                  <TableHead className="text-xs font-medium text-slate-500 px-3 py-3 text-center">
                    Delayed
                  </TableHead>
                  <TableHead className="text-xs font-medium text-slate-500 px-3 py-3 text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((file) => (
                  <TableRow 
                    key={file.id} 
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="px-6 py-4">
                      <FileCompactItem
                        id={file.id}
                        title={file.title}
                        category={file.category}
                        sender={file.sender}
                        status={file.status}
                        lastUpdated={file.lastUpdated}
                        documentBody={file.documentBody}
                        onClick={() => handleFileClick(file)}
                      />
                    </TableCell>
                    
                    <TableCell className="px-3 py-4 text-center">
                      <span className="text-sm font-semibold text-slate-900">
                        {file.delayedDays}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">Days</span>
                    </TableCell>
                    
                    <TableCell className="px-3 py-4 text-center">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNudgeClick(file);
                        }}
                        className="h-8 w-8 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        <Bell size={14} />
                        <span className="sr-only">Send reminder</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Nudge Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelNudge}
        title="Send Priority Reminder"
      >
        <div className="space-y-4">
          <p className="text-slate-600">
            {selectedFile
              ? `Send a priority reminder for file "${selectedFile.title}" (${selectedFile.id})?`
              : ''}
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleCancelNudge}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmNudge}
            >
              Send Reminder
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}