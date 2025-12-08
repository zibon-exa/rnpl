# AI Changelog

This file tracks all AI-assisted changes made to the project.

## Format
- Date-Time: YYYY-MM-dd HH:mm:ss
- Description: Brief description of changes
- Files Modified: List of files changed

---

## 2025-01-XX XX:XX:XX

### Initial Project Setup
- **Description**: Created initial Next.js project structure with TypeScript, configured for shadcn/ui and Magic UI components
- **Files Created**:
  - `package.json` - Project dependencies and scripts
  - `tsconfig.json` - TypeScript configuration
  - `next.config.js` - Next.js configuration
  - `.gitignore` - Git ignore rules
  - `tailwind.config.ts` - Tailwind CSS configuration
  - `components.json` - shadcn/ui configuration
  - `postcss.config.js` - PostCSS configuration
  - `app/globals.css` - Global styles with Tailwind and CSS variables
  - `app/layout.tsx` - Root layout component
  - `app/page.tsx` - Home page component
  - `docs/README.md` - Documentation folder README
  - `ai-changelog.md` - This file
- **Files Modified**:
  - `README.md` - Updated with MVP scope, included/excluded features, tech stack, and project structure
- **Folders Created**:
  - `app/(auth)/` - Authentication routes
  - `app/(dashboard)/` - User dashboard routes
  - `app/(admin)/` - Admin panel routes
  - `components/ui/` - UI components directory
  - `components/` - Shared components directory
  - `lib/` - Utility functions and helpers
  - `types/` - TypeScript type definitions
  - `hooks/` - Custom React hooks
  - `public/` - Static assets
  - `docs/` - Documentation folder

## 2025-01-XX XX:XX:XX

### Brand Colors and PRD Creation
- **Description**: Added RNPL brand colors to globals.css and created Product Requirements Document
- **Files Created**:
  - `docs/PRD.md` - Product Requirements Document with MVP scope and requirements
- **Files Modified**:
  - `app/globals.css` - Added 24 brand colors (including turquoise brand colors) in Tailwind-compatible HSL format
- **Files Deleted**:
  - `docs/README.md` - Replaced with PRD.md

## 2025-01-XX XX:XX:XX

### Security Update - Next.js and Dependencies
- **Description**: Updated to Next.js 16.0.7 to address CVE-2025-66478 (critical security vulnerability in React Server Components). Updated all dependencies to latest versions and enabled Turbopack for faster development builds.
- **Files Modified**:
  - `package.json` - Updated Next.js to 16.0.7 (security patch), React 19.0.0, TypeScript 5.7.0, and all other dependencies to latest versions. Enabled Turbopack in dev script.

## 2025-12-07 15:10:00

### Backup File Management and Linting Configuration
- **Description**: Added backup/reference file from another AI, excluded it from TypeScript and ESLint checking to prevent 1K+ errors in Problems tab
- **Files Created**:
  - `docs/experiment-backup.tsx` - Backup/reference file with header comment indicating it's for reference only (contains Bangladeshi name note)
  - `.eslintignore` - ESLint ignore configuration to exclude backup files and build directories
- **Files Modified**:
  - `tsconfig.json` - Excluded `docs/experiment-backup.tsx` and `docs/experiment.ts` from TypeScript compilation

## 2025-12-07 16:21:02

