# AI Changelog

This file tracks all AI-assisted changes made to the project.

## Format
- Date-Time: YYYY-MM-dd HH:mm:ss
- Description: Brief description of changes

## 2025-12-21 18:56:02
- **Description**: Removed tooltip from the rainbow "New File" button and made the label text slightly smaller for a cleaner appearance.
- **Files Modified**:
  - `components/header.tsx` - Removed Tooltip wrapper from rainbow button, reduced label text size from `text-sm md:text-base` to `text-xs md:text-sm`, removed unused Tooltip imports

## 2025-12-21 18:52:36
- **Description**: Added visible "New File" label text to the rainbow button in the navbar. Changed button from icon-only to icon + text layout.
- **Files Modified**:
  - `components/header.tsx` - Updated RainbowButton to include "New File" text label alongside the Plus icon, changed size from "icon" to "default" to accommodate text

## 2025-12-21 18:51:54
- **Description**: Added Magic UI rainbow button effect to the "Create New File" button in the navbar. Implemented rainbow button component with animated rainbow gradient border effect.
- **Files Created**:
  - `components/ui/rainbow-button.tsx` - Rainbow button component from Magic UI with animated rainbow gradient effect
- **Files Modified**:
  - `components/header.tsx` - Replaced standard Button with RainbowButton for the Create New File button
  - `app/globals.css` - Added rainbow color CSS variables (--color-1 through --color-5) for the rainbow gradient effect
  - `tailwind.config.ts` - Added `rainbow` keyframe animation and `animate-rainbow` utility class for the animated gradient effect
- **Features**:
  - Animated rainbow gradient border effect on the Create New File button
  - Smooth rainbow animation that cycles through colors continuously
  - Maintains existing button functionality (tooltip, link, icon)

## 2025-12-21 19:30:00
- **Description**: Replaced the previous embedded animated SVG in `UnderConstruction` component with a new standardized empty state vector from `public/vectors/empty_state.svg`. Switched implementation to use Next.js `Image` component for better performance.
- **Files Modified**: 
  - `components/under-construction.tsx`

## 2025-12-21 19:20:00
- **Description**: Redesigned document signature area to follow a cleaner format (Divider, Name, Designation, RNPL) and ensured full language awareness (Bangla/English) across document creation and viewing.
- **Files Modified**: 
  - `components/document-content.tsx`
  - `components/document-preview.tsx`
  - `components/create-file-form.tsx`
  - `app/(dashboard)/dashboard/files/[id]/page.tsx`

## 2025-12-21 19:10:00
- **Description**: Updated New File form to use real user database for recipients and show their actual designations (BN/EN) instead of just roles.
- **Files Modified**: 
  - `components/create-file-form.tsx`

## 2025-12-21 19:00:00
- **Description**: Increased top padding to 12px in list/compact thumbnails to ensure the paper is properly cropped at the bottom and has a better visual gap.
- **Files Modified**: 
  - `components/file-list-table.tsx`
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 18:50:00
- **Description**: Increased horizontal padding and reduced paper scale in list/compact thumbnails for a more spacious appearance.
- **Files Modified**: 
  - `components/file-list-table.tsx`
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 18:40:00
- **Description**: Reduced thumbnail height to 44px in list and compact views to better match the height of the name and reference container.
- **Files Modified**: 
  - `components/file-list-table.tsx`
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 18:30:00
- **Description**: Standardized thumbnail style in list and compact views to match the dashboard sidebar, including background image and consistent document preview positioning.
- **Files Modified**: 
  - `components/file-list-table.tsx`
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 18:20:00
- **Description**: Refined status display logic: removed status dots from grid view thumbnails and full-page table thumbnails; added full status badges to full-page file tables.
- **Files Modified**: 
  - `components/file-thumbnail-item.tsx`
  - `components/file-list-table.tsx`

