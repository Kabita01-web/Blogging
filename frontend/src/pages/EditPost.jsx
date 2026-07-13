import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import RichTextEditor from "../componets/RichTestEditor"; // fixed: was ../componets/RichTestEditor

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

  // warn on tab close / refresh with unsaved changes
  useEffect(() => {
    const handler = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // auto-grow the title textarea as the headline wraps
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

  // ---------- loading skeleton ----------
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 py-14 animate-pulse">
          <div className="border-b border-stone-300 pb-6 mb-8">
            <div className="h-9 w-40 bg-stone-200 rounded" />
            <div className="h-4 w-28 bg-stone-200 rounded mt-3" />
          </div>
          <div className="h-12 w-3/4 bg-stone-200 rounded mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-stone-200 rounded" />
            <div className="h-4 bg-stone-200 rounded w-11/12" />
            <div className="h-4 bg-stone-200 rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  // ---------- load-failure empty state ----------
  if (loadError) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-stone-300 mb-5">
            <span className="font-['IBM_Plex_Mono'] text-stone-500 text-sm">
              !
            </span>
          </div>
          <h1 className="font-['Zilla_Slab'] text-2xl font-semibold text-stone-900 mb-2">
            This post couldn't be loaded
          </h1>
          <p className="font-['Lora'] text-stone-500 mb-8">
            It may have been removed, or the connection dropped.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={fetchPost}
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded transition"
            >
              Try again
            </button>
            <button
              onClick={() => navigate("/")}
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase border border-stone-400 text-stone-600 px-6 py-3 rounded hover:bg-stone-100 transition"
            >
              Back home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* sticky status bar */}
      <div className="sticky top-0 z-10 bg-stone-50/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition"
          >
            ← Back to post
          </button>
          <span
            className={`font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] uppercase ${
              saving
                ? "text-indigo-600"
                : isDirty
                  ? "text-amber-600"
                  : "text-stone-400"
            }`}
          >
            {saving ? "Saving…" : isDirty ? "Unsaved changes" : "Saved"}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-32">
        <div className="border-b border-stone-300 pb-6 mb-10">
          <p className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-indigo-600 mb-1">
            Editing
          </p>
          <p className="font-['Lora'] italic text-stone-500">
            Changes save only when you publish the update below
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {formError && (
            <div className="mb-8 px-4 py-3 bg-red-50 border border-red-200 text-red-700 font-['Lora'] text-sm rounded">
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
            className="w-full resize-none overflow-hidden bg-transparent outline-none font-['Zilla_Slab'] font-semibold text-4xl md:text-5xl text-stone-900 placeholder-stone-300 leading-tight mb-10"
          />

          <div className="mb-4">
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Update your story…"
            />
          </div>

          <p className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.1em] text-stone-400 text-right">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </p>
        </form>
      </div>

      {/* sticky footer action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-stone-50/95 backdrop-blur border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex gap-4">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={saving || !isDirty}
            className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Update post"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase border border-stone-400 text-stone-600 px-6 py-3 rounded hover:bg-stone-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
