import { PROFILE, CONTACT } from "../../data/meta";
import { PAGES } from "../../data/pages";
import Link from "../../router/Link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__sig">
            <span className="footer__name">{PROFILE.name}</span>
            <span className="footer__line">{PROFILE.headline} · {PROFILE.location}</span>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            <div>
              <h2 className="footer__h">Explore</h2>
              <ul>
                {PAGES.map((p) => (
                  <li key={p.id}><Link to={p.path}>{p.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__h">Connect</h2>
              <ul>
                <li><a href={`mailto:${CONTACT.email}`}>Email</a></li>
                <li><a href={CONTACT.phoneHref}>Phone</a></li>
                <li><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="footer__base">
          <span>Copyright © {year} {PROFILE.name}. All rights reserved.</span>
          <button className="footer__top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
