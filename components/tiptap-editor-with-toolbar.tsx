'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { useEffect, useState } from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  CheckSquare,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Highlighter,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  RemoveFormatting,
  Plus,
  Table as TableIcon,
  Palette,
  AlignVerticalSpaceAround
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';

interface TipTapEditorWithToolbarProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  language?: 'bn' | 'en';
}

// Limited color palette for consistency
const COLOR_PALETTE = [
  { name: 'Black', value: '#1e293b', var: 'text-slate-900' },
  { name: 'Brand', value: 'hsl(196, 60%, 56%)', var: 'text-[hsl(var(--color-brand))]' },
  { name: 'Red', value: '#dc2626', var: 'text-red-600' },
  { name: 'Blue', value: '#2563eb', var: 'text-blue-600' },
  { name: 'Green', value: '#16a34a', var: 'text-green-600' },
];

const LINE_SPACING_OPTIONS = [
  { label: '1.0', value: '1.0' },
  { label: '1.15', value: '1.15' },
  { label: '1.5', value: '1.5' },
  { label: '2.0', value: '2.0' },
];

export function TipTapEditorWithToolbar({ content, onChange, placeholder, className, language = 'en' }: TipTapEditorWithToolbarProps) {
  const currentPlaceholder = placeholder || 'Start typing...';
  const [lineHeight, setLineHeight] = useState('1.5');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: currentPlaceholder,
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Subscript,
      Superscript,
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-sm text-slate-700',
        style: `line-height: ${lineHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  }, [currentPlaceholder]);

  // Update editor content when content prop changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Update line height when it changes
  useEffect(() => {
    if (editor) {
      editor.view.dom.style.lineHeight = lineHeight;
    }
  }, [lineHeight, editor]);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleIndent = () => {
    const { selection } = editor.state;
    const { $from } = selection;
    const node = $from.node();

    // For lists, use built-in sinkListItem
    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      if (editor.can().sinkListItem('listItem')) {
        editor.chain().focus().sinkListItem('listItem').run();
      }
    } else {
      // For regular paragraphs, add CSS margin
      const currentStyle = node.attrs.style || '';
      const marginMatch = currentStyle.match(/margin-left:\s*(\d+)/);
      const currentMargin = marginMatch ? parseInt(marginMatch[1]) : 0;
      const newMargin = currentMargin + 40;
      const newStyle = currentStyle.replace(/margin-left:\s*\d+px;?/, '') + `margin-left: ${newMargin}px;`;
      editor.chain().focus().updateAttributes('paragraph', { style: newStyle.trim() }).run();
    }
  };

  const handleOutdent = () => {
    const { selection } = editor.state;
    const { $from } = selection;
    const node = $from.node();

    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      if (editor.can().liftListItem('listItem')) {
        editor.chain().focus().liftListItem('listItem').run();
      }
    } else {
      // For regular paragraphs, decrease margin
      const currentStyle = node.attrs.style || '';
      const marginMatch = currentStyle.match(/margin-left:\s*(\d+)/);
      const currentMargin = marginMatch ? parseInt(marginMatch[1]) : 0;
      if (currentMargin > 0) {
        const newMargin = Math.max(0, currentMargin - 40);
        const newStyle = newMargin > 0
          ? currentStyle.replace(/margin-left:\s*\d+px;?/, `margin-left: ${newMargin}px;`)
          : currentStyle.replace(/margin-left:\s*\d+px;?/, '');
        editor.chain().focus().updateAttributes('paragraph', { style: newStyle.trim() }).run();
      }
    }
  };

  return (
    <TooltipProvider>
      <div className={`border border-slate-200 rounded-lg bg-white ${className || ''}`}>
        {/* Main Toolbar */}
        <div className="flex flex-wrap items-center gap-1 px-3 py-2.5 border-b border-slate-200 bg-slate-50/80 rounded-t-lg">
          {/* Group 1: History */}
          <div className="flex items-center gap-0.5 bg-white rounded-md p-0.5 border border-slate-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                >
                  <Undo size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Undo (Ctrl+Z)
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                >
                  <Redo size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Redo (Ctrl+Y)
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-slate-300 mx-1" />

          {/* Group 2: Text Style */}
          <div className="flex items-center gap-0.5 bg-white rounded-md p-0.5 border border-slate-200">
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 font-normal px-2 text-xs">
                      {editor.isActive('heading', { level: 1 }) ? 'Heading 1' :
                        editor.isActive('heading', { level: 2 }) ? 'Heading 2' :
                          editor.isActive('heading', { level: 3 }) ? 'Heading 3' :
                            'Normal'}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Text Style
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="text-xs">Text Style</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
                  Normal Text
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                  <Heading1 size={14} className="mr-2" /> Heading 1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                  <Heading2 size={14} className="mr-2" /> Heading 2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                  <Heading3 size={14} className="mr-2" /> Heading 3
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  data-active={editor.isActive('bold')}
                >
                  <Bold size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Bold (Ctrl+B)
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  data-active={editor.isActive('italic')}
                >
                  <Italic size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Italic (Ctrl+I)
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  data-active={editor.isActive('underline')}
                >
                  <UnderlineIcon size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Underline (Ctrl+U)
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  data-active={editor.isActive('strike')}
                >
                  <Strikethrough size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Strikethrough
              </TooltipContent>
            </Tooltip>

            {/* Color Picker */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Palette size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Text Color
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="text-xs">Text Color</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {COLOR_PALETTE.map((color) => (
                  <DropdownMenuItem
                    key={color.value}
                    onClick={() => editor.chain().focus().setColor(color.value).run()}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-4 h-4 rounded border border-slate-300"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => editor.chain().focus().unsetColor().run()}>
                  <RemoveFormatting size={14} className="mr-2" /> Reset Color
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  data-active={editor.isActive('highlight')}
                >
                  <Highlighter size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Highlight
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-slate-300 mx-1" />

          {/* Group 3: Paragraph Formatting */}
          <div className="flex items-center gap-0.5 bg-white rounded-md p-0.5 border border-slate-200">
            {/* Alignment */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      {editor.isActive({ textAlign: 'center' }) ? <AlignCenter size={15} /> :
                        editor.isActive({ textAlign: 'right' }) ? <AlignRight size={15} /> :
                          editor.isActive({ textAlign: 'justify' }) ? <AlignJustify size={15} /> :
                            <AlignLeft size={15} />}
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Text Alignment
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="text-xs">Alignment</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                  <AlignLeft size={14} className="mr-2" /> Left
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                  <AlignCenter size={14} className="mr-2" /> Center
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                  <AlignRight size={14} className="mr-2" /> Right
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                  <AlignJustify size={14} className="mr-2" /> Justify
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Line Spacing */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <AlignVerticalSpaceAround size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Line Spacing
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="text-xs">Line Spacing</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {LINE_SPACING_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setLineHeight(option.value)}
                    className={lineHeight === option.value ? 'bg-slate-100' : ''}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Lists */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  data-active={editor.isActive('bulletList')}
                >
                  <List size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Bullet List
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  data-active={editor.isActive('orderedList')}
                >
                  <ListOrdered size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Numbered List
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-slate-300 mx-1" />

          {/* Group 4: Insert */}
          <div className="flex items-center gap-0.5 bg-white rounded-md p-0.5 border border-slate-200">
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 gap-2 font-normal px-2 text-xs">
                      <Plus size={15} /> Insert
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Insert Elements
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="text-xs">Insert</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={setLink}>
                  <LinkIcon size={14} className="mr-2" /> Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={addImage}>
                  <ImageIcon size={14} className="mr-2" /> Image
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                  <Quote size={14} className="mr-2" /> Quote
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().toggleTaskList().run()}>
                  <CheckSquare size={14} className="mr-2" /> Task List
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                  <TableIcon size={14} className="mr-2" /> Table (3×3)
                </DropdownMenuItem>
                {editor.isActive('table') && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                      Add Column
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
                      Delete Column
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
                      Add Row
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
                      Delete Row
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()} className="text-red-600">
                      Delete Table
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Editor Content */}
        <div className={`focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all rounded-b-lg ${language === 'bn' ? 'editor-bangla' : 'editor-english'}`}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </TooltipProvider>
  );
}
