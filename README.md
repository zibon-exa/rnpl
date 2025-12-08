# RNPL Note

RNPL Note is a lightweight digital note and file management system designed to simplify how organizations manage official documents, approvals, and collaborative workflows. Inspired by the core principles of the government d'Nothi platform, this MVP delivers a fast, practical, and easy-to-adapt solution for smaller teams and private organizations.

The system enables users to create, manage, track, and approve digital files with a structured workflow, replacing traditional paper-based processes. By prioritizing simplicity and efficiency, RNPL Note provides an immediate productivity boost without introducing unnecessary complexity.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Additional UI:** Magic UI components
- **Deployment:** Netlify / Vercel

## MVP Scope

### Included Features

The MVP includes essential modules required for operational use:

- **User Dashboard** - Quick task visibility and productivity workspace
- **Create File / Note** - Structured form to start new digital files
- **Approval Workflow** - Forward, approve, and return files with comments
- **Notifications** - In-app notification center with badge indicators
- **User Login & Authentication** - Email/password authentication with role-based access
- **Admin Login & Setup** - Secure admin authentication and access control
- **User Management** - Create, edit, and manage users with role assignment
- **File Categories & System Settings** - Configure categories and system behavior

### Excluded Features (Scoped-Out)

These features are intentionally excluded from the MVP to ensure RNPL Note remains lean, fast to deploy, and easy for organizations to adopt immediately:

- **Inward/Outward Letter Management** - Complete letter management module with reception, dispatch tracking, and registry logs
- **Multi-Office Routing Engine** - Complex hierarchical routing and inter-office movement
- **Digital Signature Certificate (DSC) Integration** - PKI-based certificate signing and cryptographic validation
- **Workflow Automation & SLA Rules** - Auto-forwarding, escalation rules, turnaround time tracking, SLA reminders
- **Email/SMS Notifications** - External communication channels (in-app notifications only)
- **Mobile Applications** - Dedicated Android or iOS apps
- **Bulk File Processing & Import Tools** - Mass upload, approval, or data migration
- **Detailed Analytics and BI Dashboards** - Advanced reporting, charts, workflow heatmaps, and bottleneck analytics

## Project Structure

```
rnpl/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # User dashboard routes
│   ├── (admin)/           # Admin panel routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home/landing page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Shared components
├── lib/                  # Utility functions, helpers, API clients
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
├── public/               # Static assets
├── docs/                 # Non-essential documentation
└── ...                   # Configuration files
```

## Setup Instructions

_Setup instructions will be added as the project develops._

## Development

This is a functional application for stakeholder review. It may be deployed to Netlify or Vercel for sharing purposes.

## Documentation

Non-essential documentation is stored in the `docs/` folder. See [docs/PRD.md](docs/PRD.md) for the Product Requirements Document with detailed MVP specifications.
