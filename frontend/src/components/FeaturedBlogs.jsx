import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturedBlogs({ posts = [] }) {
  const shown = posts.slice(0, 4);

  if (!shown.length) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="font-[var(--font-body)] text-[var(--color-muted)]">
          No posts yet — the first one you publish will show up here.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-[var(--font-display)] text-2xl font-bold">
          More stories
        </h2>
        <Link
          to="/blogs"
          className="ink-link font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-indigo)]"
        >
          View all posts →
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {shown.map((post) => {
          {
            /* ...rest stays exactly the same, just posts.map → shown.map */
          }
          const image = post.coverImage || post.image || post.thumbnail;
          const category = post.category || post.tags?.[0] || "Story";
          const link = `/posts/${post.slug || post._id}`;

          return (
            <motion.article
              key={post._id}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] overflow-hidden"
            >
              <Link to={link} className="block relative">
                <div className="aspect-[3/4] overflow-hidden bg-[var(--color-indigo-soft)]">
                  {image && (
                    <motion.img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>
                <span className="absolute top-3 left-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-indigo)] bg-white/90 backdrop-blur px-2.5 py-1 rounded-full">
                  {category}
                </span>
              </Link>

              <div className="p-4">
                <h3 className="font-[var(--font-display)] text-base font-semibold leading-snug">
                  <Link to={link} className="ink-link">
                    {post.title}
                  </Link>
                </h3>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
