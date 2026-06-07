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
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const isLeft = direction === "left";

  return (
    <div
      ref={ref}
      className={`w-full flex ${isLeft ? "justify-start" : "justify-end"} py-6`}
    >
      <div
        className={`h-[2px] bg-gradient-to-r ${
          isLeft
            ? "from-accent-birch-wood via-accent-birch-wood to-accent-birch-wood/0"
            : "from-accent-birch-wood/0 via-accent-birch-wood to-accent-birch-wood"
        } transition-all ease-[cubic-bezier(0.16,1,0.3,1)] relative`}
        style={{
          width: visible ? "50%" : "0%",
          transitionDuration: "1.2s",
          transitionProperty: "width",
        }}
      >
        {/* Sharp edge arrow at the endpoint */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 ${
            isLeft ? "right-0 translate-x-[1px]" : "left-0 -translate-x-[1px]"
          }`}
        >
          <div
            className={`w-0 h-0 ${
              isLeft
                ? "border-l-[8px] border-l-accent-birch-wood border-y-[4px] border-y-transparent border-r-0"
                : "border-r-[8px] border-r-accent-birch-wood border-y-[4px] border-y-transparent border-l-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
