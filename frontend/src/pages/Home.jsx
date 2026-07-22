import { useEffect, useState } from "react";
import api from "../services/api";
import Hero from "../components/Hero";
import FeaturedBlogs from "../components/FeaturedBlogs";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.error("Failed to load posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center font-[var(--font-mono)] text-sm text-[var(--color-muted)]">
        Loading…
      </div>
    );
  }

  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <>
      <Hero posts={featured} />
      <FeaturedBlogs posts={rest} />
    </>
  );
}
