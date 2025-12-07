# Product Requirements Document (PRD)
## RNPL Note - MVP

**Version:** 1.0  
**Date:** December 2025  
**Status:** MVP Scope

---

## 1. Introduction

RNPL Note is a lightweight digital note and file management system designed to simplify how organizations manage official documents, approvals, and collaborative workflows. The MVP delivers essential functionality for operational use, prioritizing simplicity and efficiency.

### 1.1 Objectives

- Enable users to create, manage, track, and approve digital files
- Replace traditional paper-based processes with structured workflows
- Provide immediate productivity boost without unnecessary complexity
- Support role-based access control and approval workflows

---

## 2. MVP Scope

The MVP includes the following essential modules:

1. User Dashboard
2. Create File / Note
3. Approval Workflow
4. Notifications (In-app only)
5. User Login & Authentication
6. Admin Login & Setup
7. User Management
8. File Categories & System Settings

---

## 3. User Workspace Requirements

### 3.1 Dashboard

**Purpose:** Primary workspace providing immediate visibility into files, pending approvals, and system tasks.

#### 3.1.1 Top Navigation Bar
- System logo
- User profile menu with:
  - My Profile
  - Logout
- Main navigation modules:
  - Dashboard
  - My Files
  - Pending Approvals
  - Create File

#### 3.1.2 Welcome Summary
Display header showing:
- User name
- User role (User / Reviewer / Approver)
- Current date
- Quick system instructions (optional)

#### 3.1.3 Quick Action Cards
- **Create New File** - Opens file creation form
- **View My Files** - Shows all files created by the user
- **Files Pending My Approval** - Visible only if user is an approver

#### 3.1.4 Pending Files List
Real-time overview of files requiring user action. Each file card displays:
- File title
- File ID
- Last updated date
- Sender name
- Status (Pending, Returned, In Review)
- "Open File" button

#### 3.1.5 My Files
Centralized access to all user-created files. File List Table includes:
- File title
- File ID
- Category
- Status (Draft, Pending, Approved, Returned)
- Last updated date
- View / Edit button

#### 3.1.6 Search, Filters, and Pagination
- Search by file title or File ID
- Filter by status
- Sort by date or category
- Pagination for large file lists

---

### 3.2 Create File

**Purpose:** Structured form to start a new digital file.

#### 3.2.1 File Metadata Input
Users provide:
- File Title (required)
- Subject / Summary (required)
- Category (dropdown, required)
- Tags (optional)

#### 3.2.2 Reference Number
- Auto-generated File ID for consistency
- Editable prefix settings (configured by Admin)

#### 3.2.3 Primary Actions
- **Save & Open File** - Creates file and opens it for editing
- **Save as Draft** - Saves file in draft status for later completion

---

### 3.3 Approval Workflow

**Purpose:** Enable file forwarding, approval, and return processes.

#### 3.3.1 Forward File
Users can send files to authorized users:
- Select receiver from authorized user list
- Add forwarding note (required)
- System marks file as **Pending Review**

#### 3.3.2 Approve File
Approvers can:
- Approve the file
- Add approval comment (optional)
- System marks file as **Approved**

#### 3.3.3 Return File
If correction is needed:
- Approver returns file to sender
- Add return comments (required)
- File is marked as **Returned**

#### 3.3.4 Workflow Rules
- Notes are required before forwarding
- Only approvers can approve files
- Senders cannot edit forwarded files until they are returned
- Reviewers can review content but cannot approve

---

### 3.4 Notifications

**Purpose:** Keep users informed about workflow changes in real-time.

#### 3.4.1 Notification Triggers
Notifications are generated for:
- File forwarded
- File returned
- File approved
- Document attached
- File added

#### 3.4.2 Delivery Method
- In-app notification center
- Badge indicator on top navigation bar
- Real-time updates

**Note:** MVP includes only in-app notifications. Email/SMS notifications are excluded.

---

### 3.5 User Login & Authentication

**Purpose:** Secure authentication with role-based access control.

#### 3.5.1 Login / Logout
- Email and password-based authentication
- "Forgot Password" flow for password recovery
- Session management with automatic logout after inactivity

#### 3.5.2 Role-based Access
- **User:** Can access own files and pending approvals, create files
- **Reviewer:** Can review content but not approve
- **Approver:** Can approve, return, or forward files
- **Admin:** Full access to admin panel features (restricted access)