## 2025-12-21 18:10:00
- **Description**: Standardized grid card layout by pinning author and status to the bottom, ensuring consistency across varying title lengths.
- **Files Modified**: 
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 18:00:00
- **Description**: Updated dashboard greeting to use the explicit Bangla name (`nameBn`) from the user database.
- **Files Modified**: 
  - `app/(dashboard)/dashboard/page.tsx`

## 2025-12-21 17:50:00
- **Description**: Implemented a comprehensive mock user database and updated the system to support multilingual user info.
- **Files Modified**: 
  - `types/user.ts` (Expanded User interface)
  - `lib/mock-users.ts` (New user database)
  - `lib/auth-context.tsx` (Updated login and migration logic)
  - `lib/mock-data.ts` (Updated file sender/actor names)
  - `lib/avatar-utils.ts` (Updated to support explicit avatar IDs)
  - `components/header.tsx` (Updated user profile display)
  - `components/file-thumbnail-item.tsx` (Updated avatar display)
  - `components/file-list-table.tsx` (Updated avatar display)

## 2025-12-21 17:40:00
- **Description**: Replaced the custom list view with a formal `Table` component in `FileListTable` for better data density and organization in large spaces.
- **Files Modified**: 
  - `components/file-list-table.tsx`

## 2025-12-21 17:30:00
- **Description**: Implemented a new wide `list` variant for file items and updated FileListTable to use it for full-page views.
- **Files Modified**: 
  - `components/file-thumbnail-item.tsx`
  - `components/file-list-table.tsx`

## 2025-12-21 17:20:00
- **Description**: Moved status dots to the exact bottom-right corner of file thumbnails, mimicking messenger-style online status indicators.
- **Files Modified**: 
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 17:15:00
- **Description**: Adjusted list view (icon variant) thumbnail height to dynamically match the height of the content container using flexbox stretching.
- **Files Modified**: 
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 17:10:00
- **Description**: Added a compact "dot" variant for status indicators and implemented it as an overlay on file thumbnails.
- **Files Modified**: 
  - `components/ui/status-badge.tsx`
  - `components/file-thumbnail-item.tsx`

## 2025-12-21 17:00:00
- **Description**: Restructured list view (icon variant) to stack all info items vertically, including moving the status badge into the stack.
- **Files Modified**: 
  - `components/file-thumbnail-item.tsx`

---
## 2025-12-21 16:50:00
- **Description**: Reduced thumbnail size in list view (icon variant) to 56x64px and adjusted preview scaling.
- **Files Modified**: 
  - `components/file-thumbnail-item.tsx`

---

## 2025-12-21 16:45:00
- **Description**: Changed files sidebar to list view with thumbnails and updated default view in FileListTable to list.
- **Files Modified**: 
  - `app/(dashboard)/dashboard/page.tsx`
  - `components/file-list-table.tsx`

---

## 2025-12-18 22:00:00

### Centralized Avatar Utilities and Avatar Integration
- **Description**: Created centralized avatar utility functions for consistent avatar handling across the application. Updated all components to use avatar images from `/public/avatars` folder with automatic male/female detection.
- **Files Created**:
  - `lib/avatar-utils.ts` - Centralized avatar utilities:
    - `isFemaleName()` - Detects female names based on common patterns (Fatima, Sultana, Begum, etc.)
    - `getAvatarPath()` - Maps names to avatar images using hash-based consistent mapping
    - `getInitials()` - Generates initials from names (first letter of each word, max 2)
    - Automatically selects F-suffixed avatars (3-F.png, 4-F.png, 5-F.png, 10-F.png) for female names
    - Uses regular avatars (1.png, 2.png, 6.png, 7.png, 8.png, 9.png) for male names
- **Files Modified**:
  - `components/blocker-list.tsx` - Updated to use centralized avatar utilities, removed local avatar logic
  - `components/file-thumbnail-item.tsx` - Added `AvatarImage` to both thumbnail and icon variants:
    - Thumbnail variant: Avatar with image next to sender name
    - Icon variant: Small avatar (h-5 w-5) next to sender name in metadata row
  - `app/(dashboard)/dashboard/files/[id]/page.tsx` - Updated author section to use avatar images
