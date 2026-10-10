import { createContext, useContext } from "react";

// Each palette has a dark and a light version (see styles/variables.css).
// Swatches: [background, text, accent, support].
export const PALETTES = [
  { id: "cobalt", name: "Cobalt", dark: ["#070B14", "#E6EBF5", "#6F9CFF", "#D4B36A"], light: ["#F5F7FB", "#0F1729", "#2F5BD3", "#94701F"] },
  { id: "obsidian", name: "Brass", dark: ["#0A0A0C", "#E9E4D8", "#C9A35A", "#5BA89C"], light: ["#F2EEE5", "#17150F", "#8C5A1C", "#1F5E59"] },
  { id: "sage", name: "Sage", dark: ["#0A1016", "#E4E8E2", "#A3BD9C", "#D9B98A"], light: ["#F1F4EF", "#131A15", "#3D6A44", "#8A6430"] },
];

export const THEMES = ["dark", "light"];

export const PrefsContext = createContext(null);

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}
