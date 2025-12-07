# Document Design System

This directory contains centralized components for document design. **All document design changes should be made in these components** to ensure consistency across the application.

## Components

### `document-paper.tsx`
The outer container for all document previews. Handles:
- Background texture (noise)
- Paper container styling
- Scrollable area
- Shadow and border

**To change:** Paper size, background, shadows, padding

### `document-header.tsx`
The official letterhead section. Includes:
- Company logo
- Company names (Bengali & English)
- Corporate office address and contact info
- Reference number (স্মারক নং)
- Date (তারিখ)

**To change:** Logo size, company info, header layout, colors

### `document-content.tsx`
The document body content. Includes:
- Subject (বিষয়)
- Category (বিভাগ)
- Document body (বিষয়বস্তু)
- Signature area (প্রস্তুত করেছেন)

**To change:** Content structure, typography, spacing, signature styling

## Usage

### In Create File Form (Live Preview)
```tsx
import { DocumentPreview } from '@/components/document-preview';

<DocumentPreview
  title={formData.title}
  category={formData.category}
  documentBody={formData.documentBody}
  sender={user.name}
/>
```

### In File Inspector (View Document)
```tsx
import { DocumentPaper } from '@/components/document-paper';
import { DocumentHeader } from '@/components/document-header';
import { DocumentContent } from '@/components/document-content';

<DocumentPaper>
  <DocumentHeader fileId={file.id} date={file.lastUpdated} />
  <DocumentContent 
    title={file.title}
    category={file.category}
    documentBody={file.documentBody}
    sender={file.sender}
    showPlaceholders={false}
  />
</DocumentPaper>
```

## Design Changes

**To update document design:**
1. Edit the relevant component file above
2. Changes will automatically reflect in:
   - Create File page (live preview)
   - File Inspector (document tab)
   - Any future document previews

**Never duplicate document design code!** Always use these centralized components.