- **Features**:
  - Consistent avatar selection across all components
  - Automatic gender detection based on name patterns
  - Hash-based mapping ensures same name always gets same avatar
  - Fallback to initials if avatar image fails to load
  - All file lists (Dashboard, Pending, My Files) now show avatar images
  - File detail page shows author avatar
  - Blocker list shows employee avatars in table and modal
- **Avatar Files Used**:
  - Male: 1.png, 2.png, 6.png, 7.png, 8.png, 9.png
  - Female: 3-F.png, 4-F.png, 5-F.png, 10-F.png

---

## 2025-12-18 21:00:00

### Added Thumbnails to FileListTable Component
- **Description**: Updated FileListTable component to include document preview thumbnails in the first column, maintaining the existing table layout. Thumbnails match the dashboard sidebar design with light gray background, padding, and bottom cropping.
- **Files Modified**:
  - `components/file-list-table.tsx` - Added thumbnail column:
    - Added DocumentPreview import
    - Added new first column for thumbnails (empty header)
    - Thumbnail styling matches dashboard: 60px × 80px, padding top/left/right, cropped bottom
    - Updated colspan from 5 to 6 for empty state row
    - All existing table functionality preserved (search, filter, hover effects)
- **Impact**:
  - Pending Files page now shows thumbnails
  - My Files page now shows thumbnails
  - Table layout and functionality unchanged
  - Consistent thumbnail design across all file lists

---

## 2025-12-18 20:45:00

### Created Reusable FileThumbnailItem Component with Variants
- **Description**: Created a new reusable file component with multiple variants for displaying files in different contexts. Replaced inline file list implementation in dashboard with the new component.
- **Files Created**:
  - `components/file-thumbnail-item.tsx` - Reusable file component with three variants:
    - `thumbnail` - Document preview thumbnail on left, file info on right (for dashboard sidebar)
    - `icon` - File icon on left, file info on right (for list views)
    - `compact` - Smaller thumbnail with minimal info (for compact lists)
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Replaced inline file list implementation with FileThumbnailItem component using `thumbnail` variant
- **Component Features**:
  - Three variants: thumbnail, icon, compact
  - Configurable props: showAttachments, showStatus, className
  - Consistent styling and hover effects across variants
  - Document preview thumbnails with proper padding and cropping
  - Click handler support
- **Usage**:
  ```tsx
  <FileThumbnailItem 
    file={file} 
    onClick={handleOpenFile} 
    variant="thumbnail" 
  />
  ```

---

## 2025-12-18 20:30:00

### File Thumbnails with Document Previews - Wireframe Layout
- **Description**: Updated file list items to match wireframe exactly: horizontal layout with document preview thumbnail on left (with padding top/left/right, cropped at bottom) and file info on right. Thumbnail shows actual document preview on light gray background.
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Restructured file items to horizontal layout:
    - Thumbnail on left: 60px × 80px container with light gray background (bg-slate-100)
    - Added padding: 8px top, 8px left, 8px right (no bottom padding for cropping)
    - Document preview scaled to 8% (scale(0.08)) to fit in thumbnail
    - Bottom of preview is cropped (overflow-hidden)
    - File info on right: title, ref • author, attachment count • status
    - Horizontal flex layout with gap between thumbnail and text
    - Hover effect on entire row
- **Features**:
  - Document preview thumbnail on left with proper spacing
  - Light gray background with padding (top, left, right)
  - Bottom cropped to show partial document preview
  - Horizontal layout matching wireframe exactly
  - All file metadata displayed to the right of thumbnail

---

## 2025-12-18 20:00:00

