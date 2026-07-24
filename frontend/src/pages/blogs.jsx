import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(7); // 1 featured + 6 grid, then load more

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

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All", ...set];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        !query.trim() ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        stripHtml(p.content).toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  const [featured, ...rest] = filtered;
  const shown = rest.slice(0, visible - 1);
  const hasMore = rest.length > shown.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="max-w-6xl mx-auto px-6 py-14 animate-pulse">
          <div className="h-10 w-48 bg-[var(--color-indigo-soft)] rounded-sm mb-4" />
          <div className="h-4 w-96 bg-[var(--color-indigo-soft)] rounded-sm mb-10" />
          <div className="h-64 bg-[var(--color-indigo-soft)] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-paper)] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="font-[var(--font-mono)] text-xs tracking-[0.2em] uppercase text-red-700 mb-3">
            Couldn't load posts
          </p>
          <p className="font-[var(--font-body)] italic text-[var(--color-muted)] mb-6">
            {error}
          </p>
          <button
            onClick={() => {
              setLoading(true);
              setError("");
              fetchPosts();
            }}
            className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--color-rule)] text-[var(--color-ink)] px-5 py-2.5 rounded-full hover:bg-[var(--color-indigo-soft)] transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-[var(--font-display)] text-5xl font-bold text-[var(--color-ink)] mb-4">
            The Archive
          </h1>
          <p className="font-[var(--font-body)] text-[var(--color-muted)] max-w-xl leading-relaxed">
            Every entry BlogNest writers have published — searchable,
            filterable, and always growing.
          </p>
        </div>

        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-rule)] pb-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] px-4 py-2 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--color-indigo)] border-[var(--color-indigo)] text-white"
                    : "border-[var(--color-rule)] text-[var(--color-muted)] hover:border-[var(--color-indigo)] hover:text-[var(--color-indigo)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-[var(--color-rule)] bg-white/50 font-[var(--font-body)] text-sm focus:outline-none focus:border-[var(--color-indigo)] transition-colors"
            />
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="border border-dashed border-[var(--color-rule)] rounded-2xl py-20 text-center">
            <p className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] mb-2">
              Nothing matches
            </p>
            <p className="font-[var(--font-body)] italic text-[var(--color-muted)]">
              Try a different search or category.
            </p>
          </div>
        )}

        {/* Featured lead post */}
        {featured && (
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 items-center mb-16 pb-16 border-b border-[var(--color-rule)]"
          >
            <Link
              to={`/posts/${featured._id}`}
              className="block rounded-2xl overflow-hidden bg-[var(--color-indigo-soft)] shadow-[var(--shadow-card)] max-h-[500px]"
            >
              {featured.coverImage || featured.image ? (
                <img
                  src={featured.coverImage || featured.image}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="aspect-[4/3] flex items-center justify-center font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-indigo)]">
                  Cover image
                </div>
              )}
            </Link>
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-indigo)] mb-3">
                Featured
                {featured.category ? ` \u00b7 ${featured.category}` : ""}
              </p>
              <Link to={`/posts/${featured._id}`}>
                <h2 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-ink)] leading-tight mb-4 hover:text-[var(--color-indigo)] transition-colors">
                  {featured.title}
                </h2>
              </Link>
              <p className="font-[var(--font-body)] text-[var(--color-muted)] leading-relaxed mb-4">
                {stripHtml(featured.content).substring(0, 180)}…
              </p>
              <div className="flex items-center gap-3 font-[var(--font-mono)] text-xs text-[var(--color-muted)]">
                <span>By {featured.author?.name || "Unknown"}</span>
                <span>·</span>
                <span>{readingTime(featured.content)}</span>
              </div>
            </div>
          </motion.article>
        )}

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {shown.map((post) => (
            <motion.article
              key={post._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <Link
                to={`/posts/${post._id}`}
                className="block aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-indigo-soft)] mb-4"
              >
                {(post.coverImage || post.image) && (
                  <img
                    src={post.coverImage || post.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </Link>
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--color-indigo)] mb-2">
                {post.category || "Essay"}
              </p>
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)] leading-snug mb-2">
                <Link to={`/posts/${post._id}`} className="ink-link">
                  {post.title}
                </Link>
              </h3>
              <div className="flex items-center gap-2 font-[var(--font-mono)] text-[11px] text-[var(--color-muted)]">
                <span>{post.author?.name || "Unknown"}</span>
                <span>·</span>
                <span>{readingTime(post.content)}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-14">
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase border border-[var(--color-rule)] text-[var(--color-ink)] px-8 py-3 rounded-full hover:bg-[var(--color-indigo-soft)] transition-colors"
            >
              Load more entries
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
