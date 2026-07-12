import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
    }
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`);
      setComments(data.data);
    } catch (err) {
      console.log("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await api.post(`/posts/${postId}/comments`, {
        content: newComment,
      });
      setComments([data.data, ...comments]);
      setNewComment("");
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  const deleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.delete(`/posts/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) return <div className="text-stone-400">Loading comments...</div>;

  return (
    <div className="mt-12 border-t border-stone-200 pt-10">
      <h3 className="font-['Zilla_Slab'] text-2xl font-semibold text-stone-900 mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-['Lora'] resize-none"
            rows={3}
            required
          />
          <button
            type="submit"
            className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg mt-2 transition"
          >
            Post comment
          </button>
        </form>
      ) : (
        <p className="text-stone-500 mb-6 font-['Lora'] italic">
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium not-italic"
          >
            Log in
          </Link>{" "}
          to join the conversation.
        </p>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-stone-400 font-['Lora'] italic">
            No comments yet. Be the first!
          </p>
        )}
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white border border-stone-200 rounded-lg p-4 hover:shadow-sm transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-['IBM_Plex_Mono'] text-sm font-medium text-stone-700">
                  {comment.author?.name || "Unknown"}
                </span>
                <span className="text-xs text-stone-400 ml-3">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              {user?.id === comment.author?._id && (
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="text-xs text-red-400 hover:text-red-600 transition"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="font-['Lora'] text-stone-700 mt-1.5">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
