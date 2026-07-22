import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    placeholder: placeholder,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-[var(--color-rule)] rounded-sm overflow-hidden bg-[var(--color-paper)]">
      {/* Toolbar */}
      <div className="border-b border-[var(--color-rule)] p-2 flex flex-wrap gap-1 bg-[var(--color-indigo-soft)]/30">
        {/* ...same toolbar buttons as before, unchanged... */}
      </div>

      {/* Editor Content — clicking anywhere in this area, not just on the
          text itself, focuses the editor and places the cursor at the end */}
      <div
        onClick={() => editor.commands.focus("end")}
        className="min-h-[250px] cursor-text"
      >
        <EditorContent
          editor={editor}
          className="font-[var(--font-body)] text-[var(--color-ink)] prose max-w-none p-4 h-full focus:outline-none"
        />
      </div>
    </div>
  );
}
