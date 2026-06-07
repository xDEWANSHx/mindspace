"use client";

import { useEffect, useRef, useState } from "react";

export default function StatsCounter() {
  const containerRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [seats, setSeats] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [books, setBooks] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!triggered) return;

    const duration = 1200; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const targets = {
      seats: 120,
      speed: 300,
      books: 5000,
      days: 7
    };

    const counterInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      // Easing function (easeOutQuad)
      const ease = progress * (2 - progress);

      setSeats(Math.floor(targets.seats * ease));
      setSpeed(Math.floor(targets.speed * ease));
      setBooks(Math.floor(targets.books * ease));
      setDays(Math.floor(targets.days * ease));

      if (frame >= totalFrames) {
        setSeats(targets.seats);
        setSpeed(targets.speed);
        setBooks(targets.books);
        setDays(targets.days);
        clearInterval(counterInterval);
      }
    }, frameRate);

    return () => clearInterval(counterInterval);
  }, [triggered]);

  return (
    <div
      ref={containerRef}
      className="-mt-8 lg:-mt-12 relative z-30 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
    >
      {/* Card 1 */}
      <div className="bg-bg-warm-elevated rounded-[2.5rem] border border-stone-200/50 p-10 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 ease-out min-h-[200px]">
        <h3 className="shrimp-display text-4xl lg:text-5xl text-ink-primary font-bold">
          {seats}+
        </h3>
        <p className="text-sm font-semibold text-ink-secondary leading-snug mt-6">
          Ergonomic Premium Seats Allocated
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-bg-warm-elevated rounded-[2.5rem] border border-stone-200/50 p-10 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 ease-out min-h-[200px]">
        <h3 className="shrimp-display text-4xl lg:text-5xl text-ink-primary font-bold">
          {speed} Mbps
        </h3>
        <p className="text-sm font-semibold text-ink-secondary leading-snug mt-6">
          Blazing Wi-Fi Fiber Infrastructure
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-bg-warm-elevated rounded-[2.5rem] border border-stone-200/50 p-10 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 ease-out min-h-[200px]">
        <h3 className="shrimp-display text-4xl lg:text-5xl text-ink-primary font-bold">
          {books.toLocaleString()}+
        </h3>
        <p className="text-sm font-semibold text-ink-secondary leading-snug mt-6">
          Premium Magazines & Reference Books
        </p>
      </div>

      {/* Card 4 - Urgent opening badge */}
      <div className="bg-bg-warm-elevated rounded-[2.5rem] border border-stone-200/50 p-10 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-500 ease-out min-h-[200px] relative overflow-hidden">
        {/* Pulsing halo aura in upper right */}
        <div className="absolute top-8 right-8 flex items-center justify-center w-6 h-6">
          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-accent-aqua-core opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent-aqua-core"></span>
        </div>
        
        <h3 className="shrimp-display text-4xl lg:text-5xl text-ink-primary font-bold">
          {days} Days Left
        </h3>
        <p className="text-sm font-semibold text-ink-secondary leading-snug mt-6">
          Grand Opening Launch Pending
        </p>
      </div>
    </div>
  );
}
