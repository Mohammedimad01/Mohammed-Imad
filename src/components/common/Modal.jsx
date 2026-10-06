import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useHydrated } from "../../hooks/useHydrated";

const FOCUSABLE = 'a[href],button:not([disabled]),textarea,input,select,iframe,[tabindex]:not([tabindex="-1"])';

// Stack of open panels: only the top-most one reacts to Esc / traps Tab.
const stack = [];

function Panel({ onClose, title, label, variant, children, className = "" }) {
  const panelRef = useRef(null);
  const titleId = useId();
  const closeRef = useRef(onClose);
  // Captured at render: children may move focus inside before our effect runs.
  const [prevFocus] = useState(() => (typeof document === "undefined" ? null : document.activeElement));

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    const token = {};
    stack.push(token);
    document.documentElement.classList.add("is-locked");

    const first = panel?.querySelector("[data-autofocus]") || panel;
    first?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (stack[stack.length - 1] !== token) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = [...panel.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const firstN = nodes[0];
      const lastN = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstN) {
        e.preventDefault();
        lastN.focus();
      } else if (!e.shiftKey && document.activeElement === lastN) {
        e.preventDefault();
        firstN.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      stack.splice(stack.indexOf(token), 1);
      if (!stack.length) document.documentElement.classList.remove("is-locked");
      // Only hand focus back if it's still ours: a follow-up action (e.g. the
      // palette opening a case study) may already have moved it somewhere useful.
      const active = document.activeElement;
      const ours = !active || active === document.body || panel?.contains(active);
      if (ours && prevFocus instanceof HTMLElement && prevFocus.isConnected) prevFocus.focus({ preventScroll: true });
    };
  }, [prevFocus]);

  const isDrawer = variant === "drawer";

  return (
    <div className={`modal modal--${variant}`}>
      <motion.div
        className="modal__scrim"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        ref={panelRef}
        className={`modal__panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : label}
        tabIndex={-1}
        initial={isDrawer ? { x: "100%" } : { opacity: 0, y: 24, scale: 0.98 }}
        animate={isDrawer ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
        exit={isDrawer ? { x: "100%" } : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 34, mass: 0.9 }}
      >
        {title !== undefined && (
          <header className="modal__head">
            <div className="modal__title" id={titleId}>{title}</div>
            <button className="icon-btn" onClick={onClose} aria-label="Close dialog">
              <X size={16} />
            </button>
          </header>
        )}
        {children}
      </motion.div>
    </div>
  );
}

// Portals can't be server-rendered, so a modal that is open in the
// pre-rendered HTML (a /work/<id>/ case-study URL) renders in place until
// hydration, then moves into a portal. initial={false} keeps either path from
// replaying the entrance animation; later openings animate as normal.
export default function Modal({ open, variant = "center", ...rest }) {
  const hydrated = useHydrated();
  const tree = <AnimatePresence initial={false}>{open && <Panel key="panel" variant={variant} {...rest} />}</AnimatePresence>;
  return hydrated ? createPortal(tree, document.body) : tree;
}
