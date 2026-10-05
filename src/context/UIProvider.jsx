import { useCallback, useMemo, useRef, useState } from "react";
import { UIContext } from "./UIContext";
import ToastHost from "../components/common/Toast";
import { copyText } from "../lib/actions";
import { CONTACT } from "../data/meta";

export default function UIProvider({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);

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
      openProject: setProjectId,
      closeProject: () => setProjectId(null),
      toast,
      copyEmail,
    }),
    [paletteOpen, resumeOpen, projectId, toast, copyEmail]
  );

  return (
    <UIContext.Provider value={value}>
      {children}
      <ToastHost toasts={toasts} onDismiss={dismissToast} />
    </UIContext.Provider>
  );
}
