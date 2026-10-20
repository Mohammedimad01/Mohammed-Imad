import { createContext, useContext } from "react";

// Two appearances of one design system (see styles/variables.css).
// The browser chrome colour for each: the page background.
export const THEMES = ["light", "dark"];
export const THEME_COLOR = { light: "#ffffff", dark: "#000000" };

export const PrefsContext = createContext(null);

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}
