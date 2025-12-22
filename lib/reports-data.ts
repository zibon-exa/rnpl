/**
 * Simplified mock data for the Reports & Analytics page
 * Focused on actionable insights for executives
 */

// KPI Data - Matches KpiSparklineCard format
export interface ReportKpiData {
    title: string;
    value: string;
    subtext: string;
    trend: 'up' | 'down';
    status: 'success' | 'warning' | 'critical';
    description: string;
    sparklineData: { name: string; value: number }[];
}

export const reportKpiData: ReportKpiData[] = [
    {
        title: 'Avg. Approval Cycle',
        value: '3.2',
        subtext: 'Days (↓ 0.4 improved)',
        trend: 'down',
        status: 'success',
        description: 'Average time from file creation to final approval.',
        sparklineData: [
            { name: 'W1', value: 4.5 },
            { name: 'W2', value: 4.0 },
            { name: 'W3', value: 3.7 },
            { name: 'W4', value: 3.4 },
            { name: 'W5', value: 3.2 },
        ],
    },
    {
        title: 'Files Processed',
        value: '142',
        subtext: 'This Month (+18%)',
        trend: 'up',
        status: 'success',
        description: 'Total documents approved or finalized this period.',
        sparklineData: [
            { name: 'W1', value: 28 },
            { name: 'W2', value: 32 },
            { name: 'W3', value: 38 },
            { name: 'W4', value: 44 },
            { name: 'W5', value: 48 },
        ],
    },
    {
        title: 'Return Rate',
        value: '12%',
        subtext: '+4.5% vs last month',
        trend: 'up',
        status: 'critical',
        description: 'Percentage of documents returned for corrections.',
        sparklineData: [
            { name: 'W1', value: 6 },
            { name: 'W2', value: 8 },
            { name: 'W3', value: 9 },
            { name: 'W4', value: 11 },
            { name: 'W5', value: 12 },
        ],
    },
    {
        title: 'Overdue Files',
        value: '7',
        subtext: 'Needs Attention',
        trend: 'up',
        status: 'warning',
        description: 'Documents past their expected completion date.',
        sparklineData: [
            { name: 'W1', value: 3 },
            { name: 'W2', value: 4 },
            { name: 'W3', value: 5 },
            { name: 'W4', value: 6 },
            { name: 'W5', value: 7 },
        ],
    },
];


// Department Performance for the bar chart
export interface DepartmentPerformance {
    name: string;
    avgDays: number;
    filesProcessed: number;
}

export const departmentPerformance: DepartmentPerformance[] = [
    { name: 'IT', avgDays: 2.1, filesProcessed: 45 },
    { name: 'HR', avgDays: 2.8, filesProcessed: 32 },
    { name: 'Admin', avgDays: 3.5, filesProcessed: 28 },
    { name: 'Finance', avgDays: 4.2, filesProcessed: 37 },
    { name: 'Legal', avgDays: 5.1, filesProcessed: 12 },
];

// Impact Summary (Sustainability)
export const impactSummary = {
    manHoursSaved: 1245,
    papersSaved: 15820,
};