### Modular Component Architecture - Complete Feature Implementation
- **Description**: Replicated all features from reference file in a modular, Apple-inspired design. Built complete file management system with dashboard, file creation, approval workflow, and file inspection.
- **Files Created**:
  - `types/file.ts` - TypeScript types for File, FileStatus, HistoryEntry, and Notification
  - `components/ui/status-badge.tsx` - Status badge component with Apple-style dot indicators
  - `components/ui/slide-over.tsx` - Slide-over drawer component for file inspection
  - `components/ui/modal.tsx` - Modal component for actions (approve/return/forward)
  - `components/ui/stat-card.tsx` - Stat card component for dashboard metrics
  - `components/file-list-item.tsx` - File list item component for file lists
  - `components/document-history.tsx` - Timeline visualization for file history
  - `components/file-inspector.tsx` - Complete file inspector with Note Sheet and Document tabs, approval actions
  - `components/create-file-form.tsx` - File creation form component
  - `components/file-list-table.tsx` - File list table with search and filter functionality
  - `lib/files-context.tsx` - Files context provider for state management
  - `lib/mock-data.ts` - Mock file data with Bangladeshi names
  - `app/(dashboard)/dashboard/files/page.tsx` - My Files page
  - `app/(dashboard)/dashboard/pending/page.tsx` - Pending Approvals page
  - `app/(dashboard)/dashboard/create/page.tsx` - Create File page
- **Files Modified**:
  - `app/layout.tsx` - Added FilesProvider and Google Fonts (Inter, Playfair Display, Dancing Script)
  - `app/globals.css` - Added custom scrollbar styles, document paper texture, and font classes
  - `app/(dashboard)/dashboard/page.tsx` - Complete rewrite with stat cards, recent activity, and file inspector integration
- **Features Implemented**:
  - Dashboard with workspace greeting, stat cards, and recent file activity
  - File creation with draft and submit options
  - File list views with search and status filtering
  - File inspector with dual-view (Note Sheet / Attached Document)
  - Approval workflow (Approve, Return, Forward) with comments
  - File history timeline visualization
  - Document preview with official letterhead styling
  - Apple-inspired design: clean, minimal, smooth transitions, glassmorphism effects
  - Consistent styling throughout with rounded corners, subtle shadows, hover effects

## 2025-12-07 17:14:41

### UI/UX Refinements and Bug Fixes
- **Description**: Fixed React hooks order issue, implemented noise texture for document background, added Tiro Bangla font for all Bangla text, enhanced document styling, and improved tab structure
- **Files Modified**:
  - `app/globals.css` - Added noise texture CSS, Tiro Bangla font class, increased noise visibility
  - `app/layout.tsx` - Added Tiro Bangla Google Font import
  - `components/file-inspector.tsx` - Fixed hook order, separated Details and Document tabs with independent containers, added noise texture to document tab only, improved document header styling with official letterhead, made document scrollable
  - `components/file-list-item.tsx` - Added font-bangla class to file titles
  - `components/file-list-table.tsx` - Added font-bangla class to file titles and categories
  - `lib/mock-data.ts` - Enhanced dummy documents with more realistic Bangla and English content, added 2 new documents
  - `app/(dashboard)/dashboard/page.tsx` - Fixed duplicate useFiles() hook call causing React hooks order error
  - `app/(dashboard)/dashboard/create/page.tsx` - Fixed duplicate useFiles() hook call
- **Features**:
  - Noise texture background only visible in Document tab
  - All Bangla text now uses Tiro Bangla font consistently
  - Document view with official RNPL letterhead styling
  - Improved document scrollability
  - Enhanced mock data with realistic corporate documents

## 2025-12-07 19:13:12

### File Inspector UI Improvements and Table Refactoring
- **Description**: Redesigned file inspector Details tab with cleaner layout, replaced custom grid table with shadcn table component, added copy functionality for Ref value, and improved overall UI consistency
- **Files Created**:
  - `components/ui/table.tsx` - shadcn table component
  - `components/ui/tooltip.tsx` - shadcn tooltip component (updated with Portal for clipping fix)
  - `components/ui/button-group.tsx` - shadcn button group component
  - `components/document-paper.tsx` - Centralized document paper component
  - `components/document-header.tsx` - Centralized document header component
  - `components/document-content.tsx` - Centralized document content component
  - `components/document-preview.tsx` - Document preview component for create page
  - `components/ui/brand-button.tsx` - Brand-specific button wrapper
  - `hooks/use-require-auth.ts` - Centralized authentication hook
  - `lib/fonts.ts` - Centralized font imports using next/font
  - `components/README-DOCUMENT-DESIGN.md` - Documentation for centralized document design
