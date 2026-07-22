import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const { data } = await api.get("/posts/user/me");
      setPosts(data.data);
    } catch (err) {
      setError("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      fetchMyPosts();
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading)
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="text-center py-20 font-[var(--font-mono)] text-sm text-[var(--color-muted)]">
          Loading...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex justify-between items-center border-b border-[var(--color-rule)] pb-6 mb-8">
          <div>
            <h1 className="font-[var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
              Dashboard
            </h1>
            <p className="font-[var(--font-body)] italic text-[var(--color-muted)] mt-1">
              Your published entries
            </p>
          </div>
          <Link
            to="/create"
            className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-bright)] text-white px-5 py-2.5 rounded-full transition-colors"
          >
            + New post
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-700 font-[var(--font-body)] mb-6">
            {error}
          </p>
        )}

        {posts.length === 0 ? (
          <div className="border border-dashed border-[var(--color-rule)] rounded-2xl py-20 text-center">
            <p className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] mb-2">
              No posts yet
            </p>
            <p className="font-[var(--font-body)] italic text-[var(--color-muted)]">
              Write your first post and share it with the world.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white/50 border border-[var(--color-rule)] rounded-2xl p-6 flex justify-between items-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
              >
                <div>
                  <Link
                    to={`/posts/${post._id}`}
                    className="ink-link font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)]"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-[var(--color-muted)] font-[var(--font-mono)] mt-1">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/edit/${post._id}`}
                    className="text-sm text-[var(--color-indigo)] hover:text-[var(--color-indigo-bright)] px-3 py-1 border border-[var(--color-indigo-soft)] rounded-full hover:bg-[var(--color-indigo-soft)] transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
