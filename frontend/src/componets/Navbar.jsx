import { useState } from "react";
import { Search, PenLine, Menu, X } from "lucide-react";

/**
 * Navbar
 * Top-level navigation for the blogging site.
 * Composed of three static sub-sections (Logo, SearchBar, AuthActions)
 * plus one dynamic piece of state: whether the mobile menu is open.
 */
export default function Navbar() {
  // Dynamic state: controls the mobile menu's open/closed state only.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        {/* Search bar: hidden on small screens, shown from md breakpoint up */}
        <div className="hidden flex-1 justify-center md:flex">
          <SearchBar />
        </div>

        {/* Desktop actions: hidden below md, shown from md up */}
        <div className="hidden items-center gap-2 md:flex">
          <AuthActions />
        </div>

        {/* Mobile menu toggle: only visible below md breakpoint */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile panel: search + actions, only rendered when menu is open */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="space-y-4 border-t border-slate-200 px-4 py-4 md:hidden"
        >
          <SearchBar />
          <div className="flex flex-col gap-2">
            <AuthActions stacked />
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * Logo
 * Static brand mark. Replace the text/link with your site's actual name and route.
 */
function Logo() {
  return (
    <a
      href="/"
      className="flex shrink-0 items-center gap-2 text-xl font-semibold tracking-tight text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-md"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white">
        <PenLine className="h-4 w-4" />
      </span>
      <span>BlogNest</span>
    </a>
  );
}

/**
 * SearchBar
 * Dynamic input for content discovery. Holds its own local state for the
 * query text; wire handleSubmit up to your routing/search logic.
 */
function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Replace with real navigation, e.g. navigate(`/search?q=${encodeURIComponent(query)}`)
    console.log("Searching for:", query);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="w-full max-w-md">
      <label htmlFor="site-search" className="sr-only">
        Search articles
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
      </div>
    </form>
  );
}

/**
 * AuthActions
 * Static set of primary navigation buttons: Write, Login, Signup.
 * `stacked` switches the layout to full-width vertical buttons for the mobile menu.
 */
function AuthActions({ stacked = false }) {
  const layout = stacked
    ? "flex flex-col gap-2 w-full"
    : "flex items-center gap-2";

  return (
    <div className={layout}>
      <a
        href="/write"
        className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
          stacked ? "w-full" : ""
        }`}
      >
        <PenLine className="h-4 w-4" />
        Write
      </a>
      <a
        href="/login"
        className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
          stacked ? "w-full" : ""
        }`}
      >
        Login
      </a>
      <a
        href="/register"
        className={`inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
          stacked ? "w-full" : ""
        }`}
      >
        Register
      </a>
    </div>
  );
}
