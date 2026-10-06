import React, { useCallback, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Link as LinkIcon,
    Unlink,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Heading2,
    Heading3,
    Code,
    Minus,
    Undo,
    Redo,
    ImageIcon,
} from 'lucide-react';

// ─── Toolbar Button ───────────────────────────────────────────────
interface ToolbarButtonProps {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
    onClick,
    active = false,
    disabled = false,
    title,
    children,
}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`p-1.5 rounded-lg text-sm transition-all focus:outline-none ${
            active
                ? 'bg-[#C9A227] text-white shadow-sm'
                : 'text-[#5C5850] hover:bg-[#FBF6EC] hover:text-[#1A1A1A]'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
        {children}
    </button>
);

// ─── Divider ─────────────────────────────────────────────────────
const ToolbarDivider = () => (
    <span className="w-px h-5 bg-[#E8DFC8] mx-0.5 shrink-0" />
);

// ─── Toolbar ─────────────────────────────────────────────────────
const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
    const setLink = useCallback(() => {
        const previous = editor.getAttributes('link').href;
        const url = window.prompt('Enter URL:', previous ?? 'https://');
        if (url === null) return; // cancelled
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:');
        if (url) editor.chain().focus().setImage({ src: url }).run();
    }, [editor]);

    return (
        <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-[#F8F4EC] border-b border-[#E8DFC8] rounded-t-xl">
            {/* Text Style */}
            <ToolbarButton title="Bold (⌘B)" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
                <Bold size={15} />
            </ToolbarButton>
            <ToolbarButton title="Italic (⌘I)" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
                <Italic size={15} />
            </ToolbarButton>
            <ToolbarButton title="Underline (⌘U)" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
                <UnderlineIcon size={15} />
            </ToolbarButton>
            <ToolbarButton title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
                <Strikethrough size={15} />
            </ToolbarButton>
            <ToolbarButton title="Inline code" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>
                <Code size={15} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Headings */}
            <ToolbarButton title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
                <Heading2 size={15} />
            </ToolbarButton>
            <ToolbarButton title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
                <Heading3 size={15} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Alignment */}
            <ToolbarButton title="Align left" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
                <AlignLeft size={15} />
            </ToolbarButton>
            <ToolbarButton title="Align center" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
                <AlignCenter size={15} />
            </ToolbarButton>
            <ToolbarButton title="Align right" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
                <AlignRight size={15} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Lists */}
            <ToolbarButton title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
                <List size={15} />
            </ToolbarButton>
            <ToolbarButton title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
                <ListOrdered size={15} />
            </ToolbarButton>
            <ToolbarButton title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
                <Quote size={15} />
            </ToolbarButton>
            <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <Minus size={15} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Links & Media */}
            <ToolbarButton title="Add link" onClick={setLink} active={editor.isActive('link')}>
                <LinkIcon size={15} />
            </ToolbarButton>
            <ToolbarButton title="Remove link" onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>
                <Unlink size={15} />
            </ToolbarButton>
            <ToolbarButton title="Insert image" onClick={addImage}>
                <ImageIcon size={15} />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Undo / Redo */}
            <ToolbarButton title="Undo (⌘Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                <Undo size={15} />
            </ToolbarButton>
            <ToolbarButton title="Redo (⌘⇧Z)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                <Redo size={15} />
            </ToolbarButton>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────
export interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: number;
    maxLength?: number;
    label?: string;
    error?: string;
    required?: boolean;
    id?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Start writing…',
    minHeight = 220,
    maxLength,
    label,
    error,
    required = false,
    id,
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                code: {},
                codeBlock: {},
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-[#8A6A16] underline underline-offset-2 hover:text-[#C9A227]' },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Image.configure({ inline: false, HTMLAttributes: { class: 'rounded-lg max-w-full my-2' } }),
            Placeholder.configure({ placeholder }),
            ...(maxLength ? [CharacterCount.configure({ limit: maxLength })] : []),
        ],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none outline-none px-4 py-3 text-[#1A1A1A] leading-relaxed min-h-[inherit]',
                ...(id ? { id } : {}),
            },
        },
    });

    // ── Controlled sync ──────────────────────────────────────────────
    // When `value` is pre-populated from the server (edit forms), the editor
    // may have mounted before the data was ready. This effect pushes the
    // external value in whenever it genuinely differs from the current HTML,
    // without touching the cursor position during normal typing.
    useEffect(() => {
        if (!editor || editor.isDestroyed) return;

        const current = editor.getHTML();
        // Normalise TipTap's empty-doc output so we don't overwrite a blank
        // editor with an identical blank value.
        const isEmpty = (html: string) =>
            !html || html === '<p></p>' || html.trim() === '';

        if (!isEmpty(value) && value !== current) {
            // Preserve the current selection by restoring it after the update
            editor.commands.setContent(value, false /* don't emit update */);
        }
    }, [value, editor]);

    const charCount = editor && maxLength ? editor.storage.characterCount?.characters?.() ?? 0 : null;

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-xs uppercase font-semibold text-[#1A1A1A]" htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={`rounded-xl border transition-colors overflow-hidden ${
                    error
                        ? 'border-red-400 ring-1 ring-red-200'
                        : 'border-[#E8DFC8] focus-within:border-[#C9A227] focus-within:ring-1 focus-within:ring-[#C9A227]/30'
                }`}
            >
                {editor && <Toolbar editor={editor} />}

                <div
                    className="bg-white cursor-text"
                    style={{ minHeight }}
                    onClick={() => editor?.chain().focus().run()}
                >
                    <EditorContent editor={editor} />
                </div>

                {/* Footer: char count */}
                {maxLength && charCount !== null && (
                    <div className="flex justify-end px-3 py-1.5 bg-[#F8F4EC] border-t border-[#E8DFC8]">
                        <span
                            className={`text-[11px] font-medium tabular-nums ${
                                charCount > maxLength * 0.9 ? 'text-amber-600' : 'text-[#9A9690]'
                            }`}
                        >
                            {charCount.toLocaleString()} / {maxLength.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
};
