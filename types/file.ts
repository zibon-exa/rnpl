export type FileStatus = 'Draft' | 'Pending' | 'In Review' | 'Approved' | 'Returned';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface HistoryEntry {
  timestamp: string;
  actor: string;
  event: string;
  stateChange: FileStatus;
  note?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'excel' | 'word' | 'other';
  size: number; // in bytes
  url?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  avatarId?: number;
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
  comments?: Comment[];
  tags?: string;
  approvalComment?: string;
  returnComment?: string;
  forwardingNote?: string;
  attachments?: Attachment[];
  priority?: Priority;
  dueDate?: string;
  language?: 'bn' | 'en';
  sendTo?: string;
  sendCopies?: string[];
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

