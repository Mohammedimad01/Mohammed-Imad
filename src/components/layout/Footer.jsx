import { ArrowUp } from "lucide-react";
import { PROFILE, CONTACT } from "../../data/meta";
import { PALETTES, usePrefs } from "../../context/PrefsContext";
import { PAGES } from "../../data/pages";
import Link from "../../router/Link";
import { useHydrated } from "../../hooks/useHydrated";

export default function Footer() {
  const { palette, setPalette } = usePrefs();
  // Saved palette lives in localStorage; match the pre-rendered default until hydrated.
  const shown = useHydrated() ? palette : PALETTES[0].id;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__sig">
          <span className="footer__name">{PROFILE.name}</span>
          <span className="footer__line">Strategy · Analytics · Technology</span>
        </div>

        <fieldset className="swatches">
          <legend>Palette</legend>
          {PALETTES.map((p) => (
            <label key={p.id} className="swatch" title={p.name}>
              <input type="radio" name="palette" value={p.id} checked={shown === p.id} onChange={() => setPalette(p.id)} />
              <span className="swatch__chip" aria-hidden="true">
                <i style={{ background: p.swatch[0] }} />
                <i style={{ background: p.swatch[2] }} />
              </span>
              <span className="sr-only">{p.name}</span>
            </label>
          ))}
        </fieldset>

        <div className="footer__links">
          <a href={`mailto:${CONTACT.email}`}>Email</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <button className="icon-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
      <div className="wrap footer__base">
        <span>© {year} {PROFILE.name}</span>
        <nav className="footer__pages" aria-label="Footer">
          {PAGES.map((p) => (
            <Link key={p.id} to={p.path}>{p.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
