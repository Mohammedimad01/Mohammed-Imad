import { useEffect, useState } from "react";

// Returns the id of the last section whose top has passed `offset` px from the
// top of the viewport. Position-based so it stays correct after jumps, reloads
// with restored scroll, and anchor navigation. Scroll events already fire at
// most once per frame and this only reads a handful of rects.
export function useScrollSpy(ids, offset = 160) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const measure = () => {
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      // At the very bottom, the last section wins even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1];
      setActive(current);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [ids, offset]);

  return active;
}
