import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend route for this yet — placeholder success state for now
    setStatus("sent");
    setEmail("");
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-20 text-center">
      <span className="inline-block font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-indigo)] bg-[var(--color-indigo-soft)] px-3 py-1 rounded-full mb-6">
        Stay in the loop
      </span>
      <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)] mb-4">
        Get new stories in your inbox
      </h2>
      <p className="font-[var(--font-body)] text-[var(--color-muted)] mb-8">
        No spam — just the occasional email when something worth reading goes
        up.
      </p>

      {status === "sent" ? (
        <p className="font-[var(--font-body)] text-[var(--color-indigo)]">
          You're on the list — thanks for subscribing.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-full border border-[var(--color-rule)] bg-white/50 font-[var(--font-body)] focus:outline-none focus:border-[var(--color-indigo)] transition-colors"
          />
          <button
            type="submit"
            className="bg-[var(--color-indigo)] text-white font-[var(--font-body)] font-medium px-6 py-3 rounded-full hover:bg-[var(--color-indigo-bright)] transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
