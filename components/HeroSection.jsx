"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  // Mouse coordinate state for the spring wiggle effect
  const mouseCoords = useRef({ x: 0, y: 0 });
  const springCoords = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Normalize coords to 0..1 range inside container
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseCoords.current = { x, y };
    };

    const handleMouseLeave = () => {
      mouseCoords.current = { x: 0, y: 0 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Spring animation loop
    let animId;
    const updateSpring = () => {
      const k = 0.08; // spring stiffness
      const d = 0.82; // damping

      // Hooke's Law: F = -k*x
      const ax = (mouseCoords.current.x - springCoords.current.x) * k;
      const ay = (mouseCoords.current.y - springCoords.current.y) * k;

      vel.current.x += ax;
      vel.current.y += ay;
      vel.current.x *= d;
      vel.current.y *= d;

      springCoords.current.x += vel.current.x;
      springCoords.current.y += vel.current.y;

      // Update path d attribute based on spring coordinates
      // Wiggle coordinate offsets are scaled down to keep it subtle
      const wx = springCoords.current.x * 0.08;
      const wy = springCoords.current.y * 0.04;

      if (pathRef.current) {
        // Base control points:
        // C1: (0.05, 0.15) -> wiggled
        // C2: (0.15, 0.4) -> wiggled
        // C3: (0.05, 0.8) -> wiggled
        const p1x = (0.2 + wx).toFixed(4);
        const cp1x = (0.05 - wx).toFixed(4);
        const cp1y = (0.15 + wy).toFixed(4);
        const cp2x = (0.0 + wx).toFixed(4);
        const cp2y = (0.25 - wy).toFixed(4);
        const p2x = (0.15 + wx).toFixed(4);
        const p2y = (0.4 + wy).toFixed(4);
        const cp3x = (0.3 - wx).toFixed(4);
        const cp3y = (0.55 + wy).toFixed(4);
        const cp4x = (0.1 + wx).toFixed(4);
        const cp4y = (0.7 - wy).toFixed(4);
        const p3x = (0.05 + wx).toFixed(4);
        const p3y = (0.8 + wy).toFixed(4);
        const cp5x = (0.0 - wx).toFixed(4);
        const cp5y = (0.9 - wy).toFixed(4);
        const cp6x = (0.1 + wx).toFixed(4);
        const cp6y = (0.95 + wy).toFixed(4);
        const p4x = (0.15 + wx).toFixed(4);

        const newPath = `M ${p1x} 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2x} ${p2y} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${p3x} ${p3y} C ${cp5x} ${cp5y}, ${cp6x} ${cp6y}, ${p4x} 1 L 1 1 L 1 0 Z`;
        pathRef.current.setAttribute("d", newPath);
      }

      animId = requestAnimationFrame(updateSpring);
    };

    updateSpring();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleScrollToForm = () => {
    const formSec = document.getElementById("lead-capture-crm-payload");
    if (formSec) {
      formSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToSection = (id) => {
    const sec = document.getElementById(id);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen relative bg-bg-warm-primary">
      {/* SVG clipPath Definition */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <clipPath id="fluid-horizontal-wave-mask" clipPathUnits="objectBoundingBox">
            <path
              ref={pathRef}
              d="M 0.2 0 C 0.05 0.15, 0 0.25, 0.15 0.4 C 0.3 0.55, 0.1 0.7, 0.05 0.8 C 0.0 0.9, 0.1 0.95, 0.15 1 L 1 1 L 1 0 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Section 1.1: Responsive Elastic Navbar */}
      <header className="w-full max-w-7xl mx-auto h-24 px-8 flex items-center justify-between z-40 relative">
        <div className="flex items-center gap-3 cursor-pointer select-none animate-[fadeIn_0.5s_ease-out]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-14 h-14 bg-white border border-stone-200/50 rounded-full overflow-hidden p-0.5 shadow-sm hover:scale-105 transition-transform duration-300">
            <Image src="/assets/logo.jpg" alt="MindSpace Library Logo" fill className="object-contain" />
          </div>
          <span className="text-lg font-bold tracking-tight text-ink-primary hidden sm:inline">MindSpace</span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Features", target: "co-brand-pantry-matrix" },
            { label: "Spaces", target: "cinematic-magnetic-scroller" },
            { label: "Tariff", target: "bento-structural-grid" },
            { label: "Find Us", target: "bento-structural-grid" }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollToSection(item.target)}
              className="relative py-2 text-ink-secondary hover:text-ink-primary font-medium text-sm transition-colors cursor-pointer group"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-accent-birch-wood transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </button>
          ))}
        </nav>

        <div>
          <button
            onClick={handleScrollToForm}
            className="px-8 py-3 bg-gradient-to-r from-accent-aqua-core to-[#14B8A6] text-white rounded-full font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </header>
      {/* Section 1.2: Liquid Interlocking Hero Split Screen */}
      <section id="hero-fluid-volume" className="relative flex-1 w-full flex flex-col justify-center py-6 lg:py-0 min-h-[50vh] lg:min-h-[75vh]">
        {/* Left Column Text (Aligned to container) */}
        <div className="w-full max-w-7xl mx-auto px-8 z-20 relative">
          <div className="w-full lg:w-5/12 flex flex-col justify-center gap-10 pr-0 lg:pr-10 py-12 lg:py-0">
            <div className="flex flex-col gap-6 group/heading cursor-default select-none">
              {/* Overline with Line and Pulse Dot */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-accent-birch-wood/80 transition-all duration-500 group-hover/heading:w-16" />
                  <span className="text-xs md:text-sm uppercase tracking-[0.35em] font-extrabold text-ink-secondary/70">
                    PREMIUM STUDY SPACE
                  </span>
                </div>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-aqua-core opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-aqua-core"></span>
                </span>
              </div>
              
              {/* Main Heading with Microinteractions */}
              <h1 className="shrimp-display text-7xl md:text-8xl lg:text-[7.5rem] text-ink-primary leading-[0.95] tracking-tight">
                <span className="block transform transition-transform duration-700 ease-out group-hover/heading:translate-x-4">
                  MINDSPACE
                </span>
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-ink-primary">
                    LIBRARY
                  </span>
                  {/* Highlighter Marker Effect */}
                  <span className="absolute left-[-2%] bottom-[15%] w-[104%] h-[40%] bg-yellow-300/80 -z-10 origin-left scale-x-0 transform transition-transform duration-500 ease-out group-hover/heading:scale-x-100 -rotate-2 rounded-sm" />
                </span>
              </h1>
            </div>

            <p className="text-ink-secondary/90 text-base md:text-lg leading-loose max-w-lg font-light">
              MindSpace reimagines the physical sanctuary. We fuse state-of-the-art silence environments, dimmable high-focus desk modules, premium fast fibers, and artisanal refreshments inside a tactile wooden architecture built to elevate your intellectual breakthroughs.
            </p>

            {/* Library Quote block */}
            <div className="border-l-[3px] border-accent-birch-wood pl-6 py-3 bg-gradient-to-r from-accent-birch-wood/10 to-transparent max-w-md rounded-r-2xl">
              <p className="text-sm font-semibold text-ink-primary/80 uppercase tracking-widest leading-relaxed">
                "Where pure focus meets premium comfort."
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleScrollToForm}
                className="px-10 py-4 bg-accent-birch-wood hover:bg-[#c2a17b] text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                Secure Your Seat
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Full bleed half right) - SVG Wavy Mask */}
        <div
          ref={containerRef}
          className="w-full lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:w-1/2 h-[50vh] lg:h-auto relative group cursor-pointer hero-wave-interaction-zone z-10"
        >
          <div
            className="w-full h-full relative"
            style={{
              clipPath: "url(#fluid-horizontal-wave-mask)",
              WebkitClipPath: "url(#fluid-horizontal-wave-mask)",
            }}
          >
            {/* The Image inside the custom Wave clipPath */}
            <Image
              src="/assets/library_interior.png"
              alt="MindSpace Premium Library Interior"
              fill
              priority
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            />
            {/* Subtle premium gradient overlay inside mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
