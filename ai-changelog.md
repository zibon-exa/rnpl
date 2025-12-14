# AI Changelog

This file tracks all AI-assisted changes made to the project.

## Format
- Date-Time: YYYY-MM-dd HH:mm:ss
- Description: Brief description of changes
- Files Modified: List of files changed

---

## 2025-12-14 17:57:47

### Created RNPL-Scope Documentation
- **Description**: Created new scope documentation file with initial requirements for signup/login, admin review, and dashboard structure
- **Files Created**:
  - `docs/RNPL-Scope.md` - Scope document covering signup & login, password recovery, admin role assignment, and main dashboard navigation structure

---

## 2025-12-14 XX:XX:XX

### Fixed Netlify Plugin Version
- **Description**: Corrected @netlify/plugin-nextjs version from non-existent 4.45.0 to latest version 5.15.1 to fix npm install error during Netlify deployment
- **Files Modified**:
  - `package.json` - Updated @netlify/plugin-nextjs version to ^5.15.1

---

## 2025-01-XX XX:XX:XX

### Netlify Deployment Configuration
- **Description**: Added Netlify configuration file and Next.js plugin to fix "Page not found" error after switching to new Netlify account. Configured proper build settings for Next.js 16 App Router deployment.
- **Files Created**:
  - `netlify.toml` - Netlify build configuration with Next.js plugin, build command, publish directory, and Node.js version
- **Files Modified**:
  - `package.json` - Added `@netlify/plugin-nextjs` as dev dependency for proper Next.js runtime support on Netlify
- **Configuration Details**:
  - Build command: `npm run build`
  - Publish directory: `.next`
  - Node.js version: 20
  - Uses `@netlify/plugin-nextjs` plugin for automatic Next.js App Router support
- **Next Steps for User**:
  1. Run `npm install` to install the new plugin dependency
  2. Commit and push the changes to trigger a new Netlify deployment
  3. Verify build settings in Netlify dashboard match the configuration:
     - Build command: `npm run build`
     - Publish directory: `.next`
     - Node version: 20
  4. The plugin will automatically handle Next.js routing and rewrites

---

## 2025-12-08 13:50:51

### Redesigned File Journey (History) Component
- **Description**: Redesigned the DocumentHistory component to match the clean, simple style of the sidebar info cells. Removed card styling, timeline elements, and icons. Now uses the same label/value pattern as other sidebar sections.
- **Files Modified**:
  - `components/document-history.tsx` - Simplified design to match sidebar info cells style, removed timeline UI elements

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

## 2025-12-08 11:26:21

### File View Redesign - Dedicated Page with Blog Post Layout
- **Description**: Moved FileInspector from SlideOver to a dedicated page route and redesigned Details tab as a clean, modern blog post layout
- **Files Created**:
  - `app/(dashboard)/dashboard/files/[id]/page.tsx` - New dedicated file view page with blog post-style Details tab and Preview tab with A4 document preview
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Removed SlideOver and FileInspector, updated file click handlers to navigate to new page route
  - `app/(dashboard)/dashboard/files/page.tsx` - Removed SlideOver and FileInspector, updated to navigate to new page route
  - `app/(dashboard)/dashboard/pending/page.tsx` - Removed SlideOver and FileInspector, updated to navigate to new page route
  - `app/(dashboard)/dashboard/create/page.tsx` - Removed SlideOver and FileInspector, updated to navigate to new page route after file creation
- **Features**:
  - **Dedicated Page Route**: Files now open at `/dashboard/files/[id]` instead of SlideOver
  - **Blog Post Layout**: Details tab redesigned with:
    - Large, prominent title (text-4xl)
    - Clean meta information bar with Ref, Category, Status, Attachments
    - Author and date information (Created/Updated)
    - Main content area with improved typography (text-lg, leading-8)
    - History section at the bottom
    - Full-width layout with max-width constraint for readability
  - **Header Controls**: All controls moved to page header:
    - Tabs (Details/Preview) in header
    - Download and Print buttons always visible
    - Action buttons (Approve, Return, Forward) shown when applicable
  - **Preview Tab**: Maintains A4 document preview with official letterhead styling
  - **Back Navigation**: Added back button to return to previous page
  - **Responsive Design**: Clean, modern layout optimized for reading
