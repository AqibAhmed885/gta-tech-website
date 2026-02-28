"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for Home Page GSAP animations
 * Handles all scroll-triggered and initial animations
 * @param {Object} refs - Object containing all component refs
 */
export default function useHomeAnimations(refs) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return; // Skip animations if user prefers reduced motion
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // ========================================
      // 1. HERO SECTION ANIMATIONS
      // ========================================
      if (refs.heroRef?.current) {
        const hero = refs.heroRef.current;
        
        // Hero content elements
        const title = hero.querySelector("h1");
        const description = hero.querySelector("p");
        const buttons = hero.querySelectorAll("a");
        const decorativeImage = hero.querySelector(".hero-decorative-image");

        // Initial state
        gsap.set([title, description, buttons], { autoAlpha: 0, y: 50 });

        // Stagger animation timeline
        const heroTl = gsap.timeline({
          delay: 0.3,
          defaults: { ease: "power3.out", duration: 1 },
        });

        heroTl
          .to(title, { autoAlpha: 1, y: 0 })
          .to(description, { autoAlpha: 1, y: 0 }, "-=0.6")
          .to(
            buttons,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              stagger: 0.15,
              ease: "back.out(1.2)",
            },
            "-=0.4"
          );

        // Parallax background image
        if (decorativeImage) {
          gsap.to(decorativeImage, {
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
            y: 150,
            scale: 1.1,
            ease: "none",
          });
        }
      }

      // ========================================
      // 2. LOGO SLIDER ANIMATIONS
      // ========================================
      if (refs.logoSliderRef?.current) {
        const logoSection = refs.logoSliderRef.current;
        const logos = logoSection.querySelectorAll(".group");

        gsap.from(logos, {
          scrollTrigger: {
            trigger: logoSection,
            start: "top 80%",
            once: true,
          },
          autoAlpha: 0,
          scale: 0.8,
          rotation: -10,
          stagger: 0.08,
          duration: 0.8,
          ease: "back.out(1.4)",
        });

        // Subtle rotation on scroll
        gsap.to(logos, {
          scrollTrigger: {
            trigger: logoSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          rotation: 5,
          ease: "none",
        });
      }

      // ========================================
      // 3. SERVICES SECTION ANIMATIONS
      // ========================================
      if (refs.servicesRef?.current) {
        const servicesSection = refs.servicesRef.current;
        const serviceItems = servicesSection.querySelectorAll("[data-index]");
        const sectionTitle = servicesSection.querySelector("h2");

        // Title reveal with clip-path
        if (sectionTitle) {
          gsap.from(sectionTitle, {
            scrollTrigger: {
              trigger: sectionTitle,
              start: "top 85%",
              once: true,
            },
            clipPath: "inset(0 100% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
          });
        }

        // Service items stagger animation
        serviceItems.forEach((item, index) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
            autoAlpha: 0,
            y: 60,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
          });
        });
      }

      // ========================================
      // 4. CARDS SECTION (Why Choose Us)
      // ========================================
      if (refs.cardsRef?.current) {
        const cardsSection = refs.cardsRef.current;
        const cards = cardsSection.querySelectorAll(".flex-1, .rounded-4xl");

        cards.forEach((card, index) => {
          // Determine slide direction (alternating)
          const xValue = index % 2 === 0 ? -80 : 80;

          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
            autoAlpha: 0,
            x: xValue,
            scale: 0.9,
            rotation: index % 2 === 0 ? -3 : 3,
            duration: 1,
            ease: "power3.out",
          });

          // Parallax on hover (subtle)
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
      }

      // ========================================
      // 5. PORTFOLIO SECTION ANIMATIONS
      // ========================================
      if (refs.portfolioRef?.current) {
        const portfolioSection = refs.portfolioRef.current;
        const portfolioTitle = portfolioSection.querySelector("h2");
        const portfolioCards =
          portfolioSection.querySelectorAll(".snap-center");
        const viewAllButton = portfolioSection.querySelector("a[href='/portfolio']");

        // Title reveal animation
        if (portfolioTitle) {
          gsap.from(portfolioTitle, {
            scrollTrigger: {
              trigger: portfolioTitle,
              start: "top 85%",
              once: true,
            },
            autoAlpha: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        // Portfolio cards horizontal scroll parallax
        portfolioCards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "left 90%",
              once: true,
            },
            autoAlpha: 0,
            scale: 0.85,
            y: 30,
            duration: 0.8,
            delay: index * 0.05,
            ease: "power2.out",
          });
        });

        // CTA Button animation
        if (viewAllButton) {
          gsap.from(viewAllButton, {
            scrollTrigger: {
              trigger: viewAllButton,
              start: "top 90%",
              once: true,
            },
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "back.out(1.4)",
          });

          // Pulse effect
          gsap.to(viewAllButton, {
            scale: 1.05,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            paused: true,
          });
        }
      }

      // ========================================
      // 6. GENERAL PARALLAX BACKGROUNDS
      // ========================================
      const parallaxElements = document.querySelectorAll(
        "[data-parallax]"
      );
      
      parallaxElements.forEach((element) => {
        const speed = element.dataset.parallax || 0.5;
        
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: `${speed * 100}%`,
          ease: "none",
        });
      });

      // ========================================
      // 7. TEXT REVEAL ANIMATIONS
      // ========================================
      const textRevealElements = document.querySelectorAll(
        "[data-text-reveal]"
      );

      textRevealElements.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },
          clipPath: "inset(0 100% 0 0)",
          duration: 1,
          ease: "power3.inOut",
        });
      });

      // ========================================
      // 8. FADE-UP ELEMENTS
      // ========================================
      const fadeUpElements = document.querySelectorAll("[data-fade-up]");

      fadeUpElements.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
          autoAlpha: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // ========================================
      // 9. SCALE-IN ELEMENTS
      // ========================================
      const scaleInElements = document.querySelectorAll("[data-scale-in]");

      scaleInElements.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.2)",
        });
      });
    });

    // Cleanup
    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [refs]);

  return lenisRef;
}
