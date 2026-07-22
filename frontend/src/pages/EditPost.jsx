import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import RichTextEditor from "../components/RichTextEditor";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [original, setOriginal] = useState({ title: "", content: "" });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [formError, setFormError] = useState("");

  const titleRef = useRef(null);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isDirty = title !== original.title || content !== original.content;

  useEffect(() => {
    const handler = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { data } = await api.get(`/posts/${id}`);
      setTitle(data.data.title);
      setContent(data.data.content);
      setOriginal({ title: data.data.title, content: data.data.content });
    } catch (err) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setFormError("Title and content are required");
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      await api.put(`/posts/${id}`, { title, content });
      navigate(`/posts/${id}`);
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm("Discard unsaved changes?")) return;
    navigate(`/posts/${id}`);
  };

  const wordCount = content
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="max-w-4xl mx-auto px-6 py-14 animate-pulse">
          <div className="border-b border-[var(--color-rule)] pb-6 mb-8">
            <div className="h-9 w-40 bg-[var(--color-indigo-soft)] rounded" />
            <div className="h-4 w-28 bg-[var(--color-indigo-soft)] rounded mt-3" />
          </div>
          <div className="h-12 w-3/4 bg-[var(--color-indigo-soft)] rounded mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-[var(--color-indigo-soft)] rounded" />
            <div className="h-4 bg-[var(--color-indigo-soft)] rounded w-11/12" />
            <div className="h-4 bg-[var(--color-indigo-soft)] rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-rule)] mb-5">
            <span className="font-[var(--font-mono)] text-[var(--color-muted)] text-sm">
              !
            </span>
          </div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] mb-2">
            This post couldn't be loaded
          </h1>
          <p className="font-[var(--font-body)] text-[var(--color-muted)] mb-8">
            It may have been removed, or the connection dropped.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchPost}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-bright)] text-white px-6 py-3 rounded-full transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => navigate("/")}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--color-rule)] text-[var(--color-ink)] px-6 py-3 rounded-full hover:bg-[var(--color-indigo-soft)] transition-colors"
            >
              Back home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-paper)]">
      {/* status bar — sticky to the editor's scroll area, not the viewport */}
      <div className="sticky top-16 z-10 bg-[var(--color-paper)]/90 backdrop-blur border-b border-[var(--color-rule)]">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← Back to post
          </button>
          <span
            className={`font-[var(--font-mono)] text-[11px] tracking-[0.15em] uppercase ${
              saving
                ? "text-[var(--color-indigo)]"
                : isDirty
                  ? "text-amber-600"
                  : "text-[var(--color-muted)]"
            }`}
          >
            {saving ? "Saving…" : isDirty ? "Unsaved changes" : "Saved"}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-10">
        <div className="border-b border-[var(--color-rule)] pb-6 mb-10">
          <p className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-indigo)] mb-1">
            Editing
          </p>
          <p className="font-[var(--font-body)] italic text-[var(--color-muted)]">
            Changes save only when you publish the update below
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {formError && (
            <div className="mb-8 px-4 py-3 bg-red-50 border border-red-200 text-red-700 font-[var(--font-body)] text-sm rounded-xl">
              {formError}
            </div>
          )}

          <textarea
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            rows={1}
            required
            className="w-full resize-none overflow-hidden bg-transparent outline-none font-[var(--font-display)] font-semibold text-4xl md:text-5xl text-[var(--color-ink)] placeholder-[var(--color-rule)] leading-tight mb-10"
          />

          <div className="mb-4">
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Update your story…"
            />
          </div>

          <p className="font-[var(--font-mono)] text-[11px] tracking-[0.1em] text-[var(--color-muted)] text-right">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </p>

          {/* action bar — normal flow, sits right after the editor, no overlap with Footer */}
          <div className="flex gap-4 mt-10 pt-6 border-t border-[var(--color-rule)]">
            <button
              type="submit"
              disabled={saving || !isDirty}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-bright)] text-white px-6 py-3 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Saving…" : "Update post"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--color-rule)] text-[var(--color-ink)] px-6 py-3 rounded-full hover:bg-[var(--color-indigo-soft)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
