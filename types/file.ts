export type FileStatus = 'Draft' | 'Pending' | 'In Review' | 'Approved' | 'Returned';

export interface HistoryEntry {
  timestamp: string;
  actor: string;
  event: string;
  stateChange: FileStatus;
  note?: string;
}

export interface File {
  id: string;
  title: string;
  category: string;
  status: FileStatus;
  lastUpdated: string;
  sender: string;
  isApproverAction: boolean;
  summary?: string;
  documentBody?: string;
  history: HistoryEntry[];
  tags?: string;
  approvalComment?: string;
  returnComment?: string;
  forwardingNote?: string;
}

export interface Notification {
  id: string;
  type: 'Action' | 'Urgent' | 'Success' | 'Attention' | 'Info';
  message: string;
  subtext: string;
  icon: React.ReactNode;
  fileId: string;
  timestamp: Date;
}

