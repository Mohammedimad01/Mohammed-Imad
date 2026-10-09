import { useCallback, useMemo, useRef, useState } from "react";
import { UIContext } from "./UIContext";
import ToastHost from "../components/common/Toast";
import { copyText } from "../lib/actions";
import { CONTACT } from "../data/meta";
import { projectPath } from "../seo/site.js";
import { useRouter } from "../router/RouterContext";

export default function UIProvider({ children }) {
  const { projectId, landingProjectId, base, navigate } = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);

  // A case study is a URL (/work/<id>/) drawn as a drawer over the current page.
  const openProject = useCallback((id, { replace = false } = {}) => navigate(projectPath(id), { replace }), [navigate]);

  const closeProject = useCallback(() => {
    // Opened from a page here → step back to it. Landed on directly → swap
    // the URL for the page underneath instead of leaving the site.
    if (window.history.state?.viaPage) window.history.back();
    else navigate(base, { replace: true });
  }, [navigate, base]);

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
      landingProjectId,
      openProject,
      closeProject,
      toast,
      copyEmail,
    }),
    [paletteOpen, resumeOpen, projectId, landingProjectId, openProject, closeProject, toast, copyEmail]
  );

  return (
    <UIContext.Provider value={value}>
      {children}
      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </UIContext.Provider>
  );
}
