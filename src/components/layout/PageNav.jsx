import { ArrowLeft, ArrowRight } from "lucide-react";
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
    <nav className="pnav wrap" aria-label="Pages">
      {prev ? (
        <Link to={prev.path} className="pnav__link">
          <small>
            <ArrowLeft size={12} aria-hidden="true" /> Previous
          </small>
          <span>{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={next.path} className="pnav__link pnav__link--next">
          <small>
            Next <ArrowRight size={12} aria-hidden="true" />
          </small>
          <span>{next.label}</span>
        </Link>
      )}
    </nav>
  );
}
