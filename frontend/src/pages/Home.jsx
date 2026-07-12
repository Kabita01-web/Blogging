import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Home() {
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

  // ---------- Loading ----------
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-5xl mx-auto px-6 py-14 animate-pulse">
          <div className="mb-14 border-b border-stone-300 pb-6">
            <div className="h-3 w-40 bg-stone-200 rounded-sm mb-4" />
            <div className="h-12 w-64 bg-stone-200 rounded-sm mb-3" />
            <div className="h-4 w-80 bg-stone-200 rounded-sm" />
          </div>
          <div className="h-8 w-32 bg-stone-200 rounded-sm mb-4" />
          <div className="h-10 w-3/4 bg-stone-200 rounded-sm mb-4" />
          <div className="h-4 w-full bg-stone-200 rounded-sm mb-2" />
          <div className="h-4 w-5/6 bg-stone-200 rounded-sm" />
        </div>
      </div>
    );
  }

  // ---------- Error ----------
  if (error) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-sm">
            <p className="font-['IBM_Plex_Mono'] text-xs tracking-[0.2em] uppercase text-red-700 mb-3">
              Printing Error
            </p>
            <p className="font-['Lora'] italic text-stone-600 mb-6">
              {error}. The press jammed somewhere between the server and the
              page.
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setError("");
                fetchPosts();
              }}
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase border border-stone-400 text-stone-700 px-5 py-2.5 hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Masthead */}
        <header className="mb-14">
          <div className="flex items-baseline justify-between border-t-2 border-b border-stone-900 pt-2 pb-2 mb-1">
            <p className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.2em] uppercase text-indigo-600">
              {formatDate(new Date())}
            </p>
            <p className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.2em] uppercase text-stone-400">
              Vol. I · No. {posts.length || 1}
            </p>
          </div>
          <div className="border-b border-stone-300 pb-6 pt-4">
            <h1 className="font-['Zilla_Slab'] text-5xl sm:text-6xl font-semibold text-stone-900 tracking-tight">
              BlogNEST
            </h1>
            <p className="font-['Lora'] italic text-stone-500 mt-2 text-lg">
              Notes, essays, and things worth writing down.
            </p>
          </div>
        </header>

        {posts.length === 0 ? (
          <div className="border border-dashed border-stone-300 rounded-sm py-20 text-center">
            <p className="font-['Zilla_Slab'] text-2xl text-stone-700 mb-2">
              The page is blank.
            </p>
            <p className="font-['Lora'] italic text-stone-500 mb-6">
              Be the first to fill it.
            </p>
            <Link
              to="/write"
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-50 bg-stone-900 px-5 py-2.5 hover:bg-indigo-700 transition-colors"
            >
              Start writing
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured post */}
            {featured && (
              <article className="border-b border-stone-200 pb-12 animate-[fadeIn_0.5s_ease-out]">
                <p className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-indigo-600 mb-3">
                  Featured
                </p>
                <Link to={`/posts/${featured._id}`} className="group block">
                  <h2 className="font-['Zilla_Slab'] text-4xl sm:text-5xl font-semibold text-stone-900 leading-tight transition-colors">
                    <span className="bg-gradient-to-r from-stone-900 to-stone-900 group-hover:from-indigo-700 group-hover:to-indigo-700 bg-[length:0%_1px] group-hover:bg-[length:100%_1px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 pb-1">
                      {featured.title}
                    </span>
                  </h2>
                </Link>
                <p className="font-['Lora'] text-lg text-stone-600 leading-relaxed mt-4 max-w-2xl first-letter:font-['Zilla_Slab'] first-letter:text-5xl first-letter:font-semibold first-letter:text-stone-900 first-letter:mr-1 first-letter:float-left">
                  {stripHtml(featured.content).substring(0, 280)}…
                </p>
                <div className="font-['IBM_Plex_Mono'] text-xs text-stone-400 mt-5 flex flex-wrap gap-3 items-center">
                  <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[10px] font-semibold">
                    {initials(featured.author?.name)}
                  </span>
                  <span>{featured.author?.name || "Unknown"}</span>
                  <span className="text-stone-300">·</span>
                  <span>{formatDate(featured.createdAt)}</span>
                  <span className="text-stone-300">·</span>
                  <span>{readingTime(featured.content)}</span>
                </div>
              </article>
            )}

            {/* Rest of the posts */}
            {rest.length > 0 && (
              <div>
                <p className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-400 mb-6">
                  More entries
                </p>
                <div className="divide-y divide-stone-200">
                  {rest.map((post) => (
                    <article
                      key={post._id}
                      className="py-7 grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 items-baseline group"
                    >
                      <div>
                        <Link to={`/posts/${post._id}`}>
                          <h3 className="font-['Zilla_Slab'] text-2xl font-semibold text-stone-900 group-hover:text-indigo-700 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="font-['Lora'] text-stone-500 mt-1.5 leading-relaxed">
                          {stripHtml(post.content).substring(0, 130)}…
                        </p>
                        <p className="font-['IBM_Plex_Mono'] text-[11px] text-stone-400 mt-2">
                          {readingTime(post.content)}
                        </p>
                      </div>
                      <div className="font-['IBM_Plex_Mono'] text-xs text-stone-400 whitespace-nowrap sm:text-right">
                        <div>{post.author?.name || "Unknown"}</div>
                        <div>{formatDate(post.createdAt)}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
