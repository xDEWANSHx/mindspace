"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbulb } from "lucide-react";

export default function FounderNote() {
  const [glowActive, setGlowActive] = useState(true);

  return (
    <section className="w-full bg-[#FAF4E8]/40 relative flex flex-col">
      {/* Section 5.1: The Material Connection Stripe */}
      <div className="birch-wood-stripe" />

      {/* Section 5.2: Editorial Content Architecture */}
      <div className="py-32 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Editorial Canvas (7 Columns) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 text-left">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-accent-birch-wood">
            Philosophy & Vision
          </span>
          <h2 className="shrimp-display text-5xl md:text-6xl text-ink-primary">
            A NOTE FROM THE FOUNDER
          </h2>
          
          <div className="text-ink-secondary text-sm md:text-base leading-relaxed text-justify space-y-6">
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:font-display first-letter:text-accent-birch-wood first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8]">
              ntellectual breakthrough is not an accident of scheduling; it is the natural consequence of curated environmental acoustics. When I established MindSpace Library, my objective was simple: dismantle the sterile grid structures of corporate open-offices and the loud chaos of local coffee shops to construct a high-focus sanctuary.
            </p>
            <p>
              By fusing premium textured birch woods, custom organic edge profiles, and targeted digital lighting solutions, we created a space that feels less like a functional workstation and more like a tactile workspace companion. Every square centimeter of our ergonomic cabins and every drop of premium coffee from Noiric Cafe is meticulously calibrated to remove friction from your workflow.
            </p>
            <div className="border-l-4 border-accent-aqua-core pl-4 py-2 my-6 bg-accent-aqua-glow rounded-r-xl">
              <p className="font-bold text-accent-aqua-core text-[10px] uppercase tracking-widest mb-1">Sanctuary Mantra</p>
              <p className="font-semibold text-xs md:text-sm text-ink-primary">
                "BOOKS OPEN MIND, MINDSPACE OPEN POSSIBILITIES"
              </p>
            </div>
            <div className="flex flex-col gap-1 mt-8">
              <span className="font-display uppercase text-lg text-ink-primary tracking-wider">Harsh Goyal</span>
              <span className="text-xs uppercase tracking-widest text-accent-birch-wood font-semibold">Founder, MindSpace Library</span>
            </div>
          </div>
        </div>

        {/* Right Portrait Canvas (5 Columns) */}
        <div className="col-span-1 lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[3rem] border border-stone-200/60 overflow-hidden shadow-lg group">
            {/* Founder image asset */}
            <Image
              src="/assets/founder_portrait.png"
              alt="Harsh Goyal - Founder"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-warm-secondary/30 via-transparent to-transparent pointer-events-none" />

            {/* Ambient Micro-Interaction (Floating lightbulb icon near shoulder line) */}
            <button
              onClick={() => setGlowActive(!glowActive)}
              className={`absolute bottom-[20%] right-8 w-12 h-12 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 ${
                glowActive ? "pulse-glow-active border-accent-aqua-core text-accent-aqua-core" : "text-ink-muted hover:text-ink-primary"
              }`}
              title="Click to toggle inspiration glow"
            >
              <Lightbulb className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
      
      {/* Solid divider at the end of the section */}
      <div className="birch-wood-stripe" />
    </section>
  );
}
