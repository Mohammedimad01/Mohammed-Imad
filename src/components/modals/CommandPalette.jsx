import { useCallback } from "react";
import { Command } from "cmdk";
import { ArrowRight, Copy, CornerDownLeft, FileDown, Hash, Mail, Palette, Printer, Search, Sparkles, Wind } from "lucide-react";
import { CONTACT } from "../../data/meta";
import { PAGES } from "../../data/pages";
import { useRouter } from "../../router/RouterContext";
import { PROJECTS } from "../../data/projects";
import { PALETTES, usePrefs } from "../../context/PrefsContext";
import { useUI } from "../../context/UIContext";
import { useKeyboardNav } from "../../hooks/useKeyboardNav";
import { navigateTo, openExternal } from "../../lib/actions";
import Modal from "../common/Modal";
import { GithubIcon, LinkedinIcon } from "../common/BrandIcons";

// Pages, plus a couple of deep links into them.
const DESTINATIONS = [
  ...PAGES.map((p) => ({ to: p.path, label: p.label, keywords: ["page", p.id] })),
  { to: "/#faq", label: "Quick answers", keywords: ["faq", "questions", "about"] },
  { to: "/education/#certifications", label: "Certifications", keywords: ["certificates", "courses"] },
];

function Item({ onSelect, icon: Icon, children, hint, keywords }) {
  return (
    <Command.Item onSelect={onSelect} keywords={keywords} className="cmd__item">
      <span className="cmd__ic" aria-hidden="true"><Icon size={14} /></span>
      <span className="cmd__label">{children}</span>
      {hint && <span className="cmd__hint">{hint}</span>}
      <CornerDownLeft size={12} className="cmd__enter" aria-hidden="true" />
    </Command.Item>
  );
}

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen, togglePalette, openProject, openResume, copyEmail, toast } = useUI();
  const { palette, setPalette, reducedMotion, toggleReducedMotion } = usePrefs();
  const { navigate } = useRouter();

  const open = useCallback(() => setPaletteOpen(true), [setPaletteOpen]);
  useKeyboardNav({ onToggle: togglePalette, onOpen: open });

  const close = useCallback(() => setPaletteOpen(false), [setPaletteOpen]);
  // Close first so focus restoration doesn't fight the follow-up action.
  const run = (fn) => () => {
    close();
    setTimeout(fn, 60);
  };

  return (
    <Modal open={paletteOpen} onClose={close} label="Command palette" className="cmd">
      <Command label="Command palette" loop>
        <div className="cmd__search">
          <Search size={15} aria-hidden="true" />
          <Command.Input data-autofocus placeholder="Jump to a page, case study or action…" />
          <kbd>esc</kbd>
        </div>
        <Command.List className="cmd__list">
          <Command.Empty className="cmd__empty">Nothing matches. Try “resume”, “SQL” or “contact”.</Command.Empty>

          <Command.Group heading="Recruiter shortcuts">
            <Item icon={FileDown} onSelect={run(openResume)} keywords={["cv", "resume", "download", "pdf"]} hint="PDF">
              Download résumé
            </Item>
            <Item icon={Copy} onSelect={run(copyEmail)} keywords={["mail", "contact"]} hint={CONTACT.email}>
              Copy email address
            </Item>
            <Item icon={Mail} onSelect={run(() => navigateTo(`mailto:${CONTACT.email}`))} keywords={["write", "contact"]}>
              Compose an email
            </Item>
          </Command.Group>

          <Command.Group heading="Go to">
            {DESTINATIONS.map((d) => (
              <Item key={d.to} icon={Hash} onSelect={run(() => navigate(d.to))} keywords={d.keywords} hint={d.to}>
                {d.label}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading="Case studies">
            {PROJECTS.map((p) => (
              <Item key={p.id} icon={ArrowRight} onSelect={run(() => openProject(p.id))} keywords={[...p.tools, p.type, p.category]} hint={p.type.split("·")[0].trim()}>
                {p.shortName || p.name}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading="Elsewhere">
            <Item icon={LinkedinIcon} onSelect={run(() => openExternal(CONTACT.linkedin))} keywords={["social", "profile"]}>
              LinkedIn
            </Item>
            <Item icon={GithubIcon} onSelect={run(() => openExternal(CONTACT.github))} keywords={["code", "repos"]}>
              GitHub
            </Item>
          </Command.Group>

          <Command.Group heading="Preferences">
            <Item
              icon={Wind}
              keywords={["animation", "accessibility", "motion", "a11y"]}
              hint={reducedMotion ? "On" : "Off"}
              onSelect={() => {
                const on = toggleReducedMotion();
                toast(on ? "Reduced motion on" : "Reduced motion off", { detail: on ? "Animations and the custom cursor are paused." : undefined });
              }}
            >
              Toggle reduced motion
            </Item>
            <Item icon={Printer} onSelect={run(() => window.print())} keywords={["print", "pdf", "resume"]}>
              Print web résumé
            </Item>
            {PALETTES.map((p) => (
              <Item
                key={p.id}
                icon={p.id === palette ? Sparkles : Palette}
                keywords={["theme", "colour", "color", "palette", p.id === "paper" ? "light" : "dark"]}
                hint={p.id === palette ? "Active" : undefined}
                onSelect={() => {
                  setPalette(p.id);
                  toast(`Palette: ${p.name}`);
                }}
              >
                Palette: {p.name}
              </Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="cmd__foot" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>/</kbd> or <kbd>Ctrl K</kbd> anywhere</span>
        </div>
      </Command>
    </Modal>
  );
}
