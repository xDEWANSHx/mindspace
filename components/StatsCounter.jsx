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

  const stats = [
    {
      value: `${seats}+`,
      label: "Ergonomic Premium Seats Allocated",
      accent: "from-accent-aqua-core/10 to-transparent",
      border: "border-l-accent-aqua-core",
    },
    {
      value: `${speed} Mbps`,
      label: "Blazing Wi-Fi Fiber Infrastructure",
      accent: "from-accent-birch-wood/10 to-transparent",
      border: "border-l-accent-birch-wood",
    },
    {
      value: `${books.toLocaleString()}+`,
      label: "Premium Magazines & Reference Books",
      accent: "from-accent-aqua-core/10 to-transparent",
      border: "border-l-accent-aqua-core",
    },
    {
      value: `${days} Days Left`,
      label: "Grand Opening Launch Pending",
      accent: "from-accent-birch-wood/10 to-transparent",
      border: "border-l-accent-birch-wood",
      pulse: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative z-30 max-w-7xl mx-auto px-6 py-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-bg-warm-elevated rounded-2xl border border-stone-200/50 border-l-[3px] ${stat.border} p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-out min-h-[180px] relative overflow-hidden group`}
          >
            {/* Subtle gradient accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            {/* Pulse dot for urgency card */}
            {stat.pulse && (
              <div className="absolute top-6 right-6 flex items-center justify-center w-5 h-5">
                <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-accent-aqua-core opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-aqua-core"></span>
              </div>
            )}

            <h3 className="shrimp-display text-3xl lg:text-4xl text-accent-aqua-core font-bold relative z-10">
              {stat.value}
            </h3>
            <p className="text-sm font-medium text-ink-secondary leading-snug mt-4 relative z-10">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