- **Files Modified**:
  - `components/file-inspector.tsx` - Complete redesign: moved Subject above table, removed Next Expected Action, reorganized into 3x2 shadcn table (Ref|Category|Status, Sender|Created|Last Updated), added copy icon for Ref, improved spacing and typography, renamed Document tab to Preview, renamed Executive Summary to Details with document body, added 2-column layout for Details text
  - `components/ui/slide-over.tsx` - Added tabs, actions, and centerActions props for header customization, increased max width, fixed tooltip clipping with overflow-visible
  - `components/header.tsx` - Updated notifications to use actual file data, added Bangla font support, removed Admin Panel from nav
  - `app/(dashboard)/dashboard/page.tsx` - Updated greeting to Bangla format, added Create New File button, converted action cards to stat cards, updated to use centralized utilities
  - `app/(dashboard)/dashboard/create/page.tsx` - Redesigned to split layout with form on left and live preview on right
  - `app/globals.css` - Added custom font-face rules with unicode-range for automatic font selection, added brand hover color, removed duplicate font classes
  - `app/layout.tsx` - Updated to use next/font for Inter and Tiro Bangla
  - `lib/utils.ts` - Added centralized Bangla utility functions (toBanglaNumerals, formatFileIdToBangla, formatDateToBangla, getCurrentDateBangla)
  - `lib/auth-context.tsx` - Added migration for name update (Abdul Karim → Toufique Joarder), added loading state
  - `lib/mock-data.ts` - Updated all content to Bangla, replaced names
  - `package.json` - Added shadcn table, tooltip, and button-group components
- **Features**:
  - Cleaner, less boxy Details tab design
  - shadcn table component with proper borders and spacing
  - Copy to clipboard functionality for Ref value with visual feedback
  - Improved typography and spacing throughout
  - Centralized document design system
  - System-wide font solution using unicode-range
  - DRY refactoring: removed duplicate code and consolidated utilities

## 2025-12-08 10:54:35

### Dashboard Two-Column Layout
- **Description**: Redesigned dashboard to display files in a 2-column layout with single container cards. Files are now listed without individual cards, using a cleaner inline list design.
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Converted single-column "Recent Activity" section to 2-column grid layout with Card containers. Column 1: "Files Requiring Attention" (pending files), Column 2: "Recent Files" (sorted by lastUpdated). Files are displayed as inline list items within each card container (no individual file cards). Removed FileListItem component usage, replaced with inline list item design with hover effects.
- **Features**:
  - Two-column responsive grid layout (stacks on mobile)
  - Single Card container for each column
  - Files listed as inline items with dividers (no individual cards)
  - Hover effects and smooth transitions
  - "View All" buttons for navigation
  - Empty state handling for both columns

## 2025-12-08 10:59:57

### File Attachments Feature
- **Description**: Added attachment support to files with visual indicators showing attachment icon and count for documents that have attached files (images, PDFs, Excel files, etc.)
- **Files Modified**:
  - `types/file.ts` - Added Attachment interface and optional attachments array to File type. Attachment includes id, name, type (image/pdf/excel/word/other), size, and optional url.
  - `lib/mock-data.ts` - Added attachments to 4 files: RNPL-1001 (3 attachments: Excel, PDF, image), RNPL-1003 (2 attachments: PDF, image), RNPL-1005 (1 attachment: Excel), RNPL-1006 (3 attachments: PDF, Excel, image)
  - `app/(dashboard)/dashboard/page.tsx` - Added Paperclip icon import and attachment indicator display in both "Files Requiring Attention" and "Recent Files" columns. Shows paperclip icon with count when file has attachments.
  - `components/file-list-item.tsx` - Added Paperclip icon import and attachment indicator display. Shows paperclip icon with count when file has attachments.
  - `components/file-list-table.tsx` - Added Paperclip icon import and attachment indicator display in the Status column. Shows paperclip icon with count when file has attachments.
