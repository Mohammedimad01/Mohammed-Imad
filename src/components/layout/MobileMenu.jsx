import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, PROFILE, CONTACT } from "../../data/meta";
import { useUI } from "../../context/UIContext";

export default function MobileMenu({ open, active, onNavigate, onClose }) {
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="mmenu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
        >
          <nav aria-label="Mobile">
            <ol className="mmenu__list">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05 }}
                >
                  <a href={`#${n.id}`} onClick={(e) => onNavigate(e, n.id)} className={active === n.id ? "is-active" : undefined}>
                    <span>0{i + 1}</span>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ol>
          </nav>
          <div className="mmenu__foot">
            <button className="btn btn--primary" onClick={() => { onClose(); openResume(); }}>View résumé</button>
            <button className="btn btn--ghost" onClick={copyEmail}>Copy email</button>
            <p className="mmenu__meta">{PROFILE.availability}<br />{CONTACT.email}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