### Dashboard Layout Restructure - Two-Pane Layout with Independent Scrolling
- **Description**: Restructured dashboard to match wireframe design with left pane (Dashboard content) and right pane (Files sidebar), each independently scrollable. Left pane contains dashboard title, greeting, two rows of metric buttons (4 stat cards + 4 KPI cards), and two chart widgets side-by-side. Right pane contains Files title with "+ New" button, search bar, and Pending Files list.
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Complete layout restructure:
    - Changed from single-column layout to two-pane flex layout
    - Left pane: Dashboard content (title, greeting, 8 metric buttons in 2 rows, 2 charts)
    - Right pane: Files sidebar (title, +New button, search, pending files list)
    - Both panes are independently scrollable with `overflow-y-auto`
    - Removed search and "+ New" button from header section (moved to right pane)
    - Removed "Recent Files" column (only showing "Pending Files" in right pane)
    - Removed "Office Pulse" section title (KPI cards now in second row directly)
    - Removed bottom row charts (Efficiency Scatter, Risk Escalation) - only showing Heatmap and Blockers
    - Right pane has fixed width (w-96) with border-l separator
- **Layout Structure**:
  - **Left Pane**: Flex-1, scrollable, contains all dashboard metrics and charts
  - **Right Pane**: Fixed width (384px), scrollable, contains files management UI
  - Both panes scroll independently without affecting each other
- **Features**:
  - Independent scrolling for left and right panes
  - Clean separation between dashboard metrics and file management
  - Matches wireframe design exactly
  - Maintains all existing functionality (only layout changed)

---

## 2025-12-18 17:32:26

### Changed File Stats Numbers to English
- **Description**: Updated StatCard component to display numbers in English numerals instead of Bangla numerals.
- **Files Modified**:
  - `components/ui/stat-card.tsx` - Removed `toBanglaNumerals()` function call and import, now displays numbers directly in English format.
- **Changes**:
  - Removed import of `toBanglaNumerals` from `@/lib/utils`
  - Changed value display from `{toBanglaNumerals(value)}` to `{value}` to show English numbers

---

## 2025-12-18 17:29:33

### Simplified Dashboard Stats
- **Description**: Removed existing file stats above Office Pulse and replaced with only essential stats in specified order.
- **Files Modified**:
  - `app/(dashboard)/dashboard/page.tsx` - Removed 6-card stat grid (Total, Pending, Approved, My Files, Returned, This Month) and replaced with 4-card grid showing only: My Files, Pending Files (Linked), Approved, Returned. Removed unused calculations (totalFiles, filesThisMonth). Updated grid layout from 6 columns to 4 columns.
- **Changes**:
  - Removed "Total" and "This Month" stat cards
  - Kept only essential stats: My Files, Pending Files (Linked), Approved, Returned
  - Maintained click handlers for My Files and Pending Files
  - Cleaned up unused variable calculations

---

## 2025-12-18 19:00:00

### Chart Accessibility and UX Improvements
- **Description**: Fixed multiple chart issues including tooltip z-index, always-visible legends, accessibility, and layout problems.
- **Files Modified**:
  - `components/department-heatmap.tsx` - Fixed tooltip z-index, added always-visible legend below chart, improved accessibility without disabling hover
  - `components/efficiency-scatter-chart.tsx` - Fixed chart being cut off by adjusting margins and font sizes, fixed tooltip z-index, improved accessibility
  - `components/risk-escalation-trend.tsx` - Fixed tooltip z-index, improved accessibility
- **Fixes**:
  1. **Tooltip Z-Index**: Added `zIndex: 9999` and `pointerEvents: 'auto'` to all tooltip wrappers to ensure tooltips appear above chart elements
  2. **Always-Visible Legends**: Replaced Recharts Legend component with custom always-visible legend below radial chart showing department names, percentages, and alert icons
  3. **Accessibility**: Added `tabIndex={-1}`, `outline: 'none'`, `role="img"`, and `aria-label` to chart containers to prevent keyboard focus while maintaining hover functionality
  4. **Efficiency Chart Layout**: Reduced margins (top: 10, right: 10, bottom: 40, left: 40), reduced font sizes (11px for labels), shortened Y-axis label text to prevent cutoff
