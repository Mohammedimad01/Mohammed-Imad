import { useCallback, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { PALETTES, THEMES, PrefsContext } from "./PrefsContext";

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
  // index.html applies the saved palette/theme before first paint (and
  // migrates the old "paper" palette to Brass + light); read the result.
  const [palette, setPaletteState] = useState(() => {
    const p = typeof document !== "undefined" ? document.documentElement.dataset.palette : "cobalt";
    return PALETTES.some((x) => x.id === p) ? p : "cobalt";
  });
  const [theme, setThemeState] = useState(() => {
    const t = typeof document !== "undefined" ? document.documentElement.dataset.theme : "dark";
    return THEMES.includes(t) ? t : "dark";
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
    root.dataset.theme = theme;
    root.dataset.motion = reducedMotion ? "reduced" : "full";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", PALETTES.find((p) => p.id === palette)[theme][0]);
  }, [palette, theme, reducedMotion]);

  const setPalette = useCallback((id) => {
    setPaletteState(id);
    write("mit:palette", id);
  }, []);

  const setTheme = useCallback((t) => {
    // Cross-fade colours for a moment, but not on every hover transition.
    const root = document.documentElement;
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 450);
    setThemeState(t);
    write("mit:theme", t);
  }, []);
  const toggleTheme = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme, setTheme]);

  const toggleReducedMotion = useCallback(() => {
    const next = reducedMotion ? "off" : "on";
    setMotionPref(next);
    write("mit:motion", next);
    return next === "on";
  }, [reducedMotion]);

  const value = useMemo(
    () => ({ palette, setPalette, theme, setTheme, toggleTheme, reducedMotion, toggleReducedMotion }),
    [palette, setPalette, theme, setTheme, toggleTheme, reducedMotion, toggleReducedMotion]
  );

  return (
    <PrefsContext.Provider value={value}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </PrefsContext.Provider>
  );
}
