import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import RichTextEditor from "../componets/RichTestEditor"; // ← Using RichTextEditor

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/posts", { title, content });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="border-b border-stone-300 pb-6 mb-8">
          <h1 className="font-['Zilla_Slab'] text-4xl font-semibold text-stone-900">
            Write a new entry
          </h1>
          <p className="font-['Lora'] italic text-stone-500 mt-1">
            Share your thoughts with the world
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
              placeholder="Give your post a title..."
              className="w-full px-4 py-3 border border-stone-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-lg font-['Zilla_Slab']"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">
              Content
            </label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your story here..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded transition disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish post"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
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
