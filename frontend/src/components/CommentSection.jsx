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

  if (loading)
    return (
      <div className="font-[var(--font-mono)] text-sm text-[var(--color-muted)]">
        Loading comments...
      </div>
    );

  return (
    <div className="mt-12 border-t border-[var(--color-rule)] pt-10">
      <h3 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-3 border border-[var(--color-rule)] bg-white/50 rounded-xl focus:ring-2 focus:ring-[var(--color-indigo-soft)] focus:border-[var(--color-indigo)] outline-none font-[var(--font-body)] resize-none transition-colors"
            rows={3}
            required
          />
          <button
            type="submit"
            className="font-[var(--font-mono)] text-xs tracking-[0.15em] uppercase bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-bright)] text-white px-5 py-2 rounded-full mt-2 transition-colors"
          >
            Post comment
          </button>
        </form>
      ) : (
        <p className="text-[var(--color-muted)] mb-6 font-[var(--font-body)] italic">
          <Link
            to="/login"
            className="text-[var(--color-indigo)] hover:underline font-medium not-italic"
          >
            Log in
          </Link>{" "}
          to join the conversation.
        </p>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-[var(--color-muted)] font-[var(--font-body)] italic">
            No comments yet. Be the first!
          </p>
        )}
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white/50 border border-[var(--color-rule)] rounded-xl p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-[var(--font-mono)] text-sm font-medium text-[var(--color-ink)]">
                  {comment.author?.name || "Unknown"}
                </span>
                <span className="text-xs text-[var(--color-muted)] ml-3">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              {user?.id === comment.author?._id && (
                <button
                  onClick={() => deleteComment(comment._id)}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="font-[var(--font-body)] text-[var(--color-ink)] mt-1.5">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
