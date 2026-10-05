import { useEffect, useRef, useState } from "react";

// Fires once when the element enters the viewport.
export function useIntersection({ threshold = 0.12, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => typeof window !== "undefined" && !("IntersectionObserver" in window));

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          o.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
