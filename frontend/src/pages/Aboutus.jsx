export default function Aboutus() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <div className="relative order-2 md:order-1">
        <div className="absolute -top-4 -left-4 w-full h-full bg-[var(--color-indigo-soft)] rounded-3xl" />
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80"
            alt="Person writing at a desk with a notebook and coffee"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Copy */}
      <div className="order-1 md:order-2">
        <span className="inline-block font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-indigo)] bg-[var(--color-indigo-soft)] px-3 py-1 rounded-full mb-6">
          About BlogNest
        </span>

        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold leading-tight mb-5 text-[var(--color-ink)]">
          A quieter place to write and read
        </h2>

        <p className="font-[var(--font-body)] text-base leading-relaxed text-[var(--color-muted)] mb-4">
          BlogNest is built for people who still believe in the written word —
          writers who want a clean space to publish without fighting a cluttered
          editor, and readers who want articles without the noise.
        </p>
        <p className="font-[var(--font-body)] text-base leading-relaxed text-[var(--color-muted)]">
          No algorithms deciding what you see, no engagement bait. Just writing,
          presented the way it deserves to be read.
        </p>
      </div>
    </section>
  );
}
