"use client";

import React, { useEffect, useRef, useState, forwardRef } from "react";

const Cards = forwardRef((props, outerRef) => {
  const sectionRef = useRef(null);
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = null;

    function update() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = vh + rect.height;
      let p = (vh - rect.top) / total; // 0..1 roughly when section moves through viewport
      p = Math.max(0, Math.min(1, p));

      // enter light mode when it's about 35% through the viewport (tweakable)
      const shouldLight = p > 0.35;
      setLightMode((prev) => (prev === shouldLight ? prev : shouldLight));

      raf = null;
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={(el) => {
      sectionRef.current = el;
      if (outerRef) {
        if (typeof outerRef === 'function') outerRef(el);
        else outerRef.current = el;
      }
    }}
      className={`w-full min-h-[80vh] flex justify-center py-12 transition-colors duration-500 ${lightMode ? 'bg-transparent text-[#001E5F]' : 'bg-white text-white'}`}>
      <div className="flex flex-col md:flex-row w-full max-w-[1440px] px-4 gap-8">
        {/* Left: Vision (taller card) */}
        <div className={`flex-1  p-8 md:p-10 flex rounded-4xl flex-col items-start min-h-[300px] shadow-sm transition-colors duration-500 ${lightMode ? 'bg-[#4BAB54] text-white' : 'bg-white text-[#001E5F] border border-gray-200 '}`}>
          <h3 className="text-3xl md:text-5xl uppercase font-semibold ">Vision</h3>
          <div className="flex items-start mt-6 gap-5">
            <span className={`w-20 h-20 hidden md:block rounded-full ${lightMode ? 'bg-[#E6EEF6]' : 'bg-[#DEDEE0]'} shrink-0`} />
            <p className="md:text-2xl text-lg leading-relaxed max-w-base">
              To be recognized as a cross-border branding and performance marketing agency defined by structured systems, creative intelligence, and long-term growth partnerships. </p>
          </div>
        </div>
        {/* Right column: stacked Mission + Values */}
        <div className="flex-1 flex flex-col h-full gap-8">
          <div className={` p-8 md:p-10 h-full rounded-4xl flex flex-col justify-center shadow-sm transition-colors duration-500 ${lightMode ? 'bg-[#3b3051] text-white' : 'bg-white text-[#001E5F] border border-gray-200 '}`}>
            <h1 className="text-3xl md:text-5xl uppercase font-semibold mb-4">Mission</h1>
            <p className="md:text-2xl mt-4 text-lg font-normal leading-relaxed max-w-base">
              To transform businesses into structured, scalable brands
              through strategic thinking, creative excellence, and
              measurable marketing execution.
            </p>
          </div>
          <div className={` p-8 md:p-10 h-full flex rounded-4xl flex-col justify-center shadow-sm transition-colors duration-500 ${lightMode ? 'bg-[#DEDEE0] text-black' : 'bg-white text-[#001E5F] border border-gray-200 '}`}>
            <h1 className="text-3xl md:text-5xl uppercase font-semibold mb-4">Values</h1>
            <p className="md:text-2xl text-lg mt-4 font-normal leading-relaxed  max-w-base">
              Strategic thinking, creative excellence, operational accountability, integrated execution, long-term partnerships, and performance transparency guide everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

Cards.displayName = "Cards";

export default Cards;