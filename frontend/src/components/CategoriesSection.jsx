import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Browse-by-category grid. Pulls unique categories from the posts already
 * fetched on Home — no extra API call needed.
 */
export default function CategoriesSection({ posts = [] }) {
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  if (!categories.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[var(--color-rule)]">
      <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] mb-10">
        Browse by category
      </h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {categories.map((cat) => {
          const count = posts.filter((p) => p.category === cat).length;
          return (
            <motion.div
              key={cat}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={`/blogs?category=${encodeURIComponent(cat)}`}
                className="block rounded-2xl border border-[var(--color-rule)] bg-white/40 p-6 hover:border-[var(--color-indigo)] hover:shadow-[var(--shadow-card)] transition-all"
              >
                <p className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-ink)] mb-1">
                  {cat}
                </p>
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
                  {count} {count === 1 ? "post" : "posts"}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
