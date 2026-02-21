"use client";

import { useEffect, RefObject } from "react";

export function useScrollReveal(ref: RefObject<Element> | null) {
  useEffect(() => {
    if (!ref || !ref.current) return;
    const el = ref.current as Element;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default useScrollReveal;
