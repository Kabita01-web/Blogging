import { useState } from "react";
import api from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact", form); // adjust to your actual endpoint
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-full h-full bg-[var(--color-indigo-soft)] rounded-3xl" />
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&q=80"
            alt="Open notebook and pen on a desk"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Form */}
      <div>
        <span className="inline-block font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--color-indigo)] bg-[var(--color-indigo-soft)] px-3 py-1 rounded-full mb-6">
          Get in touch
        </span>

        <h1 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold leading-tight mb-4 text-[var(--color-ink)]">
          Have something to say?
        </h1>
        <p className="font-[var(--font-body)] text-base text-[var(--color-muted)] mb-8 leading-relaxed">
          Whether it's feedback, a question, or a story idea — we read every
          message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <div>
            <label
              htmlFor="message"
              className="font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[var(--color-rule)] bg-white/50 px-4 py-3 font-[var(--font-body)] focus:outline-none focus:border-[var(--color-indigo)] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-[var(--color-indigo)] text-white font-[var(--font-body)] font-medium px-6 py-3 rounded-full hover:bg-[var(--color-indigo-bright)] transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-[var(--color-indigo)]">
              Message sent — thanks for reaching out.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-700">
              Something went wrong. Try again in a moment.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-[var(--color-rule)] bg-white/50 px-4 py-3 font-[var(--font-body)] focus:outline-none focus:border-[var(--color-indigo)] transition-colors"
      />
    </div>
  );
}
