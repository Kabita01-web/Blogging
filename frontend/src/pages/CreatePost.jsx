import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";
import ImageUpload from "../components/ImageUpload";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = async (status) => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/posts", { title, content, status, coverImage });
      navigate(status === "draft" ? "/dashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="border-b border-[var(--color-rule)] pb-6 mb-8">
          <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
            Write a new entry
          </h1>
          <p className="font-[var(--font-body)] italic text-[var(--color-muted)] mt-1">
            Share your thoughts with the world
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-[var(--font-body)]">
              {error}
            </div>
          )}
          <div className="mb-6">
            <ImageUpload value={coverImage} onUpload={setCoverImage} />
          </div>
          <div className="mb-6">
            <label className="block font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a title..."
              className="w-full px-4 py-3 border border-[var(--color-rule)] bg-white/50 rounded-xl focus:ring-2 focus:ring-[var(--color-indigo-soft)] focus:border-[var(--color-indigo)] outline-none text-lg font-[var(--font-display)] transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mb-2">
              Content
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your story here..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => handleSubmit("published")}
              disabled={loading}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-bright)] text-white px-6 py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish post"}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              disabled={loading}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--color-rule)] text-[var(--color-ink)] px-6 py-3 rounded-full hover:bg-[var(--color-indigo-soft)] transition-colors disabled:opacity-50"
            >
              Save as draft
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] px-6 py-3 rounded-full hover:bg-[var(--color-indigo-soft)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
