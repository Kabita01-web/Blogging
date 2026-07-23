import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
    }
    fetchPost();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data.data);
      fetchRelated();
    } catch (err) {
      setError("Post not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      const { data } = await api.get("/posts");
      setRelated(data.data.filter((p) => p._id !== id).slice(0, 3));
    } catch {
      // related posts are non-critical; fail silently
    }
  };

  const deletePost = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const readingTime = (html) => {
    const words = stripHtml(html).trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  };

  const initials = (name = "Unknown") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  if (loading)
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="text-center py-20 font-[var(--font-mono)] text-sm text-[var(--color-muted)]">
          Loading...
        </div>
      </div>
    );
  if (error || !post)
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="text-center py-20 text-red-600 font-[var(--font-body)]">
          {error || "Post not found"}
        </div>
      </div>
    );

  const isAuthor = user?.id === post.author?._id;
  const image = post.coverImage || post.image;

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* Cover image */}
      <div className="w-full aspect-[21/9] bg-[var(--color-indigo-soft)]">
        {image && (
          <img src={image} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Category */}
        {post.category && (
          <span className="inline-block font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[var(--color-indigo)] bg-[var(--color-indigo-soft)] px-3 py-1 rounded-full mb-6">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--color-ink)] leading-tight mb-8">
          {post.title}
        </h1>

        {/* Byline */}
        <div className="flex items-center gap-3 pb-8 border-b border-[var(--color-rule)]">
          <div className="w-11 h-11 rounded-full bg-[var(--color-indigo)] text-white flex items-center justify-center font-[var(--font-mono)] text-sm font-medium">
            {initials(post.author?.name)}
          </div>
          <div className="flex-1">
            <p className="font-[var(--font-body)] text-sm font-medium text-[var(--color-ink)]">
              {post.author?.name || "Unknown"}
            </p>
            <p className="font-[var(--font-mono)] text-xs text-[var(--color-muted)]">
              {formatDate(post.createdAt)} · {readingTime(post.content)} min
              read
            </p>
          </div>
          {isAuthor && (
            <div className="flex items-center gap-3 font-[var(--font-mono)] text-xs">
              <Link
                to={`/edit/${post._id}`}
                className="text-[var(--color-indigo)] hover:text-[var(--color-indigo-bright)]"
              >
                Edit
              </Link>
              <button
                onClick={deletePost}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="font-[var(--font-body)] text-[var(--color-ink)] leading-relaxed text-lg mt-10 prose max-w-none first-letter:font-[var(--font-display)] first-letter:text-6xl first-letter:font-bold first-letter:text-[var(--color-indigo)] first-letter:mr-2 first-letter:float-left first-letter:leading-[0.85]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <CommentSection postId={post._id} />
      </article>

      {/* Related essays */}
      {related.length > 0 && (
        <section className="bg-white/40 border-t border-[var(--color-rule)] mt-16">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)]">
                Related essays
              </h2>
              <Link
                to="/blogs"
                className="ink-link font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-indigo)]"
              >
                View archive →
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {related.map((p) => (
                <article key={p._id}>
                  <Link
                    to={`/posts/${p._id}`}
                    className="block aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-indigo-soft)] mb-4"
                  >
                    {(p.coverImage || p.image) && (
                      <img
                        src={p.coverImage || p.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </Link>
                  <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-indigo)] mb-2">
                    {p.category || "Essay"}
                  </p>
                  <h3 className="font-[var(--font-display)] text-base font-semibold text-[var(--color-ink)] leading-snug mb-2">
                    <Link to={`/posts/${p._id}`} className="ink-link">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="font-[var(--font-mono)] text-[11px] text-[var(--color-muted)]">
                    By {p.author?.name || "Unknown"} · {readingTime(p.content)}{" "}
                    min read
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
