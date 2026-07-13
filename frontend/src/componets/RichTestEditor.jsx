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
    <div className="border border-stone-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b border-stone-300 p-2 flex flex-wrap gap-1 bg-stone-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            editor.isActive("bold") ? "bg-stone-200" : ""
          }`}
          type="button"
        >
          <span className="font-bold">B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            editor.isActive("italic") ? "bg-stone-200" : ""
          }`}
          type="button"
        >
          <span className="italic">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            editor.isActive("strike") ? "bg-stone-200" : ""
          }`}
          type="button"
        >
          <span className="line-through">S</span>
        </button>
        <span className="w-px h-6 bg-stone-300 self-center"></span>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-stone-200" : ""
          }`}
          type="button"
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            editor.isActive("heading", { level: 3 }) ? "bg-stone-200" : ""
          }`}
          type="button"
        >
          H3
        </button>
        <span className="w-px h-6 bg-stone-300 self-center"></span>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            editor.isActive("bulletList") ? "bg-stone-200" : ""
          }`}
          type="button"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            editor.isActive("orderedList") ? "bg-stone-200" : ""
          }`}
          type="button"
        >
          1. List
        </button>
        <span className="w-px h-6 bg-stone-300 self-center"></span>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 text-sm rounded hover:bg-stone-200 transition"
          type="button"
        >
          —
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            !editor.can().undo() ? "opacity-40 cursor-not-allowed" : ""
          }`}
          type="button"
          disabled={!editor.can().undo()}
        >
          ↩
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-stone-200 transition ${
            !editor.can().redo() ? "opacity-40 cursor-not-allowed" : ""
          }`}
          type="button"
          disabled={!editor.can().redo()}
        >
          ↪
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose prose-stone max-w-none p-4 min-h-[250px] focus:outline-none"
      />
    </div>
  );
}
