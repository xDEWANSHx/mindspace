"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const FEATURES = [
  {
    image: "/assets/feature_lounge.png",
    title: "Premium Lounge",
    description: "Ambikapur's finest relaxation lounge — velvet seating, curated ambiance, and books within reach.",
    tag: "Coming Soon",
    tagColor: "bg-purple-100/60 text-purple-600 border-purple-200/50",
  },
  {
    image: "/assets/feature_ventilation.png",
    title: "Ventilated Rooms",
    description: "Cross-ventilated, thermally comfortable rooms engineered for all-day comfort and fresh air flow.",
    tag: "Feature",
    tagColor: "bg-accent-aqua-core/10 text-accent-aqua-core border-accent-aqua-core/20",
  },
  {
    image: "/assets/feature_dark_room.png",
    title: "Dark & Light Rooms",
    description: "Two distinct atmospheres — bright daylight focus or moody dark room deep work. Your choice.",
    tag: "Feature",
    tagColor: "bg-accent-aqua-core/10 text-accent-aqua-core border-accent-aqua-core/20",
  },
  {
    image: "/assets/feature_inverter.png",
    title: "Inverter Backup",
    description: "Power cuts? Not your problem. Every desk stays powered through any grid failure, 24/7.",
    tag: "Feature",
    tagColor: "bg-accent-aqua-core/10 text-accent-aqua-core border-accent-aqua-core/20",
  },
  {
    image: "/assets/feature_wifi.png",
    title: "High-Speed Wi-Fi",
    description: "300 Mbps fiber-grade internet. Zero lag, full bandwidth — built for heavy research workloads.",
    tag: "Feature",
    tagColor: "bg-accent-aqua-core/10 text-accent-aqua-core border-accent-aqua-core/20",
  },
  {
    image: "/assets/feature_minimal_cost.png",
    title: "Minimal Costing",
    description: "Premium quality at fair prices. No hidden charges, no gimmicks — just honest value.",
    tag: "Feature",
    tagColor: "bg-accent-aqua-core/10 text-accent-aqua-core border-accent-aqua-core/20",
  },
];

export default function CoBrandSynergy() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [headingHighlight, setHeadingHighlight] = useState(false);

  // Card stagger reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Heading scroll-triggered highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingHighlight(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="co-brand-pantry-matrix"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-bg-warm-secondary/40 relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #D4B28C 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl" ref={headingRef}>
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-accent-birch-wood" />
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-accent-birch-wood">
              What Makes Us Different
            </span>
          </div>
          <h2 className="shrimp-display text-4xl md:text-5xl lg:text-6xl text-[#1F271B] leading-[0.95]">
            THE MINDSPACE{" "}
            <span className="relative inline-block">
              <span className="relative z-10" style={{ fontFamily: "'Bitcount Single Ink', 'Anton', sans-serif" }}>EXPERIENCE</span>
              {/* Scroll-triggered thin highlight sweep */}
              <span
                className={`absolute left-[-2%] bottom-[12%] w-[104%] h-[25%] bg-accent-aqua-core/20 -z-10 origin-left rounded-sm -rotate-1 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  headingHighlight ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </span>
          </h2>
          <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-lg">
            Every detail is engineered for your focus. From ventilation to
            power backups — we built the study space you deserve.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-bg-warm-elevated rounded-2xl border border-stone-200/50 hover:border-stone-300/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1.5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease-out ${idx * 0.08}s, transform 0.6s ease-out ${idx * 0.08}s`,
              }}
            >
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Tag pill on image */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm ${feature.tagColor}`}
                  >
                    {feature.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-2.5">
                <h3 className="shrimp-display text-lg text-[#1F271B] leading-tight">
                  {feature.title.toUpperCase()}
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <button
            onClick={() => {
              const el = document.getElementById("lead-capture-crm-payload");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-[#1F271B] hover:bg-[#2c3632] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-sm"
          >
            Reserve Your Desk →
          </button>
        </div>
      </div>
    </section>
  );
}
