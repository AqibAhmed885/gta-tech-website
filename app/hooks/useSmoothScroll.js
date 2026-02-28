"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for smooth scrolling behavior using GSAP
 * Enhances the default scroll with easing and performance optimizations
 */
export default function useSmoothScroll() {
  useEffect(() => {
    // Enable smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (!target) return;

      const targetId = target.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetElement,
          offsetY: 80, // Account for sticky navbar
        },
        ease: "power3.inOut",
      });
    };

    document.addEventListener("click", handleSmoothScroll);

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      markers: false,
      toggleActions: "play none none reverse",
    });

    return () => {
      document.removeEventListener("click", handleSmoothScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
