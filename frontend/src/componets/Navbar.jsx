import { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ← single source of truth
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // delete the old useEffect that read localStorage into local `user` state

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout(); // ← use context's logout, not a local copy
    navigate("/");
  };

  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const navLinkClass = ({ isActive }) =>
    `font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase transition-colors pb-1 border-b ${
      isActive
        ? "text-indigo-700 border-indigo-700"
        : "text-stone-500 border-transparent hover:text-stone-900 hover:border-stone-300"
    }`;

  return (
    <nav
      className={`bg-stone-50/90 backdrop-blur sticky top-0 z-50 border-b transition-shadow ${
        scrolled
          ? "border-stone-300 shadow-[0_1px_0_0_rgba(28,25,23,0.04)]"
          : "border-stone-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-['Zilla_Slab'] text-2xl font-semibold text-stone-900 group-hover:text-indigo-700 transition-colors">
              Scribble
            </span>
            <span className="hidden sm:inline font-['IBM_Plex_Mono'] text-[10px] tracking-[0.2em] uppercase text-stone-400">
              Est. 2026
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
                <Link
                  to="/create"
                  className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-stone-900 hover:bg-indigo-700 text-stone-50 px-4 py-2 transition-colors"
                >
                  Write
                </Link>
                <div className="flex items-center gap-3 pl-3 ml-1 border-l border-stone-200">
                  <div
                    className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-['IBM_Plex_Mono'] font-semibold shrink-0"
                    title={user.name}
                  >
                    {initials(user.name)}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-stone-900 hover:bg-indigo-700 text-stone-50 px-4 py-2 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="md:hidden text-stone-600 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm p-1"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-1 py-4 border-t border-stone-200">
            <Link
              to="/"
              className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-indigo-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {user ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-['IBM_Plex_Mono'] font-semibold">
                    {initials(user.name)}
                  </div>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-stone-500">
                    {user.name}
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-indigo-700 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/create"
                  className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-stone-900 text-stone-50 px-4 py-2.5 text-center transition-colors mt-1"
                  onClick={() => setIsOpen(false)}
                >
                  Write
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-red-700 text-left transition-colors py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-indigo-700 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="font-['IBM_Plex_Mono'] text-xs tracking-[0.15em] uppercase bg-stone-900 text-stone-50 px-4 py-2.5 text-center transition-colors mt-1"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
