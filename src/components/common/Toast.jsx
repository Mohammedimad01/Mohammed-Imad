import { AnimatePresence, motion } from "motion/react";
import { Check, AlertTriangle, X } from "lucide-react";

export default function ToastHost({ toasts, onDismiss }) {
  return (
    <div className="toast-host" role="status" aria-live="polite" aria-atomic="false">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            className={`toast toast--${t.tone}`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <span className="toast__icon" aria-hidden="true">
              {t.tone === "warn" ? <AlertTriangle size={14} /> : <Check size={14} />}
            </span>
            <span className="toast__body">
              <span className="toast__msg">{t.message}</span>
              {t.detail && <span className="toast__detail">{t.detail}</span>}
            </span>
            <button className="toast__close" onClick={() => onDismiss(t.id)} aria-label="Dismiss notification">
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
