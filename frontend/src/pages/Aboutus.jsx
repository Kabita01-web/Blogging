import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative order-2 md:order-1"
      >
        <div className="absolute -top-4 -left-4 w-full h-full bg-[var(--color-indigo-soft)] rounded-3xl" />
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80"
            alt="Person writing at a desk with a notebook and coffee"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Copy */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
        className="order-1 md:order-2"
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="inline-block font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-indigo)] bg-[var(--color-indigo-soft)] px-3 py-1 rounded-full mb-6"
        >
          About BlogNest
        </motion.span>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="font-[var(--font-display)] text-3xl md:text-4xl font-bold leading-tight mb-5 text-[var(--color-ink)]"
        >
          A quieter place to write and read
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="font-[var(--font-body)] text-base leading-relaxed text-[var(--color-muted)] mb-4"
        >
          BlogNest is built for people who still believe in the written word —
          writers who want a clean space to publish without fighting a cluttered
          editor, and readers who want articles without the noise.
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="font-[var(--font-body)] text-base leading-relaxed text-[var(--color-muted)]"
        >
          No algorithms deciding what you see, no engagement bait. Just writing,
          presented the way it deserves to be read.
        </motion.p>
      </motion.div>
    </section>
  );
}