- **Features**:
  - Tooltips now always appear on top of chart elements
  - Hover functionality works correctly (tooltips display on hover)
  - Charts are not keyboard focusable but remain interactive for mouse hover
  - Radial chart legend is always visible below the chart (not just on hover)
  - Efficiency scatter chart fits properly within card boundaries
  - Proper ARIA labels for screen readers

---

## 2025-12-18 18:30:00

### Chart Typography Consistency
- **Description**: Updated all chart components to respect the application's typography system. All SVG text elements in charts now use the Inter font family to match the rest of the application.
- **Files Modified**:
  - `components/department-heatmap.tsx` - Added fontFamily to radial bar labels
  - `components/risk-escalation-trend.tsx` - Added fontFamily to XAxis, YAxis ticks, and Legend
  - `components/efficiency-scatter-chart.tsx` - Added fontFamily to XAxis, YAxis ticks, axis labels, and ReferenceLine labels
- **Typography Applied**:
  - Font family: `Inter, 'July Font', sans-serif` (matching body typography)
  - Font sizes: 12px for axis ticks, 11px for reference line labels
  - Font weights: 500 for axis labels, 600 for data labels
  - Consistent color: #64748b (slate-500) for all chart text
- **Features**:
  - All chart text elements now use consistent typography
  - SVG text elements properly inherit font family
  - Maintains visual consistency across the dashboard

---

## 2025-12-18 18:00:00

### Departmental Hotspot Heatmap - Radial Bar Chart Redesign
- **Description**: Replaced grid-based heatmap with beautiful Simple Radial Bar Chart from Recharts. The new visualization shows overdue percentage for each department as radial bars with status-based colors (rose-500 for high, amber-500 for medium, emerald-500 for low). Includes custom tooltips, center summary, and interactive legend.
- **Files Modified**:
  - `components/department-heatmap.tsx` - Complete redesign from 3x2 grid to RadialBarChart with:
    - Radial bars showing overdue percentage (overdueItems/totalItems * 100)
    - Status-based color coding matching existing RAG system
    - Custom tooltip showing department name, overdue items, total items, and percentage
    - Center summary displaying total departments and high-risk count
    - Interactive legend with department names, percentages, and alert icons for high-risk departments
    - Smooth animations (1000ms duration with ease-out easing)
    - Rounded corners (6px) and proper spacing for visual appeal
    - **Visible percentage labels** on each radial bar (positioned outside bars) - no hover needed to see values
- **Features**:
  - **Visual Comparison**: Easy to compare overdue percentages across departments at a glance
  - **Status Colors**: Maintains existing color scheme (rose/amber/emerald) for consistency
  - **Interactive Tooltips**: Hover over any bar to see detailed information
  - **Visible Labels**: Percentage values displayed directly on each bar for immediate readability
  - **Center Summary**: Shows total departments and high-risk count in the center
  - **Legend**: Clean legend below chart with department names, percentages, and alert indicators
  - **Responsive**: Adapts to container size with ResponsiveContainer
  - **Beautiful Design**: Matches existing UI styling with proper spacing, typography, and colors

---

## 2025-12-18 16:21:56

