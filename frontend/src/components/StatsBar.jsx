import { motion } from "framer-motion";

export default function StatsBar({ posts = [] }) {
  const authorCount = new Set(posts.map((p) => p.author?._id).filter(Boolean))
    .size;

  const stats = [
    { label: "Stories published", value: posts.length },
    { label: "Writers", value: authorCount },
    {
      label: "Categories",
      value: new Set(posts.map((p) => p.category).filter(Boolean)).size,
    },
  ];

  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-3 gap-6 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <p className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-[var(--color-indigo-bright)]">
              {s.value}
            </p>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] mt-2 text-[var(--color-paper)]/70">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
