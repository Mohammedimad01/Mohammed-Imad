import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { usePrefs } from "../../context/PrefsContext";

// Rises into place the first time it scrolls into view. The hidden starting
// state lives in CSS (only under full motion), so there's no flash before
// GSAP takes over and nothing is hidden if scripts never run.
export default function Reveal({ as: Tag = "div", delay = 0, y = 28, className = "", children, ...rest }) {
  const ref = useRef(null);
  const { reducedMotion } = usePrefs();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          delay: delay / 1000,
          clearProps: "transform",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        }
      );
    },
    { dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