- **Features**:
  - Attachment icon (Paperclip) with count displayed next to status badge
  - Only shows when file has attachments (conditional rendering)
  - Hover effect on attachment indicator (changes color on hover)
  - Consistent styling across dashboard and file list components

## 2025-12-08 11:02:08

### File Inspector Attachment Note
- **Description**: Added attachment indicator note in FileInspector component, displayed just below the info table when a document has attachments
- **Files Modified**:
  - `components/file-inspector.tsx` - Added Paperclip icon import and attachment note section below the info table. Shows "This document has {count} attachment(s)" with paperclip icon when file has attachments.
- **Features**:
  - Attachment note appears only when file has attachments (conditional rendering)
  - Shows attachment count with proper pluralization
  - Positioned directly below the info table in the Details tab
  - Consistent styling with slate colors and icon

## 2025-12-08 11:04:15

### File Inspector Details Section Readability Improvements
- **Description**: Changed Details section from 2-column layout to single column with improved readability settings for long text
- **Files Modified**:
  - `components/file-inspector.tsx` - Removed 2-column layout (`columns-1 md:columns-2`), added max-width constraint (max-w-3xl) to prevent overly long lines, improved line-height (leading-7), increased font size slightly (text-[15px]), and preserved whitespace formatting with whitespace-pre-wrap
- **Features**:
  - Single column layout for better focus and readability
  - Max-width constraint (approximately 48rem/768px) prevents lines from stretching too wide
  - Improved line-height (1.75rem) for comfortable reading
  - Slightly larger font size (15px) for better legibility
  - Preserves original formatting and line breaks from document body
  - Clean, minimal design that maintains visual hierarchy
  - Added styled container with background (bg-slate-50), border (border-slate-100), rounded corners (rounded-xl), and generous padding (p-6) to make details text stand out from the rest of the interface

## 2025-12-08 11:10:18

### Dashboard File Search Box
- **Description**: Added a file search input box to the left of the "Create New File" button on the dashboard page
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Added Search icon import, search state (searchTerm), and search input field positioned to the left of the Create New File button with 32px gap (gap-8). Search box includes search icon, placeholder text, and focus styling.
- **Features**:
  - Search input with search icon on the left
  - Positioned with 32px gap (gap-8) from Create New File button
  - Styled with white background, border, rounded corners, and focus states
  - Width of 256px (w-64) for comfortable input
  - Placeholder text: "Search files..."

## 2025-12-08 11:12:24

### UX Copy Consistency Audit - Standardized on "File" Terminology
- **Description**: Audited codebase for inconsistent naming between "File" and "Document" and standardized all user-facing text to use "File" terminology for consistency
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Changed search placeholder from "Search documents..." to "Search files..."
  - `components/file-inspector.tsx` - Changed attachment note from "This document has..." to "This file has...", updated code comments from "document tab" to "file preview tab", changed comment from "DOCUMENT PREVIEW" to "FILE PREVIEW"
  - `components/create-file-form.tsx` - Changed label from "Document Body" to "File Body", changed helper text from "document preview" to "file preview", changed preview header from "Document Preview" to "File Preview", changed description from "Live preview of your document" to "Live preview of your file"
  - `ai-changelog.md` - Updated changelog entry title from "Dashboard Document Search Box" to "Dashboard File Search Box"
- **Rationale**:
  - Type system uses "File" (File interface, FileStatus, etc.)
  - Consistent terminology improves UX clarity
  - All user-facing text now uses "File" while component names like "DocumentPaper", "DocumentHeader" remain as they refer to the visual document representation
- **Standardization**:
  - User-facing labels, placeholders, and messages: "File"
  - Component names for document rendering: "Document" (e.g., DocumentPaper, DocumentPreview) - these are internal and refer to the visual representation

