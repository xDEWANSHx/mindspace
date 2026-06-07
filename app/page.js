"use client";

import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import CinematicScroller from "@/components/CinematicScroller";
import CoBrandSynergy from "@/components/CoBrandSynergy";
import FounderNote from "@/components/FounderNote";
import BentoMatrix from "@/components/BentoMatrix";
import EnquiryForm from "@/components/EnquiryForm";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const handleScrollToSection = (id) => {
    const sec = document.getElementById(id);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-warm-primary selection:bg-accent-aqua-core selection:text-white">
      {/* Fixed Premium Navbar */}
      <Navbar />

      {/* Main landing sections */}
      <main className="flex-1">
        
        {/* Section 1: Wave Hero Interlocking Layout */}
        <HeroSection />

        {/* Section 2: Ambient Squircle Statistics Controllers */}
        <StatsCounter />

        {/* Section 3: Cinematic Scroll Workstation Zoom View */}
        <CinematicScroller />

        {/* Section 4: Co-Branding Synergy Hub (Noiric Cafe × MindSpace) */}
        <CoBrandSynergy />

        {/* Section 5: Founder Editorial Focus Statement */}
        <FounderNote />

        {/* Section 6: Non-Blocky Bento Matrix Layout (Tariff, Tour, Location Map) */}
        <BentoMatrix />

        {/* Section 7: Lead CRM Enquiry Engine Form */}
        <EnquiryForm />

      </main>

      {/* Section 8: Outbound System Footer */}
      <footer className="bg-[#1C2421] text-[#7A8A84] py-16 px-8 border-t border-stone-800 font-body z-10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          
          {/* Column A: Identity statement & copyright */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden p-0.5 border border-stone-800">
                <Image src="/assets/logo.jpg" alt="MindSpace Library Logo" fill className="object-contain" />
              </div>
              <span className="text-white text-sm font-bold uppercase tracking-wider font-body">MindSpace Library</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              MindSpace Library provides premium physical sanctuary environments designed for uninterrupted intellectual work. Engineered for deep focus.
            </p>
            <span className="text-[10px] text-stone-600 font-semibold mt-4">
              © {new Date().getFullYear()} MindSpace Library. All rights reserved. <br />
              Founder: Harsh Goyal.
            </span>
          </div>

          {/* Column B: Quick navigation links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Sanctuary Sections</h4>
            <nav className="flex flex-col gap-2.5 text-xs">
              <button
                onClick={() => handleScrollToSection("co-brand-pantry-matrix")}
                className="hover:text-white transition-colors cursor-pointer text-left w-fit"
              >
                Features & Co-branding
              </button>
              <button
                onClick={() => handleScrollToSection("cinematic-magnetic-scroller")}
                className="hover:text-white transition-colors cursor-pointer text-left w-fit"
              >
                Cinematic Study Cabins
              </button>
              <button
                onClick={() => handleScrollToSection("bento-structural-grid")}
                className="hover:text-white transition-colors cursor-pointer text-left w-fit"
              >
                Membership Tariff Options
              </button>
              <button
                onClick={() => handleScrollToSection("bento-structural-grid")}
                className="hover:text-white transition-colors cursor-pointer text-left w-fit"
              >
                Location & Coordinates Map
              </button>
            </nav>
          </div>

          {/* Column C: Admin portal console shortcut */}
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Internal Operations</h4>
              <p className="text-xs leading-relaxed max-w-xs">
                Administrative desk routing and gross financial collection databases.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone-800">
              <Link
                href="/login"
                className="text-[10px] uppercase tracking-widest font-bold text-accent-birch-wood hover:text-white transition-colors border border-dashed border-accent-birch-wood/30 hover:border-white/40 px-4 py-2.5 rounded-lg inline-block w-fit"
              >
                Staff & Admin Portal Login Console
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
