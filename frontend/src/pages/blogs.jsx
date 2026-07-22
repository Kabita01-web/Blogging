import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data } = await api.get("/posts");
      setPosts(data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const readingTime = (html) => {
    const words = stripHtml(html).trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
  };

  const initials = (name = "Unknown") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="max-w-5xl mx-auto px-6 py-14 animate-pulse">
          <div className="mb-14 border-b border-[var(--color-rule)] pb-6">
            <div className="h-3 w-40 bg-[var(--color-indigo-soft)] rounded-sm mb-4" />
            <div className="h-12 w-64 bg-[var(--color-indigo-soft)] rounded-sm" />
          </div>
          <div className="h-4 w-full bg-[var(--color-indigo-soft)] rounded-sm mb-2" />
          <div className="h-4 w-5/6 bg-[var(--color-indigo-soft)] rounded-sm" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <p className="font-[var(--font-mono)] text-xs tracking-[0.2em] uppercase text-red-700 mb-3">
              Printing Error
            </p>
            <p className="font-[var(--font-body)] italic text-[var(--color-muted)] mb-6">
              {error}. The press jammed somewhere between the server and the
              page.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                fetchPosts();
              }}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--color-rule)] text-[var(--color-ink)] px-5 py-2.5 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] hover:border-[var(--color-ink)] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Masthead */}
        <header className="mb-14">
          <div className="flex items-baseline justify-between border-t-2 border-b border-[var(--color-ink)] pt-2 pb-2 mb-1">
            <p className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-indigo)]">
              All Entries
            </p>
            <p className="font-[var(--font-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--color-muted)]">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="border border-dashed border-[var(--color-rule)] rounded-sm py-20 text-center">
            <p className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] mb-2">
              No entries yet.
            </p>
            <p className="font-[var(--font-body)] italic text-[var(--color-muted)] mb-6">
              Be the first to fill the page.
            </p>
            <Link
              to="/create"
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase text-[var(--color-paper)] bg-[var(--color-ink)] px-5 py-2.5 hover:bg-[var(--color-indigo)] transition-colors"
            >
              Start writing
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-rule)]">
            {posts.map((post) => (
              <article
                key={post._id}
                className="py-7 grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 items-baseline group"
              >
                <div>
                  <Link to={`/posts/${post._id}`}>
                    <h3 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-indigo)] transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="font-[var(--font-body)] text-[var(--color-muted)] mt-1.5 leading-relaxed">
                    {stripHtml(post.content).substring(0, 160)}…
                  </p>
                  <div className="font-[var(--font-mono)] text-[11px] text-[var(--color-muted)] mt-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[var(--color-indigo-soft)] text-[var(--color-indigo)] flex items-center justify-center text-[9px] font-semibold">
                      {initials(post.author?.name)}
                    </span>
                    <span>{post.author?.name || "Unknown"}</span>
                    <span className="text-[var(--color-rule)]">·</span>
                    <span>{readingTime(post.content)}</span>
                  </div>
                </div>
                <div className="font-[var(--font-mono)] text-xs text-[var(--color-muted)] whitespace-nowrap sm:text-right">
                  {formatDate(post.createdAt)}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
