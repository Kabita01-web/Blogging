import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../componets/CommentSection.jsx";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
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
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data.data);
    } catch (err) {
      setError("Post not found");
    } finally {
      setLoading(false);
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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading)
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="text-center py-20">Loading...</div>
      </div>
    );
  if (error || !post)
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="text-center py-20 text-red-500">
          {error || "Post not found"}
        </div>
      </div>
    );

  const isAuthor = user?.id === post.author?._id;

  return (
    <div className="min-h-screen bg-stone-50">
      <article className="max-w-3xl mx-auto px-6 py-14">
        <div className="mb-8">
          <Link
            to="/"
            className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-indigo-600 transition"
          >
            ← Back to all posts
          </Link>
        </div>

        <h1 className="font-['Zilla_Slab'] text-5xl font-semibold text-stone-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 mt-4 pb-6 border-b border-stone-200">
          <span>By {post.author?.name || "Unknown"}</span>
          <span>·</span>
          <span>{formatDate(post.createdAt)}</span>
          {isAuthor && (
            <>
              <span>·</span>
              <Link
                to={`/edit/${post._id}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </Link>
              <button
                onClick={deletePost}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>

        <div
          className="font-['Lora'] text-stone-800 leading-relaxed text-lg mt-8 prose prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comment Section - Using the component */}
        <CommentSection postId={post._id} />
      </article>
    </div>
  );
}
