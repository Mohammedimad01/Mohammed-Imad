import { useCallback, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { PALETTES, PrefsContext } from "./PrefsContext";

const read = (k, fallback) => {
  try {
    return localStorage.getItem(k) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* storage unavailable; preference just won't persist */
  }
};

const systemReduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function PrefsProvider({ children }) {
  const [palette, setPaletteState] = useState(() => {
    const p = read("mit:palette", "cobalt");
    return PALETTES.some((x) => x.id === p) ? p : "cobalt";
  });
  // "system" follows the OS; "on"/"off" are explicit overrides.
  const [motionPref, setMotionPref] = useState(() => read("mit:motion", "system"));
  const [osReduced, setOsReduced] = useState(systemReduced);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const h = () => setOsReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const reducedMotion = motionPref === "system" ? osReduced : motionPref === "on";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.palette = palette;
    root.dataset.motion = reducedMotion ? "reduced" : "full";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", PALETTES.find((p) => p.id === palette).swatch[0]);
  }, [palette, reducedMotion]);

  const setPalette = useCallback((id) => {
    setPaletteState(id);
    write("mit:palette", id);
  }, []);

  const toggleReducedMotion = useCallback(() => {
    const next = reducedMotion ? "off" : "on";
    setMotionPref(next);
    write("mit:motion", next);
    return next === "on";
  }, [reducedMotion]);

  const value = useMemo(
    () => ({ palette, setPalette, reducedMotion, toggleReducedMotion }),
    [palette, setPalette, reducedMotion, toggleReducedMotion]
  );

  return (
    <PrefsContext.Provider value={value}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </PrefsContext.Provider>
  );
}