### Executive Command Center Dashboard
- **Description**: Built comprehensive "Executive Command Center" dashboard section above file boxes with 5 high-density data visualization components using Recharts, Shadcn UI, and Tailwind CSS. All components follow existing design system with RAG color logic (emerald-500/amber-500/rose-500) and CSS variable tokens.
- **Files Created**:
  - `lib/dashboard-data.ts` - Mock data for all 5 dashboard components (KPI sparklines, department heatmap, blockers, efficiency scatter, risk trends)
  - `components/kpi-sparkline-card.tsx` - Reusable KPI card component with mini AreaChart sparkline, trend indicators, and RAG status colors
  - `components/department-heatmap.tsx` - 3x2 grid heatmap showing departmental overdue items with dynamic background colors (red/amber/green based on overdue count)
  - `components/blocker-list.tsx` - Table component with top 5 blockers, avatars, files pending count, and "Nudge" buttons that trigger toast notifications
  - `components/efficiency-scatter-chart.tsx` - ScatterChart showing efficiency vs rework with quadrant labels, reference lines, and custom tooltips
  - `components/risk-escalation-trend.tsx` - AreaChart showing risk and escalation trends over 12 months with dual series and gradients
- **Files Modified**:
  - `app/layout.tsx` - Added Toaster component for toast notifications
  - `app/(dashboard)/dashboard/page.tsx` - Integrated Executive Command Center section with all 5 components in responsive grid layout (4 KPI cards, 2-column middle row, 2-column bottom row)
  - `package.json` - Added recharts dependency (36 packages)
- **Dependencies Added**:
  - `recharts` - Charting library for React
  - `@radix-ui/react-toast` - Toast component (via shadcn)
- **Features**:
  - **Office Pulse KPI Cards**: 4 cards showing Avg Approval Cycle (3.2 days, green down), Approval Ratio (94%, green up), SLA Compliance (88%, amber warning), Return Rate (12%, red critical) - each with mini sparkline AreaChart
  - **Departmental Hotspot Heatmap**: 3x2 grid showing 6 departments (Finance, HR, Operations, IT, Legal, Admin) with dynamic background colors based on overdue items count (high >20: red, medium 10-20: amber, low <10: green)
  - **Top 5 Blockers List**: Table with rank, employee (avatar + name + role), files pending (>72hrs), and "Nudge" action button that shows toast notification
  - **Efficiency vs. Rework Quadrant**: ScatterChart with X-axis (Return Rate/Quality), Y-axis (Average Speed/Velocity), dotted reference lines dividing quadrants, custom tooltips, and quadrant labels (Problem Area, Benchmark)
  - **Risk & Escalation Trend**: Dual-series AreaChart showing escalations and risks over 12 months with gradient fills and custom tooltips
- **Design Consistency**:
  - All components use existing CSS variables (--background, --card, --color-brand, etc.)
  - Strict RAG color adherence: emerald-500 (success), amber-500 (warning), rose-500 (critical)
  - Matches existing card styling: white background, slate-100 border, shadow-sm, rounded-lg
  - Typography uses standard Shadcn styles with uppercase/muted widget titles
  - Responsive grid layouts (1 column mobile, 2-4 columns desktop)

---

## 2025-12-15 13:05:30

### Expanded RNPL-Scope Documentation
- **Description**: Added comprehensive scope details including navbar behavior, dashboard layout, file management pages, document creation workflow, review/approval process, and document viewer specifications
- **Files Modified**:
  - `docs/RNPL-Scope.md` - Added sections 4.1-4.2 (Awaiting Task, Recent Files), sections 5-13 covering footer, pending files, my files, all files, notifications, admin panel, document creation, review/approval process, and document viewer. Updated section 4 with navbar details and dashboard main page structure. Added note about Tiptap Editor library choice.

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

---

2025-12-15 16:05:22 - Updated navbar items
- Changed "Pending Approvals" to "Pending"
- Added new navbar items: Library, Archive, Reports, Help
- Updated navigation order: Dashboard, Pending, My Files, Library, Archive, Reports, Help
- Updated getActiveTab function to handle new routes
Files Modified:
- components/header.tsx

---

2025-12-15 16:06:36 - Updated 404 page to show "Under Development" notice
- Changed 404 page title from "Page Not Found" to "Under Development"
- Updated message to indicate page is under development
Files Modified:
- app/not-found.tsx

---

