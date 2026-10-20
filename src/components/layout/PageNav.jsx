import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGES } from "../../data/pages";
import { useRouter } from "../../router/RouterContext";
import Link from "../../router/Link";

// "Previous / Next page" at the foot of every page, in nav order, so the
// site reads like a short book and every page links onward (good for crawl).
export default function PageNav() {
  const { page } = useRouter();
  const i = PAGES.findIndex((p) => p.id === page.id);
  if (i < 0) return null;
  const prev = PAGES[i - 1];
  const next = PAGES[i + 1];

  return (
    <nav className="pnav" aria-label="Pages">
      <div className="wrap pnav__inner">
        {prev ? (
          <Link to={prev.path} className="pnav__link">
            <small>Previous</small>
            <span><ChevronLeft size={20} strokeWidth={2} aria-hidden="true" /> {prev.label}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={next.path} className="pnav__link pnav__link--next">
            <small>Next</small>
            <span>{next.label} <ChevronRight size={20} strokeWidth={2} aria-hidden="true" /></span>
          </Link>
        )}
      </div>
    </nav>
  );
}
