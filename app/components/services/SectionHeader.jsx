"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeader({ title, subtitle }) {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const titleChars = headerRef.current?.querySelector(".section-title");
      const subtitleEl = headerRef.current?.querySelector(".section-subtitle");

      if (titleChars) {
        gsap.from(titleChars, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (subtitleEl) {
        gsap.from(subtitleEl, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
        });
      }

      // Decorative line animation
      const line = headerRef.current?.querySelector(".decorative-line");
      if (line) {
        gsap.from(line, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          scaleX: 0,
          duration: 1,
          delay: 0.4,
          ease: "power2.inOut",
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="text-center mb-12">
      <h2 className="section-title text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
        {title}
      </h2>
      
      {subtitle && (
        <p className="section-subtitle text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      {/* Decorative gradient line */}
      {/* <div className="flex justify-center mt-6">
        <div className="decorative-line h-1 w-24 bg-linear-to-r from-[#039932] to-[#001E5F] rounded-full" />
      </div> */}
    </header>
  );
}