- **UX Improvements**:
  - More space for content (full page vs slide-over)
  - Better readability with blog post typography
  - Clearer visual hierarchy
  - All controls accessible in header
  - Better navigation flow

---

2025-12-08 12:00:00 - Updated all CTAs to use consistent brand color instead of indigo colors
- Changed notification button, file action buttons, stat cards, and hover states from indigo to brand turquoise color
- Updated header notification button, file detail page CTAs, file inspector buttons, dashboard stat cards, and all hover states
- Maintained design consistency where users learn that brand color indicates clickable/interactive elements
Files Modified:
- components/header.tsx
- app/(dashboard)/dashboard/files/[id]/page.tsx
- components/file-inspector.tsx
- app/(dashboard)/dashboard/page.tsx
- components/file-list-table.tsx
- components/file-list-item.tsx
- components/ui/stat-card.tsx
- Fixed StatCard icon rendering issue by updating icon prop handling and background styling

2025-12-08 12:10:00 - Adjusted FileView layout to enable scrolling without gaps
- Made root container flex column and set document area to overflow-y-auto
- Simplified paper container height to min-h-full and cleaned nested wrappers
- Ensured sidebar remains independently scrollable while main content now scrolls
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 12:15:00 - Applied custom scrollbar styling to FileView document scroll area
- Re-applied custom scrollbar class to the document scroll container for consistent styling
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 12:20:00 - Updated FileView back button to icon-only shadcn button
- Replaced text back button with ghost/icon Button component for cleaner UI
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 12:25:00 - Matched FileView back button styling to grouped buttons
- Switched back button to outline icon style with 9x9 sizing to align with grouped controls
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 12:35:00 - Added Noto Serif Bengali and updated Bangla titles
- Added Noto Serif Bengali (semibold) to font stack and globals utility class
- Applied new font to Bangla document titles and reduced main title size to 3xl
- Updated document content labels to use serif Bangla styling
Files Modified:
- lib/fonts.ts
- app/layout.tsx
- app/globals.css
- app/(dashboard)/dashboard/files/[id]/page.tsx
- components/document-content.tsx

2025-12-08 12:40:00 - Adjusted document typography sizes
- Reduced FileView document title to 2xl and set body text to 15px/leading-7
- Updated preview document body to 15px for consistency
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx
- components/document-content.tsx

2025-12-08 12:50:00 - Added signature and distribution sections to FileView
- Added signature block with designation and company name
- Added distribution list matching official document footer style
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 12:55:00 - Added placeholder signature in FileView
- Inserted cursive placeholder text inside signature line for legibility
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 13:00:00 - Center-aligned FileView signature block
- Centered all signature block elements for consistent alignment
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 13:05:00 - Increased page margins in FileView
- Expanded document area padding and inner article padding for generous margins
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 13:10:00 - Added download format dropdown with colorful icons
- Replaced toolbar download button with dropdown for PNG/JPG/PDF/DOCX options
- Added download handler placeholder for future wiring
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 13:15:00 - Added pointer cues to download dropdown items
- Ensured dropdown trigger and items show pointer cursor (non-functional state)
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

2025-12-08 13:20:00 - Added spacing between download/print and action groups
- Increased gap between toolbar groups and slightly widened action group spacing
Files Modified:
- app/(dashboard)/dashboard/files/[id]/page.tsx

---

2025-12-08 13:25:00 - Replaced document viewer in Create File page with new design
- Replaced old DocumentPreview component with new paper-on-desk design
- Added DocumentHeader, signature block, and distribution list to preview
- Updated layout to match FileViewPage structure with proper scrolling
- Maintains real-time preview as user types
Files Modified:
- app/(dashboard)/dashboard/create/page.tsx
- components/create-file-form.tsx

---

2025-12-08 14:00:00 - Updated signature area in Create File to show current user
- Signature placeholder and name now display the user creating the file
- Kept role (কোম্পানি সচিব) and company name (আরএনপিএল) unchanged
- Signature dynamically updates based on logged-in user
Files Modified:
- components/create-file-form.tsx

