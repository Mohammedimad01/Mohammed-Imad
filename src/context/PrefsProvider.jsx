import { useCallback, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";
import { THEMES, THEME_COLOR, PrefsContext } from "./PrefsContext";

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
  // index.html picks the appearance before first paint (saved choice, else
  // the OS setting); read the result rather than deciding twice.
  const [theme, setThemeState] = useState(() => {
    const t = typeof document !== "undefined" ? document.documentElement.dataset.theme : "light";
    return THEMES.includes(t) ? t : "light";
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

  // With no saved choice, keep following the OS if it switches appearance.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const h = () => {
      if (read("mit:theme", null)) return;
      setThemeState(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const reducedMotion = motionPref === "system" ? osReduced : motionPref === "on";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.motion = reducedMotion ? "reduced" : "full";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  }, [theme, reducedMotion]);

  const setTheme = useCallback((t) => {
    // Cross-fade colours for a moment, but not on every hover transition.
    const root = document.documentElement;
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 550);
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
    () => ({ theme, setTheme, toggleTheme, reducedMotion, toggleReducedMotion }),
    [theme, setTheme, toggleTheme, reducedMotion, toggleReducedMotion]
  );

  return (
    <PrefsContext.Provider value={value}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </PrefsContext.Provider>
  );
}
