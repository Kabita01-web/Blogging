import { useEffect, useState } from "react";
import api from "../services/api";
import Hero from "../components/Hero";
import AboutSection from "../pages/Aboutus";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedBlogs from "../components/FeaturedBlogs";
import StatsBar from "../components/StatsBar";
import NewsletterSection from "../components/NewsletterSection";
import ContactCTA from "../components/ContactCTA";

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

  return (
    <>
      <Hero />
      <AboutSection />
      {!loading && (
        <>
          <FeaturedBlogs posts={posts} />
          <CategoriesSection posts={posts} />
          <StatsBar posts={posts} />
        </>
      )}
      <NewsletterSection />
      <ContactCTA />
    </>
  );
}
