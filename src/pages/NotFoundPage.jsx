import { ChevronRight } from "lucide-react";
import { PAGES } from "../data/pages";
import Link from "../router/Link";

export default function NotFoundPage() {
  return (
    <section className="section section--page nf" aria-labelledby="nf-title">
      <div className="wrap">
        <p className="nf__code" aria-hidden="true">404</p>
        <h1 className="sec-head__title" id="nf-title">
          This page <span className="sec-head__accent">doesn&apos;t exist.</span>
        </h1>
        <p className="sec-head__lede">The link may be old or mistyped. Here&apos;s everything that does:</p>
        <ul className="nf__links">
          {PAGES.map((p) => (
            <li key={p.id}>
              <Link to={p.path}>
                {p.label} <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
