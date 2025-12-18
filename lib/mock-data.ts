import { File } from '@/types/file';

export const initialFiles: File[] = [
  { 
    id: 'RNPL-1001', 
    title: 'চতুর্থ প্রান্তিক বাজেট বৈচিত্র্য প্রতিবেদন', 
    category: 'অর্থ', 
    status: 'Pending', 
    lastUpdated: '2025-12-07', 
    sender: 'Rashida Begum', 
    isApproverAction: true, 
    priority: 'High',
    dueDate: '2025-12-10',
    summary: 'প্রক্ষিপ্ত বাজেটের বিপরীতে চতুর্থ প্রান্তিক ব্যয়ের বিশ্লেষণ বৈচিত্র্যের ব্যাখ্যাসহ। অবিলম্বে অনুমোদনের প্রয়োজন।',
    documentBody: 'বিষয়: চতুর্থ প্রান্তিক (অক্টোবর-ডিসেম্বর ২০২৫) আর্থিক কার্যকারিতা পর্যালোচনা\n\nসারসংক্ষেপ:\nচতুর্থ প্রান্তিকের আর্থিক কার্যকারিতা পর্যালোচনায় দেখা যায় যে পরিচালন ব্যয়ে ১২% বৈচিত্র্য রয়েছে, যা মূলত অপ্রত্যাশিত সার্ভার মাইগ্রেশন খরচ দ্বারা চালিত। প্রকল্পিত বাজেট ছিল ২৫,০০,০০০ টাকা, কিন্তু প্রকৃত ব্যয় হয়েছে ২৮,০০,০০০ টাকা।\n\nবিশ্লেষণ:\n১. সার্ভার মাইগ্রেশন: ২,৫০,০০০ টাকা (অপ্রত্যাশিত)\n২. সফটওয়্যার লাইসেন্স: ৫০,০০০ টাকা (অতিরিক্ত)\n৩. রক্ষণাবেক্ষণ: ২,০০,০০০ টাকা (প্রত্যাশিত)\n\nসুপারিশ:\nবিপণন বাজেট থেকে ৩,০০,০০০ টাকা উদ্বৃত্ত রয়েছে। আমরা এই ঘাটতি কাটিয়ে উঠতে বিপণন বাজেট থেকে উদ্বৃত্ত পুনরায় বরাদ্দ করার সুপারিশ করি।\n\nআপনার পর্যালোচনার জন্য বিস্তারিত খাতা সংযুক্ত করা হয়েছে।',
    history: [
      { timestamp: '2025-12-07T10:45:00Z', actor: 'Rashida Begum', event: 'Sent for Approval', stateChange: 'Pending', note: 'Ready for review. Critical item due to year-end closing.' },
      { timestamp: '2025-12-06T09:00:00Z', actor: 'Rashida Begum', event: 'Draft Created', stateChange: 'Draft', note: 'Initial creation of the file.' },
    ],
    attachments: [
      { id: 'att-1', name: 'বাজেট_বিশ্লেষণ.xlsx', type: 'excel', size: 245760 },
      { id: 'att-2', name: 'খরচ_বিবরণ.pdf', type: 'pdf', size: 512000 },
      { id: 'att-3', name: 'চার্ট_চিত্র.png', type: 'image', size: 128000 },
    ]
  },
  { 
    id: 'RNPL-1002', 
    title: 'নতুন কর্মচারী অনবোর্ডিং নীতি', 
    category: 'মানবসম্পদ', 
    status: 'Approved', 
    lastUpdated: '2025-12-01', 
    sender: 'Karim Uddin', 
    isApproverAction: false, 
    priority: 'Medium',
    dueDate: '2025-12-15',
    summary: 'দূরবর্তী অনবোর্ডিং প্রক্রিয়ার জন্য আপডেট করা নির্দেশিকা। চূড়ান্ত অনুমোদনের প্রয়োজন।',
    documentBody: 'নীতি নম্বর: HR-POL-2025-12\nপ্রয়োগের তারিখ: ১ জানুয়ারি ২০২৬\n\nউদ্দেশ্য:\nদূরবর্তী অনবোর্ডিং অভিজ্ঞতাকে মানসম্মত করা এবং নতুন কর্মচারীদের জন্য একটি সুসংগঠিত প্রক্রিয়া নিশ্চিত করা।\n\nপরিধি:\n২০২৬ সালের ১ জানুয়ারির পর যোগদানকারী সকল পূর্ণকালীন কর্মচারী এই নীতির আওতায় আসবে।\n\nনীতি বিবরণ:\n১. শুরু হওয়ার তারিখের ৩ দিন আগে সকল আইটি সম্পদ (ল্যাপটপ, মাউস, কিবোর্ড) পাঠাতে হবে।\n২. চুক্তি স্বাক্ষরের পর স্বয়ংক্রিয়ভাবে IDM পোর্টালের মাধ্যমে অ্যাক্সেস ক্রেডেনশিয়াল সরবরাহ করা হবে।\n৩. প্রথম দিন একটি ভার্চুয়াল ওরিয়েন্টেশন সেশন অনুষ্ঠিত হবে।\n৪. প্রথম সপ্তাহে প্রতিদিন একজন মেন্টর নিয়োগ করা হবে।',
    history: [
      { timestamp: '2025-12-01T15:00:00Z', actor: 'তৌফিক জোয়ার্দার', event: 'Approved', stateChange: 'Approved', note: 'Policy looks solid. Go live next week.' },
      { timestamp: '2025-12-01T10:00:00Z', actor: 'Karim Uddin', event: 'Sent for Approval', stateChange: 'Pending', note: 'Please review the scope changes.' },
      { timestamp: '2025-11-28T09:00:00Z', actor: 'Karim Uddin', event: 'Draft Created', stateChange: 'Draft', note: 'Initial policy draft.' },
    ]
  },
  { 
    id: 'RNPL-1003', 
    title: 'অফিস স্পেস সংস্কার প্রস্তাব', 
    category: 'প্রশাসন', 
    status: 'Returned', 
    lastUpdated: '2025-12-02', 
    sender: 'Fatima Ahmed', 
    isApproverAction: true, 
    priority: 'High',
    dueDate: '2025-12-05',
    summary: 'নতুন মিটিং রুম সহ তৃতীয় তলার সংস্কারের জন্য খরচ অনুমান। পুনরায় জমা দেওয়ার প্রয়োজন।',
    documentBody: 'প্রস্তাবিত প্রকল্প: তৃতীয় তলার অফিস স্পেস সংস্কার\n\nভেন্ডর: A-1 Construction Ltd.\nঅনুমানকৃত খরচ: ৩৫,০০,০০০ টাকা\nসময়সীমা: ৩ সপ্তাহ\n\nকাজের পরিধি:\n১. বিদ্যমান ক্যুবিকল ভাঙা এবং অপসারণ\n২. কাচের পার্টিশন স্থাপন (মোট ২০০ বর্গফুট)\n৩. ৪টি নতুন কনফারেন্স রুমের জন্য বৈদ্যুতিক রিওয়্যারিং\n৪. নতুন LED লাইটিং সিস্টেম ইনস্টলেশন\n৫. HVAC সিস্টেম আপগ্রেড\n\nঅনুমোদনের জন্য জমা দেওয়া হয়েছে।',
    history: [
      { timestamp: '2025-12-02T16:30:00Z', actor: 'তৌফিক জোয়ার্দার', event: 'Returned', stateChange: 'Returned', note: 'Cost is too high. Find a cheaper vendor and resubmit.' },
      { timestamp: '2025-12-02T11:00:00Z', actor: 'Fatima Ahmed', event: 'Sent for Approval', stateChange: 'Pending', note: 'Urgent renovation request.' },
      { timestamp: '2025-12-01T09:00:00Z', actor: 'Fatima Ahmed', event: 'Draft Created', stateChange: 'Draft', note: 'Initial estimate.' },
    ],
    attachments: [
      { id: 'att-4', name: 'ভেন্ডর_প্রস্তাব.pdf', type: 'pdf', size: 1024000 },
      { id: 'att-5', name: 'ফ্লোর_প্ল্যান.jpg', type: 'image', size: 768000 },
    ]
  },
  { 
    id: 'RNPL-1004', 
    title: 'সার্ভার আপগ্রেড অনুরোধ', 
    category: 'আইটি', 
    status: 'Draft', 
    lastUpdated: '2025-12-03', 
    sender: 'তৌফিক জোয়ার্দার', 
    isApproverAction: false, 
    priority: 'Medium',
    summary: 'প্রাথমিক ক্লাস্টারের জন্য ৩টি নতুন ব্লেডের অনুরোধ।',
    documentBody: 'বিষয়: প্রাথমিক কম্পিউট ক্লাস্টার সম্প্রসারণ\n\nবর্তমান অবস্থা:\nআমরা বর্তমানে আমাদের প্রাথমিক কম্পিউট ক্লাস্টারে ৮৫% ক্ষমতায় পৌঁছেছি। বর্তমানে ১২টি ব্লেড সক্রিয় রয়েছে।\n\nপ্রস্তাব:\nআসন্ন পিক সিজনে স্থিতিশীলতা নিশ্চিত করতে, আমরা ৩টি Dell PowerEdge R750 ব্লেড সার্ভারের ক্রয়ের অনুরোধ করছি।\n\nবিশদ:\n- মডেল: Dell PowerEdge R750\n- প্রসেসর: Intel Xeon Silver 4314 (2.4GHz, 16-core)\n- RAM: 128GB DDR4\n- স্টোরেজ: 2x 1.92TB NVMe SSD\n- মোট খরচ: ১২,০০,০০০ টাকা\n\nপ্রত্যাশিত ডেলিভারি: ২ সপ্তাহ',
    history: [
      { timestamp: '2025-12-03T10:00:00Z', actor: 'তৌফিক জোয়ার্দার', event: 'Draft Saved', stateChange: 'Draft', note: 'Initial draft, pending content review.' },
    ]
  },
  { 
    id: 'RNPL-1005', 
    title: 'মার্কেটিং ক্যাম্পেইন লঞ্চ পরিকল্পনা', 
    category: 'প্রশাসন', 
    status: 'Pending', 
    lastUpdated: '2025-12-04', 
    sender: 'Nusrat Jahan', 
    isApproverAction: true, 
    priority: 'Medium',
    dueDate: '2025-12-20',
    summary: 'প্রথম প্রান্তিক সোশ্যাল মিডিয়া ব্লিটজ কৌশল। বাজেট স্বাক্ষরের প্রয়োজন।',
    documentBody: 'ক্যাম্পেইন: Q1 2026 Enterprise Feature Launch Campaign\n\nকৌশল:\nআমাদের নতুন এন্টারপ্রাইজ বৈশিষ্ট্যগুলিতে ফোকাস করে LinkedIn এবং Twitter-এ আক্রমনাত্মক টার্গেটেড বিজ্ঞাপন।\n\nলক্ষ্য:\n- B2B লিড জেনারেশন: ৫০০+ যোগ্য লিড\n- ব্র্যান্ড সচেতনতা বৃদ্ধি: ১০০K+ ইম্প্রেশন\n- ওয়েবসাইট ট্রাফিক: ২৫% বৃদ্ধি\n\nবাজেট:\n- LinkedIn Ads: ২,৫০,০০০ টাকা/মাস\n- Twitter Ads: ১,৫০,০০০ টাকা/মাস\n- মোট: ৪,০০,০০০ টাকা/মাস\n\nসময়কাল: জানুয়ারি - মার্চ ২০২৬ (৩ মাস)\n\nমোট বাজেট: ১২,০০,০০০ টাকা',
    history: [
      { timestamp: '2025-12-04T12:00:00Z', actor: 'Nusrat Jahan', event: 'Sent for Approval', stateChange: 'Pending', note: 'Submitted to Finance for budget review.' },
      { timestamp: '2025-12-04T09:00:00Z', actor: 'Nusrat Jahan', event: 'Draft Created', stateChange: 'Draft', note: 'Campaign shell built.' },
    ],
    attachments: [
      { id: 'att-6', name: 'ক্যাম্পেইন_বাজেট.xlsx', type: 'excel', size: 384000 },
    ]
  },
  { 
    id: 'RNPL-1006', 
    title: 'Annual Security Audit Report 2025', 
    category: 'আইটি', 
    status: 'Approved', 
    lastUpdated: '2025-12-05', 
    sender: 'Mohammad Hasan', 
    isApproverAction: false, 
    priority: 'Urgent',
    dueDate: '2025-12-06',
    summary: 'Comprehensive security audit findings and recommendations for Q1 2026 improvements.',
    documentBody: 'Subject: Annual Security Audit Report - 2025\n\nExecutive Summary:\nThis report presents the findings from our comprehensive annual security audit conducted in November 2025. The audit covered network infrastructure, application security, access controls, and compliance with ISO 27001 standards.\n\nKey Findings:\n1. Network Security: 95% compliance - Minor improvements needed in firewall rules\n2. Application Security: 88% compliance - Two medium-risk vulnerabilities identified\n3. Access Controls: 92% compliance - Some inactive accounts need deactivation\n4. Data Backup: 100% compliance - All systems properly backed up\n\nRecommendations:\n1. Update firewall rules by January 15, 2026\n2. Patch identified vulnerabilities by December 20, 2025\n3. Review and deactivate inactive user accounts monthly\n4. Implement two-factor authentication for all admin accounts\n\nOverall Security Rating: A- (Excellent)\n\nThis report has been reviewed and approved by the IT Security Committee.',
    history: [
      { timestamp: '2025-12-05T14:00:00Z', actor: 'তৌফিক জোয়ার্দার', event: 'Approved', stateChange: 'Approved', note: 'Excellent work. Implement recommendations as scheduled.' },
      { timestamp: '2025-12-05T10:00:00Z', actor: 'Mohammad Hasan', event: 'Sent for Approval', stateChange: 'Pending', note: 'Annual audit complete. Ready for review.' },
      { timestamp: '2025-11-30T08:00:00Z', actor: 'Mohammad Hasan', event: 'Draft Created', stateChange: 'Draft', note: 'Compiling audit results.' },
    ],
    attachments: [
      { id: 'att-7', name: 'Security_Audit_Report.pdf', type: 'pdf', size: 2048000 },
      { id: 'att-8', name: 'Vulnerability_Scan_Results.xlsx', type: 'excel', size: 512000 },
      { id: 'att-9', name: 'Network_Diagram.png', type: 'image', size: 640000 },
    ]
  },
  { 
    id: 'RNPL-1007', 
    title: 'Employee Training Program Proposal', 
    category: 'মানবসম্পদ', 
    status: 'Pending', 
    lastUpdated: '2025-12-06', 
    sender: 'Sharmin Akter', 
    isApproverAction: true, 
    priority: 'Low',
    dueDate: '2026-01-15',
    summary: 'Proposal for Q1 2026 technical skills training program for 50 employees. Budget approval required.',
    documentBody: 'Proposal: Technical Skills Enhancement Program - Q1 2026\n\nObjective:\nTo enhance technical competencies of our development and operations teams through structured training programs.\n\nProgram Details:\n1. Cloud Infrastructure Training (AWS/Azure)\n   - Duration: 40 hours\n   - Participants: 20 employees\n   - Cost: 3,00,000 BDT\n\n2. DevOps & CI/CD Best Practices\n   - Duration: 32 hours\n   - Participants: 15 employees\n   - Cost: 2,00,000 BDT\n\n3. Advanced Database Management\n   - Duration: 24 hours\n   - Participants: 15 employees\n   - Cost: 1,50,000 BDT\n\nTotal Budget: 6,50,000 BDT\nTimeline: January - March 2026\n\nExpected Outcomes:\n- Improved project delivery times\n- Reduced infrastructure costs\n- Enhanced team capabilities\n\nApproval required for budget allocation.',
    history: [
      { timestamp: '2025-12-06T11:30:00Z', actor: 'Sharmin Akter', event: 'Sent for Approval', stateChange: 'Pending', note: 'Training program ready for budget approval.' },
      { timestamp: '2025-12-05T15:00:00Z', actor: 'Sharmin Akter', event: 'Draft Created', stateChange: 'Draft', note: 'Drafting training proposal.' },
    ]
  },
];
