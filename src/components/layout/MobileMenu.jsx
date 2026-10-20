import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROFILE, CONTACT } from "../../data/meta";
import { PAGES } from "../../data/pages";
import { useUI } from "../../context/UIContext";
import Link from "../../router/Link";

const EASE = [0.25, 1, 0.5, 1];

export default function MobileMenu({ open, activeId, onClose }) {
  const { openResume, copyEmail } = useUI();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.documentElement.classList.add("is-locked");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Drops down from the bar that opened it and lifts back the same way.
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="mmenu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <nav aria-label="Mobile">
            <ol className="mmenu__list">
              {PAGES.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.035, duration: 0.45, ease: EASE }}
                >
                  <Link
                    to={n.path}
                    onClick={onClose}
                    className={activeId === n.id ? "is-active" : undefined}
                    aria-current={activeId === n.id ? "page" : undefined}
                  >
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ol>
          </nav>
          <div className="mmenu__foot">
            <button className="btn btn--primary btn--lg" onClick={() => { onClose(); openResume(); }}>Download résumé</button>
            <button className="btn btn--quiet btn--lg" onClick={copyEmail}>Copy email</button>
            <p className="mmenu__meta">{PROFILE.availability}<br />{CONTACT.email}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
