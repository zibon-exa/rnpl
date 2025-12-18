'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarPath } from '@/lib/avatar-utils';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { BlockerData } from '@/lib/dashboard-data';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlockerListProps {
  data: BlockerData[];
}

export function BlockerList({ data }: BlockerListProps) {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlocker, setSelectedBlocker] = useState<BlockerData | null>(null);

  const handleNudgeClick = (blocker: BlockerData) => {
    setSelectedBlocker(blocker);
    setIsModalOpen(true);
  };

  const handleConfirmNudge = () => {
    if (selectedBlocker) {
      toast({
        title: 'Priority Reminder Sent',
        description: `Sending priority reminder to ${selectedBlocker.name}...`,
      });
      setIsModalOpen(false);
      setSelectedBlocker(null);
    }
  };

  const handleCancelNudge = () => {
    setIsModalOpen(false);
    setSelectedBlocker(null);
  };

  return (
    <Card className="bg-white border-slate-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800">
          Top 5 Blockers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead className="text-right">Files Pending</TableHead>
              <TableHead className="text-right w-24">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((blocker) => (
              <TableRow key={blocker.rank}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getAvatarPath(blocker.name)} alt={blocker.name} />
                      <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                        {blocker.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {blocker.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {blocker.role}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-900">
                      {blocker.filesPending}
                    </span>
                    <span className="text-xs text-slate-500">
                      &gt;{blocker.hoursPending}hrs
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNudgeClick(blocker)}
                    className="h-8 w-8 p-0"
                  >
                    <Bell size={14} className="text-slate-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelNudge}
        title="Send Reminder"
      >
        {selectedBlocker && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to send a priority reminder?
            </p>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getAvatarPath(selectedBlocker.name)} alt={selectedBlocker.name} />
                  <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                    {selectedBlocker.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {selectedBlocker.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {selectedBlocker.role}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Files Pending: <span className="font-semibold text-slate-900">{selectedBlocker.filesPending}</span> (&gt;{selectedBlocker.hoursPending}hrs)
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={handleCancelNudge}
                className="text-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmNudge}
                className="text-white"
                style={{ 
                  backgroundColor: 'hsl(var(--color-brand))',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(196, 60%, 50%)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--color-brand))'}
              >
                Send Reminder
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}

