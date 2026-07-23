import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] mt-20 border-t border-[var(--color-paper)]/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="font-[var(--font-display)] text-3xl font-bold mb-4">
              BlogNest
            </h2>

            <p className="text-sm leading-7 text-[var(--color-paper)]/70">
              A calm space for thoughtful writing, meaningful stories, and
              discovering ideas without distractions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Navigation</h3>

            <ul className="space-y-3 text-sm text-[var(--color-paper)]/70">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/blogs"
                  className="hover:text-white transition-colors"
                >
                  All Posts
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Resources</h3>

            <ul className="space-y-3 text-sm text-[var(--color-paper)]/70">
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-white transition-colors"
                >
                  Latest Articles
                </Link>
              </li>

              <li>
                <Link
                  to="/aboutus"
                  className="hover:text-white transition-colors"
                >
                  Our Mission
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Get in Touch</h3>

            <p className="text-sm text-[var(--color-paper)]/70 leading-7">
              Have questions or want to collaborate?
            </p>

            <a
              href="mailto:hello@blognest.com"
              className="inline-block mt-5 rounded-lg bg-[var(--color-indigo)] px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-[var(--color-paper)]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-paper)]/50">
          <p>© {new Date().getFullYear()} BlogNest. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>

            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>

            <Link to="/blogs" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
