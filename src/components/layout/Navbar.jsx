import { useEffect, useState } from "react";
import { Command, FileText } from "lucide-react";
import { PROFILE } from "../../data/meta";
import { PAGES } from "../../data/pages";
import { useUI } from "../../context/UIContext";
import { useRouter } from "../../router/RouterContext";
import Link from "../../router/Link";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../common/ThemeToggle";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const NAV_PAGES = PAGES.filter((p) => p.id !== "home");

export default function Navbar() {
  const { setPaletteOpen, openResume } = useUI();
  const { page } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <header className={`nav${scrolled || menuOpen ? " is-solid" : ""}`}>
        <div className="nav__inner wrap">
          <Link to="/" className="nav__mark" onClick={() => setMenuOpen(false)} aria-label={`${PROFILE.name}, home`}>
            <span className="nav__mono">MI</span>
            <span className="nav__name">Mohammed Imad <i>Thotan</i></span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV_PAGES.map((n) => (
              <Link
                key={n.id}
                to={n.path}
                className={page.id === n.id ? "is-active" : undefined}
                aria-current={page.id === n.id ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <button className="kbd-btn" onClick={() => setPaletteOpen(true)} aria-label="Open command palette" aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}>
              <Command size={12} aria-hidden="true" />
              <span>{isMac ? "⌘K" : "Ctrl K"}</span>
            </button>
            <ThemeToggle />
            <button className="btn btn--primary btn--sm nav__cv" onClick={openResume}>
              <FileText size={13} aria-hidden="true" /> Résumé
            </button>
            <button
              className={`burger${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} activeId={page.id} onClose={() => setMenuOpen(false)} />
    </>
  );
}