2025-12-15 16:07:23 - Added navbar to 404 page
- Updated 404 page to include Header component for consistent navigation
- Changed layout structure to match other dashboard pages
- Removed standalone mode from UnderConstruction component
Files Modified:
- app/not-found.tsx

---

2025-12-15 16:11:52 - Replaced segmented tabs with Navigation Menu component
- Changed navbar from Tabs component to NavigationMenu component from shadcn/ui
- Updated styling to maintain similar appearance with segmented background
- Preserved active state highlighting with white background and shadow
- Updated imports and removed unused Tabs-related code
Files Modified:
- components/header.tsx

---

2025-12-15 16:12:22 - Increased navbar padding
- Increased horizontal padding from px-4 (16px) to px-6 (24px) for better spacing
Files Modified:
- components/header.tsx

---

2025-12-15 16:15:33 - Added icons to navigation menu items
- Added Lucide icons to each navigation item: LayoutDashboard, Clock, Folder, Library, Archive, BarChart, HelpCircle
- Icons displayed alongside labels with proper spacing (gap-2)
- Icons sized at 16px for consistency
Files Modified:
- components/header.tsx

---

2025-12-15 16:18:29 - Added vertical padding to Header container
- Added py-2 (8px) padding-top and padding-bottom to the Header container div
- Applied CSS style changes from browser preview
Files Modified:
- components/header.tsx

---

2025-12-15 16:22:41 - Fixed build error: installed missing dependencies
- Installed `clsx` (^2.1.1) and `tailwind-merge` (^3.4.0) packages
- Resolved "Module not found: Can't resolve 'tailwind-merge'" build error
- These packages are required by lib/utils.ts for the cn() utility function
Files Modified:
- package.json

---

2025-12-15 16:23:37 - Security update: fixed Next.js vulnerabilities
- Updated Next.js from 16.0.7 to 16.0.10 to fix high severity vulnerabilities
- Updated eslint-config-next from 16.0.7 to 16.0.10 to match Next.js version
- Fixed: Next Server Actions Source Code Exposure (GHSA-w37m-7fhw-fmv9)
- Fixed: Next Vulnerable to Denial of Service with Server Components (GHSA-mwv6-3258-q52c)
- npm audit now reports 0 vulnerabilities
Files Modified:
- package.json

---

2025-12-15 16:30:39 - Fixed navbar jumping issue when switching nav items
- Removed `font-semibold` from active nav item state to keep font weight consistent
- Active and inactive nav items now both use `font-medium` to prevent width changes
- Active state still visually distinct with `bg-slate-100` background
Files Modified:
- components/header.tsx

---

2025-12-15 16:32:42 - Additional fix for navbar jumping on 404 page
- Added `whitespace-nowrap` to nav items to prevent text wrapping and ensure consistent sizing
- Prevents layout shifts when switching between nav items on 404 page
Files Modified:
- components/header.tsx

---

2025-12-15 17:43:50 - Made navbar persistent across all pages
- Moved Header component to root layout (app/layout.tsx) so it appears on all pages
- Header automatically shows/hides based on authentication (returns null when no user)
- Removed Header imports and usage from individual pages:
  - app/not-found.tsx (404 page)
  - All dashboard pages (dashboard, files, pending, create, profile, admin, files/[id])
- Navbar now persists across all pages including 404, providing consistent navigation
Files Modified:
- app/layout.tsx
- app/not-found.tsx
- app/(dashboard)/dashboard/page.tsx
- app/(dashboard)/dashboard/files/page.tsx
- app/(dashboard)/dashboard/files/[id]/page.tsx
- app/(dashboard)/dashboard/pending/page.tsx
- app/(dashboard)/dashboard/create/page.tsx
- app/(dashboard)/dashboard/profile/page.tsx
- app/(dashboard)/dashboard/admin/page.tsx

---

