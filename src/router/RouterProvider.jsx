import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RouterContext } from "./RouterContext";
import { pageMeta, projectIdFromPath, resolveRoute, SITE } from "../seo/site.js";

// A small History-API router. Two ideas:
//  • `path` is the real URL; `base` is the page drawn on screen. They differ
//    only while a case study (/work/<id>/) is open over another page.
//  • Each history entry remembers its scroll position, so Back/Forward land
//    where you were. Scroll/focus are applied by settle(), which the page
//    transition calls once the outgoing page has faded out.

const pageOf = (path) => resolveRoute(path).page;
const baseFor = (path, stateBase) => (projectIdFromPath(path) ? stateBase || "/work/" : pageOf(path).path);

function syncHead(path) {
  const m = pageMeta(path);
  const url = `${SITE}${m.path}`;
  document.title = m.title;
  const set = (sel, attr, val) => document.querySelector(sel)?.setAttribute(attr, val);
  set('meta[name="description"]', "content", m.description);
  set('link[rel="canonical"]', "href", url);
  set('meta[property="og:url"]', "content", url);
  set('meta[property="og:title"]', "content", m.title);
  set('meta[property="og:description"]', "content", m.description);
  set('meta[property="og:type"]', "content", m.ogType);
  set('meta[name="twitter:title"]', "content", m.title);
  set('meta[name="twitter:description"]', "content", m.description);
  set('meta[property="og:image"]', "content", m.image);
  set('meta[name="twitter:image"]', "content", m.image);
  set('meta[property="og:image:alt"]', "content", m.imageAlt);
}

function scrollToHash(hash) {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  el.scrollIntoView({ block: "start" });
  return true;
}

export default function RouterProvider({ initialPath = "/", children }) {
  // Never trust history.state for the first render: it must match the
  // pre-rendered HTML, which only knows the URL.
  const [route, setRoute] = useState(() => ({ path: initialPath, base: baseFor(initialPath, null) }));
  const pending = useRef(null);
  const firstHead = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.history.replaceState({ ...window.history.state, base: baseFor(window.location.pathname, null) }, "");
    const onPop = () => {
      const state = window.history.state || {};
      const path = window.location.pathname;
      const base = baseFor(path, state.base);
      setRoute((prev) => {
        // Only a change of page triggers a transition (and settle()). Opening
        // or closing a case study over the same page must leave scroll alone.
        pending.current = prev.base === base ? null : { scroll: state.scroll ?? 0, hash: window.location.hash };
        return { path, base };
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (firstHead.current) {
      firstHead.current = false;
      // Pre-rendered HTML built for this URL already has the right head; a
      // host fallback (or the dev server) doesn't.
      const builtFor = document.getElementById("root")?.dataset.route;
      if (builtFor && pageMeta(builtFor).path === pageMeta(route.path).path) return;
    }
    syncHead(route.path);
  }, [route.path]);

  const navigate = useCallback(
    (to, { replace = false } = {}) => {
      const [pathPart, hashPart] = to.split("#");
      const path = pathPart || route.path;
      const hash = hashPart ? `#${hashPart}` : "";
      const isCase = !!projectIdFromPath(path);
      const base = isCase ? route.base : pageOf(path).path;
      const current = window.history.state || {};

      // Remember where we were on the page we're leaving.
      window.history.replaceState({ ...current, scroll: window.scrollY }, "");

      if (replace) {
        window.history.replaceState({ ...current, base, scroll: 0 }, "", path + hash);
      } else {
        // viaPage: this case study was opened from a page of this site, so
        // closing it can simply go back.
        window.history.pushState({ base, scroll: 0, viaPage: isCase }, "", path + hash);
      }

      if (base === route.base) {
        // Same page underneath: no transition, just honour an anchor or go up.
        if (!isCase && path === route.path) {
          if (!scrollToHash(hash)) window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        pending.current = { scroll: 0, hash, focus: true };
      }
      setRoute({ path, base });
    },
    [route]
  );

  // Called by the page transition after the old page has left.
  const settle = useCallback(() => {
    const p = pending.current;
    pending.current = null;
    if (!p) return;
    if (!scrollToHash(p.hash)) window.scrollTo(0, p.scroll || 0);
    if (p.focus) document.getElementById("main")?.focus({ preventScroll: true });
  }, []);

  const value = useMemo(
    () => ({
      path: route.path,
      base: route.base,
      page: pageOf(route.base),
      projectId: projectIdFromPath(route.path),
      landingProjectId: projectIdFromPath(initialPath),
      navigate,
      settle,
    }),
    [route, initialPath, navigate, settle]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