#### 3.5.3 Profile Management
Users can:
- View and update personal information:
  - Name
  - Contact information
  - Office assignment
- Update profile picture
- Change password

---

## 4. Admin Panel Requirements

### 4.1 Admin Login & Setup

**Purpose:** Secure admin access and system configuration.

#### 4.1.1 Login Authentication
- Email and password authentication
- "Forgot Password" link (optional)
- Strong authentication enforcement

#### 4.1.2 Access Control
- Only users with Admin role can access admin panel
- Unauthorized users are redirected to general login page

---

### 4.2 Admin Dashboard

**Purpose:** Centralized monitoring space with high-level system summary.

#### 4.2.1 Dashboard Summary Cards
Display:
- Total Files (system-wide)
- Files Pending Approvals
- Total Approved Files
- Number of Users
- Number of Offices
- Recent Activity Snapshot

#### 4.2.2 Activity Highlights
Chronological list showing:
- New files created
- Approvals completed
- Users added or updated
- Office-level changes

---

### 4.3 User Management

**Purpose:** Manage system users, roles, and access.

#### 4.3.1 User List Table
Displays all registered users with:
- Name
- Email
- Role (User / Reviewer / Approver / Admin)
- Office assignment
- Status (Active, Inactive)
- "Manage" button

#### 4.3.2 Create New User
Admin can create users by providing:
- Full name
- Email
- Phone
- Office assignment
- Role selection
- Password (auto-generated or manual entry)

#### 4.3.3 Edit User
Admins can update:
- User profile details
- Assigned role
- Office assignment
- Status (activate/deactivate)

#### 4.3.4 Reset Password
- Admin can securely issue new passwords for users

#### 4.3.5 Role Assignment
Supported roles:
- **User** - Can create files and write notes
- **Reviewer** - Can review content but not approve
- **Approver** - Can forward, return, and approve files
- **Admin** - Full access to all administrative controls

---

### 4.4 Office / Unit Management

**Purpose:** Structure organization within the system.

#### 4.4.1 Office List
Shows all offices with:
- Office name
- Office code
- Number of users
- Status (Active/Inactive)
- Manage button

#### 4.4.2 Create Office
Admins can define:
- Office name
- Code or abbreviation
- Optional descriptions

#### 4.4.3 Assign Users to Office
Admins can:
- Move users between offices
- View all users under an office
- Activate/deactivate offices

---

### 4.5 File Category & System Settings

**Purpose:** Configure system to match organization's document structure.

#### 4.5.1 File Categories
Admins can:
- Add new categories (e.g., HR, Finance, Administration)
- Edit category names
- Activate/deactivate categories

#### 4.5.2 System Settings
- Configure file ID prefix/format
- System-wide configuration options

---

## 5. Technical Requirements

### 5.1 Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Magic UI
- **Deployment:** Netlify / Vercel (for prototype)

### 5.2 Data Requirements
- User accounts with role-based permissions
- File/Note records with metadata
- Approval workflow history
- Notification records
- Office/Unit records
- Category records
- System settings

### 5.3 Security Requirements
- Secure authentication (email/password)
- Role-based access control
- Session management
- Password reset functionality
- Secure admin access

---

## 6. Out of Scope (Excluded from MVP)

The following features are explicitly excluded from the MVP:

1. Inward/Outward Letter Management
2. Multi-Office Routing Engine
3. Digital Signature Certificate (DSC) Integration
4. Workflow Automation & SLA Rules
5. Email/SMS Notifications (in-app only in MVP)
6. Mobile Applications
7. Bulk File Processing & Import Tools
8. Detailed Analytics and BI Dashboards

---

## 7. Success Criteria

The MVP is considered successful when:

1. Users can create, manage, and track digital files
2. Approval workflows function correctly with role-based permissions
3. In-app notifications keep users informed of workflow changes
4. Admins can manage users, offices, and system settings
5. System is deployable to Netlify/Vercel for stakeholder review
6. Core functionality is stable and usable for prototype demonstration

---

## 8. Future Enhancements

Future phases may include:
- Multi-office routing
- Workflow automation
- Advanced analytics
- Mobile applications
- External communication channels (email/SMS)
- Digital signature integration

These will be prioritized based on user feedback and organizational needs after MVP release.

