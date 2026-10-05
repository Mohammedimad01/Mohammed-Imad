import { createContext, useContext } from "react";

export const PALETTES = [
  { id: "cobalt", name: "Midnight Cobalt", swatch: ["#070B14", "#E6EBF5", "#6F9CFF", "#D4B36A"] },
  { id: "obsidian", name: "Obsidian & Brass", swatch: ["#0A0A0C", "#E9E4D8", "#C9A35A", "#5BA89C"] },
  { id: "sage", name: "Midnight Sage", swatch: ["#0A1016", "#E4E8E2", "#A3BD9C", "#D9B98A"] },
  { id: "paper", name: "Paper & Ink", swatch: ["#F2EEE5", "#17150F", "#8C5A1C", "#1F5E59"] },
];

export const PrefsContext = createContext(null);

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}
