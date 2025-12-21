/**
 * Mock data for Executive Command Center dashboard components
 */

// KPI Sparkline Data
export interface KpiData {
  title: string;
  value: string;
  subtext: string;
  trend: 'up' | 'down';
  status: 'success' | 'warning' | 'critical';
  description: string;
  sparklineData: { name: string; value: number }[];
}

export const kpiData: KpiData[] = [
  {
    title: 'Avg Approval Cycle',
    value: '3.2',
    subtext: 'Days',
    trend: 'down',
    status: 'success',
    description: 'Average time taken to approve a document across all departments. Lower is better.',
    sparklineData: [
      { name: 'W1', value: 4.5 },
      { name: 'W2', value: 4.2 },
      { name: 'W3', value: 3.8 },
      { name: 'W4', value: 3.5 },
      { name: 'W5', value: 3.2 },
    ],
  },
  {
    title: 'Approval Ratio',
    value: '94%',
    subtext: '+2.1% vs last month',
    trend: 'up',
    status: 'success',
    description: 'Percentage of documents approved without being returned or rejected.',
    sparklineData: [
      { name: 'W1', value: 88 },
      { name: 'W2', value: 90 },
      { name: 'W3', value: 91 },
      { name: 'W4', value: 93 },
      { name: 'W5', value: 94 },
    ],
  },
  {
    title: 'Deadline Adherence',
    value: '88%',
    subtext: '-3.2% vs target',
    trend: 'down',
    status: 'warning',
    description: 'Percentage of tasks completed within the stipulated timeframe or citizen charter.',
    sparklineData: [
      { name: 'W1', value: 92 },
      { name: 'W2', value: 90 },
      { name: 'W3', value: 89 },
      { name: 'W4', value: 88 },
      { name: 'W5', value: 88 },
    ],
  },
  {
    title: 'Return Rate',
    value: '12%',
    subtext: '+4.5% spike',
    trend: 'up',
    status: 'critical',
    description: 'Percentage of documents returned for corrections or missing information.',
    sparklineData: [
      { name: 'W1', value: 6 },
      { name: 'W2', value: 7 },
      { name: 'W3', value: 8 },
      { name: 'W4', value: 10 },
      { name: 'W5', value: 12 },
    ],
  },
];

// Department Heatmap Data
export interface DepartmentData {
  name: string;
  overdueItems: number;
  totalItems: number;
  status: 'high' | 'medium' | 'low';
}

export const departmentData: DepartmentData[] = [
  {
    name: 'Finance',
    overdueItems: 24,
    totalItems: 156,
    status: 'high',
  },
  {
    name: 'HR',
    overdueItems: 15,
    totalItems: 98,
    status: 'medium',
  },
  {
    name: 'Operations',
    overdueItems: 28,
    totalItems: 203,
    status: 'high',
  },
  {
    name: 'IT',
    overdueItems: 7,
    totalItems: 87,
    status: 'low',
  },
  {
    name: 'Legal',
    overdueItems: 12,
    totalItems: 45,
    status: 'medium',
  },
  {
    name: 'Admin',
    overdueItems: 5,
    totalItems: 67,
    status: 'low',
  },
];

// Blocker List Data
export interface BlockerData {
  rank: number;
  name: string;
  role: string;
  avatar: string;
  avatarId?: number;
  filesPending: number;
  hoursPending: number;
}

export const blockerData: BlockerData[] = [
  {
    rank: 1,
    name: 'Toufique Joarder',
    role: 'Managing Director',
    avatar: 'TJ',
    avatarId: 1,
    filesPending: 8,
    hoursPending: 96,
  },
  {
    rank: 2,
    name: 'Fatima Ahmed',
    role: 'Director',
    avatar: 'FA',
    avatarId: 4,
    filesPending: 6,
    hoursPending: 84,
  },
  {
    rank: 3,
    name: 'Karim Uddin',
    role: 'Manager',
    avatar: 'KU',
    avatarId: 2,
    filesPending: 5,
    hoursPending: 78,
  },
  {
    rank: 4,
    name: 'Abul Kashem',
    role: 'Chief Financial Officer',
    avatar: 'AK',
    avatarId: 7,
    filesPending: 4,
    hoursPending: 75,
  },
  {
    rank: 5,
    name: 'Nusrat Jahan',
    role: 'Assistant Manager',
    avatar: 'NJ',
    avatarId: 5,
    filesPending: 3,
    hoursPending: 73,
  },
];

// Efficiency Scatter Chart Data
export interface EfficiencyData {
  department: string;
  returnRate: number; // X-axis (Quality)
  averageSpeed: number; // Y-axis (Velocity) - in days
}

export const efficiencyData: EfficiencyData[] = [
  { department: 'Finance', returnRate: 15, averageSpeed: 5.2 },
  { department: 'HR', returnRate: 8, averageSpeed: 3.1 },
  { department: 'Operations', returnRate: 18, averageSpeed: 6.5 },
  { department: 'IT', returnRate: 5, averageSpeed: 2.3 },
  { department: 'Legal', returnRate: 12, averageSpeed: 4.8 },
  { department: 'Admin', returnRate: 6, averageSpeed: 2.8 },
  { department: 'Marketing', returnRate: 10, averageSpeed: 3.5 },
  { department: 'Procurement', returnRate: 14, averageSpeed: 5.1 },
];

// Risk & Escalation Trend Data
export interface RiskTrendData {
  month: string;
  escalations: number;
  risks: number;
}

export const riskTrendData: RiskTrendData[] = [
  { month: 'Jan', escalations: 12, risks: 8 },
  { month: 'Feb', escalations: 15, risks: 10 },
  { month: 'Mar', escalations: 18, risks: 12 },
  { month: 'Apr', escalations: 14, risks: 9 },
  { month: 'May', escalations: 20, risks: 15 },
  { month: 'Jun', escalations: 22, risks: 18 },
  { month: 'Jul', escalations: 19, risks: 14 },
  { month: 'Aug', escalations: 24, risks: 16 },
  { month: 'Sep', escalations: 21, risks: 13 },
  { month: 'Oct', escalations: 25, risks: 17 },
  { month: 'Nov', escalations: 23, risks: 15 },
  { month: 'Dec', escalations: 26, risks: 19 },
];
