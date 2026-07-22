import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)] sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--color-ink)]"
        >
          BlogNest
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 font-[var(--font-mono)] text-xs uppercase tracking-[0.15em]">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `ink-link pb-1 ${isActive ? "text-[var(--color-indigo)]" : "text-[var(--color-ink)]"}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {token ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className="ink-link pb-1 text-[var(--color-ink)]"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <Link
                  to="/create"
                  className="bg-[var(--color-indigo)] text-white px-4 py-2 rounded-full hover:bg-[var(--color-indigo-bright)] transition-colors"
                >
                  Write
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="ink-link text-[var(--color-ink)]"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="ink-link pb-1 text-[var(--color-ink)]"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-[var(--color-indigo)] text-white px-4 py-2 rounded-full hover:bg-[var(--color-indigo-bright)] transition-colors"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--color-ink)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] border-t border-[var(--color-rule)] pt-4">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className="ink-link"
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          {token ? (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="ink-link"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <Link
                  to="/create"
                  onClick={() => setOpen(false)}
                  className="inline-block bg-[var(--color-indigo)] text-white px-4 py-2 rounded-full w-fit"
                >
                  Write
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="ink-link text-left"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="ink-link"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="inline-block bg-[var(--color-indigo)] text-white px-4 py-2 rounded-full w-fit"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}
