'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BlockerData } from '@/lib/dashboard-data';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlockerListProps {
  data: BlockerData[];
}

export function BlockerList({ data }: BlockerListProps) {
  const { toast } = useToast();

  const handleNudge = (name: string) => {
    toast({
      title: 'Priority Reminder Sent',
      description: `Sending priority reminder to ${name}...`,
    });
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
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead className="text-right">Files Pending</TableHead>
              <TableHead className="text-right w-24">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((blocker) => (
              <TableRow key={blocker.rank}>
                <TableCell>
                  <span className="text-sm font-semibold text-slate-600">
                    #{blocker.rank}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
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
                    onClick={() => handleNudge(blocker.name)}
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
    </Card>
  );
}

