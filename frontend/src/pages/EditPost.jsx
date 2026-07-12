import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setTitle(data.data.title);
      setContent(data.data.content);
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await api.put(`/posts/${id}`, { title, content });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="text-center py-20">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="text-center py-20 text-red-500">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="border-b border-stone-300 pb-6 mb-8">
          <h1 className="font-['Zilla_Slab'] text-4xl font-semibold text-stone-900">
            Edit post
          </h1>
          <p className="font-['Lora'] italic text-stone-500 mt-1">
            Update your entry
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-lg font-['Zilla_Slab']"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">
              Content
            </label>
            <div className="bg-white rounded border border-stone-300">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="h-[400px] pb-12"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image", "blockquote", "code-block"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update post"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/posts/${id}`)}
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase border border-stone-400 text-stone-600 px-6 py-3 rounded hover:bg-stone-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
