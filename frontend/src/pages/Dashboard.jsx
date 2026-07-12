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
      <div className="min-h-screen bg-stone-50">
        <div className="text-center py-20">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex justify-between items-center border-b border-stone-300 pb-6 mb-8">
          <div>
            <h1 className="font-['Zilla_Slab'] text-4xl font-semibold text-stone-900">
              Dashboard
            </h1>
            <p className="font-['Lora'] italic text-stone-500 mt-1">
              Your published entries
            </p>
          </div>
          <Link
            to="/create"
            className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded transition"
          >
            + New post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="border border-dashed border-stone-300 rounded-sm py-20 text-center">
            <p className="font-['Zilla_Slab'] text-2xl text-stone-700 mb-2">
              No posts yet
            </p>
            <p className="font-['Lora'] italic text-stone-500">
              Write your first post and share it with the world.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-stone-200 rounded p-6 flex justify-between items-center hover:shadow-sm transition"
              >
                <div>
                  <Link
                    to={`/posts/${post._id}`}
                    className="font-['Zilla_Slab'] text-xl font-semibold text-stone-900 hover:text-indigo-600 transition"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-stone-400 font-['IBM_Plex_Mono'] mt-1">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/edit/${post._id}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 px-3 py-1 border border-indigo-200 rounded hover:bg-indigo-50 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-sm text-red-500 hover:text-red-700 px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition"
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
