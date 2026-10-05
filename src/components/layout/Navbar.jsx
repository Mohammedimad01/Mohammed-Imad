import { useEffect, useState } from "react";
import { Command, FileText } from "lucide-react";
import { NAV, PROFILE } from "../../data/meta";
import { useUI } from "../../context/UIContext";
import { scrollToId } from "../../lib/actions";
import MobileMenu from "./MobileMenu";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export default function Navbar({ active }) {
  const { setPaletteOpen, openResume } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className={`nav${scrolled || menuOpen ? " is-solid" : ""}`}>
        <div className="nav__inner wrap">
          <a href="#top" className="nav__mark" onClick={(e) => go(e, "top")} aria-label={`${PROFILE.name}, back to top`}>
            <span className="nav__mono">MI</span>
            <span className="nav__name">Mohammed Imad <i>Thotan</i></span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => go(e, n.id)}
                className={active === n.id ? "is-active" : undefined}
                aria-current={active === n.id ? "location" : undefined}
              >
                <span className="nav__idx">0{i + 1}</span>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button className="kbd-btn" onClick={() => setPaletteOpen(true)} aria-label="Open command palette" aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}>
              <Command size={12} aria-hidden="true" />
              <span>{isMac ? "⌘K" : "Ctrl K"}</span>
            </button>
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
      <MobileMenu open={menuOpen} active={active} onNavigate={go} onClose={() => setMenuOpen(false)} />
    </>
  );
}
