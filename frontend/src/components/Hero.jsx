import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Static hero — introduces BlogNest itself rather than pulling from posts.
 * No backend data required.
 */
export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
      {/* Left: content */}
      <div className="animate-fade-up">
        <span className="inline-block font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-indigo)] bg-[var(--color-indigo-soft)] px-3 py-1 rounded-full mb-6">
          Welcome to BlogNest
        </span>

        <h1 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold leading-[1.05] mb-6 text-[var(--color-ink)]">
          Where writing finds its home
        </h1>

        <p className="font-[var(--font-body)] text-lg leading-relaxed text-[var(--color-muted)] mb-8">
          A calm, uncluttered space to write, publish, and read — built for
          people who care more about the words than the algorithm.
        </p>

        <Link
          to="/register"
          className="group inline-flex items-center gap-2 bg-[var(--color-indigo)] text-white font-[var(--font-body)] font-medium px-6 py-3 rounded-full hover:bg-[var(--color-indigo-bright)] transition-colors"
        >
          Start writing
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Right: layered image */}
      <div className="relative animate-fade-up">
        <div className="absolute -top-4 -right-4 w-full h-full bg-[var(--color-indigo)] rounded-3xl" />
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900&q=80"
            alt="Open notebook and laptop on a writing desk"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating stat card */}
        <div className="absolute -bottom-6 -left-6 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-2xl shadow-[var(--shadow-card)] px-5 py-4 max-w-[200px]">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-indigo)] mb-1">
            No noise
          </p>
          <p className="font-[var(--font-body)] text-sm text-[var(--color-ink)] font-medium leading-snug">
            Just writing, done well
          </p>
        </div>
      </div>
    </section>
  );
}
