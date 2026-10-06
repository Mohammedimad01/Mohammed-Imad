import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UIContext } from "./UIContext";
import ToastHost from "../components/common/Toast";
import { copyText } from "../lib/actions";
import { CONTACT } from "../data/meta";
import { pageMeta, projectIdFromPath, projectPath, SITE } from "../seo/site.js";

// Keep the <head> in step with the open case study so shared links, the tab
// title and the canonical all describe what's on screen.
function syncHead(projectId) {
  const m = pageMeta(projectId);
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
}

export default function UIProvider({ children, initialProjectId = null }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [projectId, setProjectId] = useState(initialProjectId);
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);
  const firstHead = useRef(true);

  // Browser back/forward moves between the page and its case-study URLs.
  useEffect(() => {
    const onPop = () => setProjectId(projectIdFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    // The pre-rendered HTML already has the right head for the landing URL.
    if (firstHead.current) {
      firstHead.current = false;
      return;
    }
    syncHead(projectId);
  }, [projectId]);

  const openProject = useCallback((id, { replace = false } = {}) => {
    setProjectId(id);
    const path = projectPath(id);
    if (window.location.pathname === path) return;
    // `pushed` marks entries this page added, so closing can pop them. A
    // replace keeps the current entry's flag: a case study you landed on
    // directly was never pushed, and going "back" from it would leave the site.
    if (replace) window.history.replaceState({ ...window.history.state, caseStudy: id }, "", path);
    else window.history.pushState({ caseStudy: id, pushed: true }, "", path);
  }, []);

  const closeProject = useCallback(() => {
    setProjectId(null);
    if (window.history.state?.pushed) window.history.back();
    else window.history.replaceState(null, "", "/" + window.location.hash);
  }, []);

  const toast = useCallback((message, { tone = "ok", detail } = {}) => {
    const id = ++seq.current;
    setToasts((t) => [...t.slice(-2), { id, message, tone, detail }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const copyEmail = useCallback(async () => {
    const ok = await copyText(CONTACT.email);
    if (ok) toast("Email copied to clipboard", { detail: CONTACT.email });
    else toast("Couldn't access the clipboard", { tone: "warn", detail: CONTACT.email });
  }, [toast]);

  const value = useMemo(
    () => ({
      paletteOpen,
      setPaletteOpen,
      togglePalette: () => setPaletteOpen((o) => !o),
      resumeOpen,
      openResume: () => setResumeOpen(true),
      closeResume: () => setResumeOpen(false),
      projectId,
      // The case study this page was loaded at (/work/<id>/); it owns the H1.
      landingProjectId: initialProjectId,
      openProject,
      closeProject,
      toast,
      copyEmail,
    }),
    [paletteOpen, resumeOpen, projectId, initialProjectId, openProject, closeProject, toast, copyEmail]
  );

  return (
    <UIContext.Provider value={value}>
      {children}
      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </UIContext.Provider>
  );
}
