import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)] mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="font-[var(--font-display)] text-lg font-semibold">
            BlogNest
          </p>
          <p className="font-[var(--font-body)] text-sm text-[var(--color-muted)] mt-1">
            A quieter place to write and read.
          </p>
        </div>

        <ul className="flex gap-6 font-[var(--font-mono)] text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
          <li>
            <Link to="/about" className="ink-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="ink-link">
              Contact
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/Kabita01-web/Blogging"
              className="ink-link"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>

      <p className="font-[var(--font-mono)] text-xs text-center text-[var(--color-muted)] pb-6">
        © {new Date().getFullYear()} BlogNest
      </p>
    </footer>
  );
}