---

2025-12-08 14:05:00 - Made signature area language-aware in Create File
- Signature name and initials now change based on selected language (Bangla/English)
- Role text also changes based on language selection
- Removed duplicate name display (shows only one name based on language)
Files Modified:
- components/create-file-form.tsx

---

2025-12-08 14:10:00 - Fixed signature name display to show only one language
- Enhanced getUserName function to handle name extraction from parentheses format
- Added fallback logic to extract Bangla/English names when both are present
- Ensures only the selected language name is displayed in signature
Files Modified:
- components/create-file-form.tsx

---

2025-12-08 14:15:00 - Made company name language-aware in signature area
- Company name now displays "আরএনপিএল" for Bangla and "RNPL" for English
- Signature area fully adapts to selected language
Files Modified:
- components/create-file-form.tsx

---

2025-12-08 14:20:00 - Updated signature to show full name with Mina font for Bangla
- Added Mina font from Google Fonts for Bengali signatures
- Signature now displays full name instead of initials
- Bangla signatures use Mina font, English signatures use cursive font
- Increased signature container width to accommodate full names
Files Modified:
- lib/fonts.ts
- app/layout.tsx
- app/globals.css
- components/create-file-form.tsx

---

2025-12-08 14:25:00 - Improved user dropdown menu in Navbar
- Added avatar before user name in dropdown
- Name now displays only in English (extracted from Bangla name)
- Added "Admin Panel" option for Admin users
- Improved dropdown layout with better spacing and visual hierarchy
Files Modified:
- components/header.tsx

2025-12-08 13:35:00 - Enhanced Create File form sidebar and preview
- Added back button, language toggle (default Bangla), reference display, date input
- Localized categories, updated details field, and added send-to and send-copies management
- Applied custom scrollbar and aligned preview top; DocumentHeader now supports language toggle
Files Modified:
- components/create-file-form.tsx
- components/document-header.tsx

2025-12-08 13:45:00 - Adjusted dashboard greeting to Bangla-only name
- Greeting now strips any English parenthetical and uses Bangla name only
Files Modified:
- app/(dashboard)/dashboard/page.tsx

2025-12-08 13:50:00 - Added under-construction placeholder for Profile
- Added /dashboard/profile with Under Construction placeholder and navigation buttons
Files Modified:
- app/(dashboard)/dashboard/profile/page.tsx

---

2025-12-08 14:30:00 - Added login validation and removed prototype references
- Implemented username/password validation (username: rnpl-demo, password: 123123)
- Removed all "prototype" mentions from codebase, documentation, and UI
- Added error handling and display for invalid login attempts
- Updated login function to return boolean for success/failure
- Removed prototype placeholders and help text from login form
Files Modified:
- lib/auth-context.tsx
- app/(auth)/login/page.tsx
- types/user.ts
- README.md
- docs/PRD.md
- docs/experiment-backup.tsx

---

2025-12-08 14:35:00 - Made stat card hover effects conditional on clickability
- Only stat cards with onClick handlers now show hover elevation effects
- Non-clickable cards (Total, Approved, Returned, This Month) no longer have hover effects
- Clickable cards (Pending, My Files) retain hover shadow and border effects
Files Modified:
- components/ui/stat-card.tsx

---

2025-12-08 14:40:00 - Created Admin Panel page with under construction placeholder
- Added /dashboard/admin page linked from Avatar dropdown > Admin Panel
- Page displays under construction message with navigation buttons
- Only visible to Admin users in the dropdown menu
Files Modified:
- app/(dashboard)/dashboard/admin/page.tsx

---

2025-12-08 14:45:00 - Added global 404 handler and reusable UnderConstruction component
- Created reusable UnderConstruction component for consistent under construction pages
- Added app/not-found.tsx to handle all 404 errors and show Under Construction page
- Refactored Profile and Admin pages to use the reusable component
- All dead ends and broken links now show Under Construction page instead of 404
Files Modified:
- components/under-construction.tsx (new)
- app/not-found.tsx (new)
- app/(dashboard)/dashboard/profile/page.tsx
- app/(dashboard)/dashboard/admin/page.tsx








