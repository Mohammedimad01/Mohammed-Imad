import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// One place to register plugins. GSAP only runs in the browser; the
// pre-render (Node) imports this file but never animates.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Apple's default curve: fast out of the gate, long gentle settle.
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export { gsap, ScrollTrigger, useGSAP };