2025-12-18 10:40:34 - Added TipTap editor and renamed "Create New File" to "New Doc"
- Installed TipTap packages: @tiptap/react, @tiptap/starter-kit, @tiptap/pm, @tiptap/extension-placeholder
- Created new TipTapEditor component (components/tiptap-editor.tsx) for rich text editing
- Replaced textarea with TipTap editor in CreateFileForm for document body editing
- Updated preview section to render HTML content from TipTap editor
- Renamed "Create New File" to "New Doc" in:
  - Dashboard page button (app/(dashboard)/dashboard/page.tsx)
  - Create file form header (components/create-file-form.tsx)
- Added TipTap editor styles to global CSS for proper formatting (headings, lists, blockquotes, etc.)
- Editor supports rich text features: bold, italic, headings, lists, blockquotes, code blocks
Files Modified:
- package.json
- components/tiptap-editor.tsx (new)
- components/create-file-form.tsx
- app/(dashboard)/dashboard/page.tsx
- app/globals.css

---

2025-12-18 10:41:23 - Fixed TipTap SSR hydration error
- Added `immediatelyRender: false` to useEditor configuration to prevent SSR hydration mismatches
- Fixes "SSR has been detected, please set `immediatelyRender` explicitly to `false`" error
Files Modified:
- components/tiptap-editor.tsx

---

2025-12-18 10:47:45 - Redesigned Create New Doc page with document editor layout
- Completely redesigned create-file-form to show document editor interface instead of sidebar+preview
- Added DocumentHeader component at the top of the document
- Made reference number and date editable with edit icons (Edit2 icon) - click to edit inline
- Reference and date show meaningful icons indicating they can be changed
- Subject line now appears as editable document field (no label, looks like document content)
- Replaced TipTap editor with TipTapEditorWithToolbar component showing toolbar at top
- Toolbar includes: Bold, Italic, H1, H2, Bullet List, Ordered List, Blockquote, Undo, Redo
- Added active state styling for toolbar buttons
- Moved metadata (category, recipients, send copies) to right sidebar
- Top bar includes language toggle, Save Draft, and Submit buttons
- Document editor shows white paper container with proper spacing and styling
- Removed redundant margin from "New Doc" button icon (uses Button's built-in gap-2)
Files Modified:
- components/create-file-form.tsx
- components/tiptap-editor-with-toolbar.tsx (new)
- app/(dashboard)/dashboard/page.tsx
- app/globals.css

---

2025-12-18 10:52:00 - Removed duplicate ref/date and made DocumentHeader editable
- Removed duplicate reference number and date section from create-file-form
- Made DocumentHeader component editable with edit icons for ref and date
- Reference and date are now editable directly in the header
- Labels are language-aware: "Ref No:" and "Date:" in English, "স্মারক নং:" and "তারিখ:" in Bangla
- Edit icons (Edit2) appear next to ref and date in header when editable
- Clicking edit icon shows inline input field for editing
Files Modified:
- components/document-header.tsx
- components/create-file-form.tsx

---

2025-12-18 10:53:32 - Made TipTap editor placeholder language-aware
- TipTap editor placeholder now updates dynamically when language changes
- Placeholder shows English text ("Start typing your document content here...") in English mode
- Placeholder shows Bangla text ("এখানে আপনার নথির মূল বিষয়বস্তু লিখুন...") in Bangla mode
- Added useEffect to update data-placeholder attribute when placeholder prop changes
- Updated CSS to ensure placeholder displays correctly when attribute changes
Files Modified:
- components/tiptap-editor-with-toolbar.tsx
- app/globals.css

---

2025-12-18 10:55:00 - Fixed TipTap placeholder not updating on language switch
- Updated `useEditor` hook to include `placeholder` in the dependency array
- Forces editor re-initialization when placeholder prop changes (e.g. language switch)
- Ensures the `Placeholder` extension is configured with the correct string on re-render
- Removed manual DOM manipulation hacks as re-initialization handles it natively
- Correctly preserves content during re-initialization
Files Modified:
- components/tiptap-editor-with-toolbar.tsx








