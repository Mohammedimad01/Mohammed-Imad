import { ArrowRight } from "lucide-react";
import { PAGES } from "../data/pages";
import Link from "../router/Link";

export default function NotFoundPage() {
  return (
    <section className="section nf" aria-labelledby="nf-title">
      <div className="wrap">
        <p className="nf__code" aria-hidden="true">404</p>
        <h1 className="sec-head__title" id="nf-title">
          This page <em>doesn&apos;t exist.</em>
        </h1>
        <p className="sec-head__lede">The link may be old or mistyped. Here&apos;s everything that does:</p>
        <ul className="nf__links">
          {PAGES.map((p) => (
            <li key={p.id}>
              <Link to={p.path}>
                {p.label} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
