"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const PERKS = [
  {
    icon: "🚀",
    title: "On Table Delivery",
    description: "Scan the QR at your desk. Your order from Noiric Cafe arrives hot and on time — no counter trips needed.",
    highlight: true,
  },
  {
    icon: "🎫",
    title: "10% Off for Members",
    description: "Active MindSpace members enjoy exclusive discounts on every Noiric Cafe order, automatically applied.",
    highlight: false,
  },
  {
    icon: "📱",
    title: "QR Code at Every Desk",
    description: "Each desk has a unique QR code linked to the cafe portal. Scan, browse the menu, and order in seconds.",
    highlight: false,
  },
  {
    icon: "☕",
    title: "Artisanal Beverages",
    description: "Craft coffee, premium teas, and fresh juices — all curated by Noiric Cafe for the focused mind.",
    highlight: false,
  },
];

export default function NoiricCafeSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="noiric-cafe-collab"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Dark warm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C0D05] via-[#241409] to-[#1A0D04]" />

      {/* Wood grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015 0.4' numOctaves='5' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.2'/%3E%3C/filter%3E%3Crect width='600' height='600' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: "500px",
        }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Top section: Split layout — Image left, Content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Left: Featured Image */}
          <div
            className="relative group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <div className="relative h-[400px] lg:h-[480px] w-full rounded-3xl overflow-hidden border border-[#D4B28C]/20 shadow-2xl">
              <Image
                src="/assets/feature_table_delivery.png"
                alt="Noiric Cafe × MindSpace On Table Delivery"
                fill
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D05]/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating partnership badge */}
              <div className="absolute top-5 left-5">
                <div className="flex items-center gap-2 bg-[#D4B28C]/15 backdrop-blur-md border border-[#D4B28C]/25 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4B28C] animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#D4B28C]">
                    Official Partner
                  </span>
                </div>
              </div>

              {/* Bottom text overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="shrimp-display text-xl lg:text-2xl text-white/90 leading-tight">
                  COFFEE MEETS<br />FOCUS
                </p>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-[#D4B28C]/20 rounded-br-3xl pointer-events-none" />
          </div>

          {/* Right: Content */}
          <div
            className="flex flex-col gap-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.8s ease-out 0.15s, transform 0.8s ease-out 0.15s",
            }}
          >
            {/* Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[2px] bg-[#D4B28C]" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-[#D4B28C]/60">
                  Exclusive Partnership
                </span>
              </div>
              <h2 className="shrimp-display text-4xl md:text-5xl lg:text-[3.5rem] text-[#FDF8F0] leading-[0.92]">
                NOIRIC CAFE{" "}
                <span className="text-accent-aqua-core">×</span>{" "}
                MINDSPACE
              </h2>
              <p className="text-[#D4B28C]/50 text-sm md:text-base leading-relaxed max-w-md">
                We partnered with Noiric Cafe to bring premium artisanal refreshments directly to your study desk — so your focus never breaks.
              </p>
            </div>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-accent-aqua-core/40 rounded-full" />

            {/* Perk Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERKS.map((perk, idx) => (
                <div
                  key={idx}
                  className={`group/card relative p-5 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                    perk.highlight
                      ? "bg-[#D4B28C]/8 border-[#D4B28C]/20 hover:border-[#D4B28C]/40"
                      : "bg-white/[0.03] border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.6s ease-out ${0.3 + idx * 0.1}s, transform 0.6s ease-out ${0.3 + idx * 0.1}s`,
                  }}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#D4B28C]/10 border border-[#D4B28C]/15 mb-3 group-hover/card:scale-110 transition-transform duration-300">
                    <span className="text-lg">{perk.icon}</span>
                  </div>

                  <h4 className="shrimp-display text-sm text-[#FDF8F0] mb-1.5 leading-tight">
                    {perk.title.toUpperCase()}
                  </h4>
                  <p className="text-[11px] text-[#D4B28C]/40 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("lead-capture-crm-payload");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-[#D4B28C] to-[#C4A070] text-[#1C0D05] text-xs uppercase tracking-[0.2em] font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97] cursor-pointer"
              >
                Join & Get Perks
              </button>
              <span className="text-[10px] text-[#D4B28C]/30 font-semibold uppercase tracking-wider">
                Available for active members only
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
