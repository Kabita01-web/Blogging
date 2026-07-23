import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="rounded-3xl bg-[var(--color-indigo-soft)] px-8 py-14 text-center">
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold text-[var(--color-ink)] mb-4">
          Have a question, or something to say?
        </h2>
        <p className="font-[var(--font-body)] text-[var(--color-muted)] mb-8 max-w-md mx-auto">
          We read every message that comes through.
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 bg-[var(--color-indigo)] text-white font-[var(--font-body)] font-medium px-6 py-3 rounded-full hover:bg-[var(--color-indigo-bright)] transition-colors"
        >
          Get in touch
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
