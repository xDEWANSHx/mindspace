"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, MapPin, X, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export default function BentoMatrix() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);

  const galleryImages = [
    {
      src: "/assets/gallery_quiet_study.png",
      alt: "Ergonomic study cabins with warm focus lighting",
      span: "row-span-2 col-span-1 h-[340px] md:h-full",
    },
    {
      src: "/assets/gallery_relax_lounge.png",
      alt: "Relaxation lounge area with velvet seating",
      span: "row-span-1 col-span-1 h-[160px] md:h-[220px]",
    },
    {
      src: "/assets/gallery_book_stack.png",
      alt: "Classic leather-bound reference book shelf",
      span: "row-span-1 col-span-1 h-[160px] md:h-[220px]",
    },
    {
      src: "/assets/library_interior.png",
      alt: "Main library overview showcasing bookshelf modules",
      span: "row-span-1 col-span-2 h-[180px] md:h-[200px]",
    },
  ];

  const handleCopyCoords = async () => {
    try {
      await navigator.clipboard.writeText("28.6273, 77.3725");
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

  return (
    <section id="bento-structural-grid" className="py-32 bg-bg-warm-secondary/30 relative">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-left max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent-birch-wood">
            Services & Spaces
          </span>
          <h2 className="shrimp-display text-5xl md:text-6xl text-ink-primary font-bold">
            MINDSPACE BENTO ENGINE
          </h2>
          <p className="text-ink-secondary text-sm md:text-base">
            Explore premium memberships, tour our architectural interiors, and pinpoint our digital sanctuary location.
          </p>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Bento Block A: UNBIASED PRICING TIERS (6 Columns) */}
          <div className="lg:col-span-6 bg-bg-warm-elevated border border-stone-200/50 p-8 squircle-md shadow-sm flex flex-col justify-between gap-8 h-full">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-accent-birch-wood font-bold">
                Membership Plans
              </span>
              <h3 className="text-2xl font-bold text-ink-primary">Unbiased Seat Tariffs</h3>
              <p className="text-xs text-ink-muted">Choose the perfect shift structure mapped to your focus habits.</p>
            </div>

            {/* Sub-cards */}
            <div className="flex flex-col gap-6">
              {/* Shift 1 */}
              <div className="bg-bg-warm-primary border border-stone-200/60 p-6 squircle-sm flex flex-col gap-4 hover:border-accent-birch-wood transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="shrimp-display text-2xl text-ink-primary">HALF DAY SHIFT</h4>
                    <p className="text-[11px] text-accent-birch-wood font-bold mt-0.5">Morning OR Evening Shift Only</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-ink-primary font-display font-bold">₹599</span>
                    <span className="text-xs text-ink-muted">/mo</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-stone-200/60" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-secondary">
                  {[
                    "Allocated Ergonomic Work Desk",
                    "High-Speed Wi-Fi Throughput",
                    "Dedicated Socket Terminal",
                    "Pantry Water Filter Access"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-accent-aqua-core shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shift 2 */}
              <div className="bg-bg-warm-primary border-2 border-accent-birch-wood/40 p-6 squircle-sm flex flex-col gap-4 hover:border-accent-birch-wood relative transition-colors duration-300">
                {/* Popular Badge */}
                <div className="absolute -top-3 right-6 bg-accent-birch-wood text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Recommended
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="shrimp-display text-2xl text-ink-primary">FULL DAY ACCESS</h4>
                    <p className="text-[11px] text-accent-birch-wood font-bold mt-0.5">Complete Operating Hours Access</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-ink-primary font-display font-bold">₹1,099</span>
                    <span className="text-xs text-ink-muted">/mo</span>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-stone-200/60" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink-secondary">
                  {[
                    "All Operating Shifts Unlocked",
                    "Premium Locker Priority",
                    "Unrestricted Study Hours",
                    "Free Cafe QR Coupon / Month",
                    "Dedicated Double Real Estate",
                    "Silence Room Priority Entry"
                  ].map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-accent-aqua-core shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={handleScrollToForm}
              className="w-full py-4 bg-ink-primary hover:bg-[#2c3632] text-white text-xs uppercase tracking-widest font-bold squircle-sm transition-all duration-300 active:scale-[0.98] cursor-pointer mt-4"
            >
              Choose Subscription Shift
            </button>
          </div>

          {/* Bento Block B: INTERACTIVE LUXURY SCENIC GALLERY (6 Columns) */}
          <div className="lg:col-span-6 bg-bg-warm-elevated border border-stone-200/50 p-8 squircle-md shadow-sm flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-accent-birch-wood font-bold">
                Interior Tour
              </span>
              <h3 className="text-2xl font-bold text-ink-primary">Luxury Scenic Gallery</h3>
              <p className="text-xs text-ink-muted">Click on a module to expand details and inspect the sanctuary space.</p>
            </div>

            {/* Masonry Puzzle Grid */}
            <div className="grid grid-cols-2 gap-4 h-[420px] md:h-[450px]">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImg(img)}
                  className={`${img.span} relative overflow-hidden rounded-[1.5rem] border border-stone-200/50 group cursor-pointer`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Hover mask */}
                  <div className="absolute inset-0 bg-ink-primary/0 group-hover:bg-ink-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-ink-primary text-xs font-semibold px-4 py-2 rounded-full shadow transition-opacity duration-300">
                      Expand View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Block C: THE AQUA LOCATION ENGINE (12 Columns) */}
          <div className="col-span-1 lg:col-span-12 bg-bg-warm-elevated border border-stone-200/50 p-8 squircle-md shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            
            {/* Topography Aqua-themed map representation */}
            <div className="lg:col-span-7 h-[300px] w-full rounded-[2rem] border border-stone-200/60 overflow-hidden relative bg-[#0e1715] select-none shadow-inner">
              {/* Radial grids and coordinates coordinates */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" 
                   style={{
                     backgroundImage: "radial-gradient(#00A8CC 1px, transparent 1px), linear-gradient(rgba(0, 168, 204, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 168, 204, 0.1) 1px, transparent 1px)",
                     backgroundSize: "20px 20px, 40px 40px, 40px 40px"
                   }} 
              />
              {/* Stylized vector map paths */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 600 300">
                <path d="M 50,50 L 550,50 M 50,150 L 550,150 M 50,250 L 550,250 M 150,50 L 150,250 M 350,50 L 350,250 M 450,50 L 450,250" stroke="#00A8CC" strokeWidth="1.5" />
                <circle cx="350" cy="150" r="80" stroke="#00A8CC" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="350" cy="150" r="140" stroke="#00A8CC" strokeWidth="0.5" />
              </svg>

              {/* Pulsing Pin Marker */}
              <div className="absolute top-[150px] left-[350px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-accent-aqua-core opacity-40 animate-ping" />
                  <div className="w-8 h-8 rounded-full bg-accent-aqua-core flex items-center justify-center border border-white text-white shadow-lg relative z-10 hover:scale-110 transition-transform">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                </div>
                <div className="mt-2 bg-[#1C2421]/90 backdrop-blur border border-accent-aqua-core/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  MindSpace HQ
                </div>
              </div>

              {/* Holographic scanner line animation */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-aqua-core to-transparent opacity-60 animate-[bounce_5s_infinite_ease-in-out]" />
            </div>

            {/* Address Details & Copy Utility */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-4 relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-accent-birch-wood font-bold">
                  Location Engine
                </span>
                <h3 className="text-2xl font-bold text-ink-primary">Pinpoint Our Coordinates</h3>
                <p className="text-xs text-ink-muted">We are located in the heart of Noida's intellectual district, connected directly with transit links.</p>
              </div>

              {/* Address detail card */}
              <div className="bg-bg-warm-primary border border-stone-200/50 p-6 squircle-sm relative overflow-hidden">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary mb-2">Physical Location Address</h4>
                <p className="text-xs text-ink-secondary leading-relaxed max-w-sm mb-4">
                  MindSpace Library, 3rd Floor, Birch Plaza, Knowledge Hub, Sector 62, Noida, Uttar Pradesh, 201301
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    onClick={handleCopyCoords}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 hover:border-accent-aqua-core hover:text-accent-aqua-core rounded-full text-xs font-semibold text-ink-secondary shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Coordinates</span>
                      </>
                    )}
                  </button>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-accent-birch-wood hover:bg-[#c2a17b] text-white rounded-full text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Absolute floating confirmation alert badge */}
            {copied && (
              <div className="absolute bottom-6 right-6 bg-accent-aqua-core text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-[slideUp_0.3s_ease-out] z-30">
                <Check className="w-4 h-4" />
                <span>Coordinates copied to clipboard! (28.6273, 77.3725)</span>
              </div>
            )}
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
              <p className="text-xs uppercase tracking-wider text-accent-birch-wood font-bold mb-1">Interactive Gallery View</p>
              <p className="text-sm font-semibold">{lightboxImg.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
