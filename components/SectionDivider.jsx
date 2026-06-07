"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Animated section divider line that slides from one edge to center on scroll.
 * @param {"left" | "right"} direction - Which edge the line starts from.
 */
export default function SectionDivider({ direction = "left" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const isLeft = direction === "left";
  const height = 12; // px
  const slant = 24; // px

  return (
    <div
      ref={ref}
      className={`w-full flex ${isLeft ? "justify-start" : "justify-end"} py-8`}
    >
      <div
        className="bg-accent-birch-wood transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          height: `${height}px`,
          width: visible ? "50%" : "0%",
          transitionDuration: "1.4s",
          transitionProperty: "width",
          clipPath: isLeft
            ? `polygon(0 0, calc(100% - ${slant}px) 0, 100% 100%, 0 100%)`
            : `polygon(${slant}px 0, 100% 0, 100% 100%, 0 100%)`,
        }}
      />
    </div>
  );
}
