"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, MapPin, X, ExternalLink } from "lucide-react";

export default function BentoMatrix() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  const handleCopyCoords = async () => {
    try {
      await navigator.clipboard.writeText("22.1245, 83.1936");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy coordinates: ", err);
    }
  };

  const handleScrollToForm = () => {
    const formSec = document.getElementById("lead-capture-crm-payload");
    if (formSec) {
      formSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getCardHoverClass = (idx) => {
    if (activeHover === null) {
      return "scale-100 opacity-100 z-10";
    }
    if (activeHover === idx) {
      return "scale-[1.025] opacity-100 z-20 shadow-xl border-accent-birch-wood/80 ring-1 ring-accent-birch-wood/20";
    }
    return "scale-[0.975] opacity-60 z-0";
  };

  return (
    <section id="bento-structural-grid" className="py-24 lg:py-32 bg-bg-warm-secondary/30 relative">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-left max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-accent-birch-wood" />
            <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-accent-birch-wood">
              Explore & Choose
            </span>
          </div>
          <h2 className="shrimp-display text-4xl md:text-5xl lg:text-6xl text-ink-primary leading-[0.95]">
            GALLERY & <span className="text-accent-aqua-core">PLANS</span>
          </h2>
          <p className="text-ink-secondary text-sm md:text-base leading-relaxed">
            Explore our sanctuary cabins, choose your study shift, and pinpoint our coordinates.
          </p>
        </div>

        {/* 9-Column Bento Grid matching user sketch */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full relative">
          
          {/* Card 1: Top-Left Rectangle (Row 1, Cols 1-4) - Photo 1 */}
          <div 
            onMouseEnter={() => setActiveHover(1)}
            onMouseLeave={() => setActiveHover(null)}
            onClick={() => setLightboxImg({ src: "/assets/library_interior.png", alt: "Main library overview showcasing study cabins and bookshelves" })}
            className={`md:col-start-1 md:col-span-4 md:row-start-1 md:row-span-1 h-[200px] md:h-[220px] relative overflow-hidden rounded-[2.5rem] border border-stone-200/50 group cursor-pointer bg-bg-warm-elevated transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(1)}`}
          >
            <Image 
              src="/assets/library_interior.png" 
              alt="Main Study Hall" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6 flex flex-col justify-end text-left">
              <span className="text-[9px] uppercase tracking-wider text-accent-birch-wood font-bold">Main Focus Hall</span>
              <h4 className="shrimp-display text-lg text-white">Ergonomic Work Desks</h4>
            </div>
          </div>

          {/* Card 2: Top-Middle Square (Row 1, Cols 5-6) - Photo 2 */}
          <div 
            onMouseEnter={() => setActiveHover(2)}
            onMouseLeave={() => setActiveHover(null)}
            onClick={() => setLightboxImg({ src: "/assets/gallery_book_stack.png", alt: "Curated reference books and study material" })}
            className={`md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-1 h-[200px] md:h-[220px] relative overflow-hidden rounded-[2.5rem] border border-stone-200/50 group cursor-pointer bg-bg-warm-elevated transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(2)}`}
          >
            <Image 
              src="/assets/gallery_book_stack.png" 
              alt="Reference Book Stacks" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 flex flex-col justify-end text-left">
              <span className="text-[9px] uppercase tracking-wider text-accent-birch-wood font-bold">Resources</span>
              <h4 className="shrimp-display text-sm text-white">Reference Stacks</h4>
            </div>
          </div>

          {/* Card 3: Tall Vertical Card 1 (Row 1-2, Cols 7-8) - Photo 3 */}
          <div 
            onMouseEnter={() => setActiveHover(3)}
            onMouseLeave={() => setActiveHover(null)}
            onClick={() => setLightboxImg({ src: "/assets/gallery_quiet_study.png", alt: "Ergonomic study cabins designed for maximum focus and zero distractions" })}
            className={`md:col-start-7 md:col-span-2 md:row-start-1 md:row-span-2 h-[260px] md:h-[464px] relative overflow-hidden rounded-[2.5rem] border border-stone-200/50 group cursor-pointer bg-bg-warm-elevated transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(3)}`}
          >
            <Image 
              src="/assets/gallery_quiet_study.png" 
              alt="Quiet Study Cabins" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end text-left">
              <span className="text-[9px] uppercase tracking-wider text-accent-birch-wood font-bold">Zones</span>
              <h4 className="shrimp-display text-xl text-white">Silent Study Cabins</h4>
            </div>
          </div>

          {/* Card 4: Tall Vertical Card 2 - Specs Checklist (Row 1-2, Cols 9-10) - Matches 3 dots in sketch */}
          <div 
            onMouseEnter={() => setActiveHover(4)}
            onMouseLeave={() => setActiveHover(null)}
            className={`md:col-start-9 md:col-span-2 md:row-start-1 md:row-span-2 h-auto md:h-[464px] rounded-[2.5rem] border border-stone-200/50 p-6 flex flex-col justify-between bg-bg-warm-elevated text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(4)}`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-birch-wood font-bold">Infrastructure</span>
              <h4 className="text-lg font-bold text-ink-primary leading-tight">Sanctuary Specs</h4>
            </div>
            
            {/* 3 Status indicators (vertical dots representation) */}
            <div className="flex flex-col gap-6 py-4">
              {/* Point 1 */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-[#1C2421] flex items-center justify-center text-white shrink-0 shadow-sm font-semibold text-xs border border-stone-800">
                  🔋
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-ink-primary">100% POWER BACKUP</span>
                  <span className="text-[10px] text-ink-secondary leading-normal">Zero lag inverter array.</span>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-[#7A8A84] flex items-center justify-center text-white shrink-0 shadow-sm font-semibold text-xs">
                  🌐
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-ink-primary">1 GBPS FIBER WIFI</span>
                  <span className="text-[10px] text-ink-secondary leading-normal">High throughput routers.</span>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-[#E8ECE9] flex items-center justify-center text-ink-primary shrink-0 shadow-sm font-semibold text-xs border border-stone-200">
                  ❄️
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-ink-primary">CLIMATE CONTROL</span>
                  <span className="text-[10px] text-ink-secondary leading-normal">Quiet AC locked at 22°C.</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-ink-muted leading-relaxed border-t border-stone-100 pt-3">
              Calibrated elements for an uninterrupted focus workflow.
            </div>
          </div>

          {/* Card 5: Top-Right Stat Card (Row 1, Cols 11-12) - Matches "99" in sketch */}
          <div 
            onMouseEnter={() => setActiveHover(5)}
            onMouseLeave={() => setActiveHover(null)}
            className={`md:col-start-11 md:col-span-2 md:row-start-1 md:row-span-1 h-[150px] md:h-[220px] rounded-[2.5rem] border border-stone-200/50 p-6 flex flex-col justify-between bg-bg-warm-elevated text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(5)}`}
          >
            <span className="text-[9px] uppercase tracking-wider text-accent-birch-wood font-bold">Capacity</span>
            <div className="flex flex-col">
              <span className="font-display text-5xl text-[#1F271B] font-bold tracking-tight">100+</span>
              <span className="text-[11px] text-ink-secondary font-semibold mt-1">Ergonomic Focus Seats</span>
            </div>
          </div>

          {/* Card 6: Large Bento Plans (Row 2-3, Cols 1-6) - Matches "Bento" block in sketch */}
          <div 
            onMouseEnter={() => setActiveHover(6)}
            onMouseLeave={() => setActiveHover(null)}
            className={`md:col-start-1 md:col-span-6 md:row-start-2 md:row-span-2 h-auto md:h-[464px] rounded-[2.5rem] border border-stone-200/50 p-6 md:p-8 flex flex-col justify-between bg-bg-warm-elevated text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(6)}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-birch-wood font-bold">Subscription Tariffs</span>
                <h4 className="text-2xl font-bold text-[#1F271B] leading-tight">Sanctuary Shift Plans</h4>
              </div>
              <span className="text-[10px] bg-accent-aqua-core/10 text-accent-aqua-core px-3 py-1 rounded-full font-bold uppercase tracking-wider">Unbiased</span>
            </div>

            {/* Side-by-side Shift Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 items-stretch py-2">
              {/* Plan A: Half Day Shift */}
              <div className="border border-stone-200/60 hover:border-accent-birch-wood p-4 rounded-3xl flex flex-col justify-between transition-colors bg-bg-warm-primary/60 group">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-[#1F271B]">HALF DAY SHIFT</span>
                    <div className="text-right">
                      <span className="text-base font-bold text-[#1F271B] font-display">₹599</span>
                      <span className="text-[9px] text-ink-muted">/mo</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-accent-birch-wood font-bold uppercase tracking-wider block mb-3">Morning or Evening</span>
                  <ul className="text-[10px] text-ink-secondary space-y-1.5">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent-aqua-core shrink-0" />
                      <span>Allocated Study Desk</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent-aqua-core shrink-0" />
                      <span>High-Speed Wi-Fi</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent-aqua-core shrink-0" />
                      <span>Power Socket Terminal</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Plan B: Full Day Shift */}
              <div className="border-2 border-accent-birch-wood/40 hover:border-accent-birch-wood p-4 rounded-3xl flex flex-col justify-between relative transition-colors bg-bg-warm-primary/60">
                <div className="absolute -top-2.5 right-4 bg-accent-birch-wood text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                  Recommended
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-[#1F271B]">FULL DAY ACCESS</span>
                    <div className="text-right">
                      <span className="text-base font-bold text-[#1F271B] font-display">₹1,099</span>
                      <span className="text-[9px] text-ink-muted">/mo</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-accent-birch-wood font-bold uppercase tracking-wider block mb-3">Complete Hours Access</span>
                  <ul className="text-[10px] text-ink-secondary space-y-1.5">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent-aqua-core shrink-0" />
                      <span>All Operating Shifts Unlocked</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent-aqua-core shrink-0" />
                      <span>Premium Locker Priority</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-accent-aqua-core shrink-0" />
                      <span>Silence Room Entry Priority</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleScrollToForm}
              className="w-full py-3.5 bg-ink-primary hover:bg-[#2c3632] text-white text-[11px] uppercase tracking-widest font-bold rounded-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer mt-4"
            >
              Enquire & Reserve Seat
            </button>
          </div>

          {/* Card 9: Middle-Right Stat Card (Row 2, Cols 11-12) - Matches "Aa" in sketch */}
          <div 
            onMouseEnter={() => setActiveHover(9)}
            onMouseLeave={() => setActiveHover(null)}
            className={`md:col-start-11 md:col-span-2 md:row-start-2 md:row-span-1 h-[150px] md:h-[220px] rounded-[2.5rem] border border-stone-200/50 p-6 flex flex-col justify-between bg-bg-warm-elevated text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(9)}`}
          >
            <span className="text-[9px] uppercase tracking-wider text-accent-birch-wood font-bold">Perks</span>
            <div className="flex flex-col">
              <span className="font-display text-5xl text-[#1F271B] font-bold tracking-tight">10%</span>
              <span className="text-[11px] text-ink-secondary font-semibold mt-1">Noiric Cafe Discount</span>
            </div>
          </div>

          {/* Card 7: Bottom-Middle Square (Row 3, Cols 7-8) - Photo 4 */}
          <div 
            onMouseEnter={() => setActiveHover(7)}
            onMouseLeave={() => setActiveHover(null)}
            onClick={() => setLightboxImg({ src: "/assets/gallery_relax_lounge.png", alt: "Premium relaxation lounge to take coffee breaks and refresh" })}
            className={`md:col-start-7 md:col-span-2 md:row-start-3 md:row-span-1 h-[200px] md:h-[220px] relative overflow-hidden rounded-[2.5rem] border border-stone-200/50 group cursor-pointer bg-bg-warm-elevated transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(7)}`}
          >
            <Image 
              src="/assets/gallery_relax_lounge.png" 
              alt="Recharge Lounge" 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 flex flex-col justify-end text-left">
              <span className="text-[9px] uppercase tracking-wider text-accent-birch-wood font-bold">Lounge</span>
              <h4 className="shrimp-display text-sm text-white">Recharge Lounge</h4>
            </div>
          </div>

          {/* Card 8: Bottom-Right Location Map Card (Row 3, Cols 9-12) */}
          <div 
            onMouseEnter={() => setActiveHover(8)}
            onMouseLeave={() => setActiveHover(null)}
            className={`md:col-start-9 md:col-span-4 md:row-start-3 md:row-span-1 h-auto md:h-[220px] rounded-[2.5rem] border border-stone-200/50 p-6 flex flex-col justify-between bg-bg-warm-elevated text-left relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getCardHoverClass(8)}`}
          >
            {/* Map grid background pattern */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[#0e1715]" 
                 style={{
                   backgroundImage: "radial-gradient(#00A8CC 1px, transparent 1px), linear-gradient(rgba(0, 168, 204, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 168, 204, 0.1) 1px, transparent 1px)",
                   backgroundSize: "16px 16px, 32px 32px, 32px 32px"
                 }} 
            />
            
            <div className="relative z-10 flex justify-between items-start gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-accent-birch-wood font-bold">Location coordinates</span>
                <h4 className="text-sm font-bold text-ink-primary mt-0.5">Find MindSpace HQ</h4>
                <p className="text-[10px] text-ink-secondary leading-relaxed max-w-[220px] mt-1">
                  MG Road, Near Goyal Super Mart, Patpariya, Ambikapur, Chhattisgarh 497001
                </p>
              </div>

              {/* Coordinates display with click to copy */}
              <div className="flex flex-col gap-1 items-end shrink-0">
                <span className="text-[9px] font-mono text-ink-muted bg-stone-100 px-2 py-0.5 rounded border border-stone-200">22.1245, 83.1936</span>
                <button
                  onClick={handleCopyCoords}
                  className="text-[9px] font-bold text-accent-aqua-core hover:text-ink-primary transition-colors cursor-pointer"
                >
                  {copied ? "COPIED!" : "COPY COORDS"}
                </button>
              </div>
            </div>

            {/* Coordinates copied notification panel */}
            {copied && (
              <div className="absolute inset-x-0 bottom-0 bg-accent-aqua-core text-white text-[10px] font-bold py-2 text-center z-20 animate-[slideUp_0.2s_ease-out]">
                Coordinates Copied: 22.1245, 83.1936
              </div>
            )}

            <div className="relative z-10 flex gap-2 pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-accent-birch-wood hover:bg-[#c2a17b] text-white rounded-xl text-center text-[10px] font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Open Google Maps Navigation</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center lightbox-overlay p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl animate-[scaleIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              fill
              className="object-cover"
            />
            {/* Close Button */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Description panel */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white text-left">
              <p className="text-xs uppercase tracking-wider text-accent-birch-wood font-bold mb-1">Sanctuary Gallery View</p>
              <p className="text-sm font-semibold">{lightboxImg.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
