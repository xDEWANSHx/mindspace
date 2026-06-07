"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Features", target: "co-brand-pantry-matrix" },
  { label: "Spaces", target: "cinematic-magnetic-scroller" },
  { label: "Tariff", target: "bento-structural-grid" },
  { label: "Find Us", target: "bento-structural-grid" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef(null);

  // Scroll detection for transparent → solid transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = [
      "hero-fluid-volume",
      "co-brand-pantry-matrix",
      "cinematic-magnetic-scroller",
      "bento-structural-grid",
      "lead-capture-crm-payload",
    ];

    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, options);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observerRef.current.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const handleScrollToSection = (id) => {
    const sec = document.getElementById(id);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const handleScrollToForm = () => {
    const formSec = document.getElementById("lead-capture-crm-payload");
    if (formSec) {
      formSec.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const isActive = (target) => activeSection === target;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)] border-b border-stone-200/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className={`relative w-11 h-11 rounded-full overflow-hidden p-0.5 transition-all duration-500 ${
                scrolled
                  ? "bg-white border border-stone-200/60 shadow-sm"
                  : "bg-white/90 border border-white/30"
              }`}
            >
              <Image
                src="/assets/logo.jpg"
                alt="MindSpace Library Logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`text-base font-bold tracking-tight hidden sm:inline transition-colors duration-500 ${
                scrolled ? "text-ink-primary" : "text-ink-primary"
              }`}
            >
              MindSpace
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleScrollToSection(item.target)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer rounded-full ${
                  isActive(item.target)
                    ? "text-ink-primary bg-accent-birch-wood/10"
                    : scrolled
                    ? "text-ink-secondary hover:text-ink-primary hover:bg-stone-100/60"
                    : "text-ink-secondary/80 hover:text-ink-primary hover:bg-white/10"
                }`}
              >
                {item.label}
                {/* Active indicator dot */}
                {isActive(item.target) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-birch-wood" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollToForm}
              className={`hidden sm:block px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                scrolled
                  ? "bg-ink-primary text-white hover:bg-[#2c3632] shadow-sm"
                  : "bg-gradient-to-r from-accent-aqua-core to-[#14B8A6] text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
              } active:scale-[0.98]`}
            >
              Enquire Now
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100/50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-ink-primary" : "bg-ink-primary"
                } ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 rounded-full mt-1.5 transition-all duration-300 ${
                  scrolled ? "bg-ink-primary" : "bg-ink-primary"
                } ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-stone-200/30 px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleScrollToSection(item.target)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive(item.target)
                    ? "text-ink-primary bg-accent-birch-wood/10 font-semibold"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-stone-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleScrollToForm}
              className="mt-2 w-full py-3 bg-ink-primary text-white rounded-xl font-semibold text-sm cursor-pointer active:scale-[0.98] transition-transform"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
