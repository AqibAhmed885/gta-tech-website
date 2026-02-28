"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Link from "next/link";
import Cards from "../components/Cards.jsx";
import HeroSection from "../components/HeroSection.jsx";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Projects Completed", value: 500, suffix: "+" },
  { label: "Happy Clients", value: 200, suffix: "+" },
  { label: "Team Members", value: 50, suffix: "+" },
];

const teamLeadership = [
  { name: "Rafy Fazal", role: "Chief Executive Officer", image: "/Image1.png" },
  { name: "Basir Anjum", role: "Head of Operations", image: "/Image2.png" },
  { name: "Shahryar Fazal", role: "Head of Business Development", image: "/Image3.png" },
];

const teamSpecialists = [
  { name: "Faizan Ahmed", role: "UI / UX Expert" },
  { name: "Sanan Mirza", role: "Senior Web Developer" },
  { name: "Darakhshan Anjum Ahmed", role: "Senior Content Strategist" },
  { name: "Momna Islam", role: "Google Paid Ads Specialist" },
  { name: "Muhammad Ajab Gul", role: "Senior Graphic Designer" },
  { name: "Hamza Ahmed", role: "Video Artist" },
  { name: "Shabeer", role: "Meta Ads Specialist" },
  { name: "Fatima", role: "UI/UX Designer" },
  { name: "Shamshair Ali", role: "Videographer" },
  { name: "Muhammad Mirza", role: "Social Media Executive" },
];

export default function AboutPageContent() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const lenisRef = useRef(null);

  const [animatedStats, setAnimatedStats] = useState(
    stats.map(() => ({ value: 0 }))
  );

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelector("h1"), {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(heroRef.current.querySelector("p"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        });
      }

      // Stats counter animation
      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            stats.forEach((stat, index) => {
              gsap.to(
                {},
                {
                  duration: 2,
                  ease: "power2.out",
                  onUpdate: function () {
                    const progress = this.progress();
                    setAnimatedStats((prev) => {
                      const newStats = [...prev];
                      newStats[index] = {
                        value: Math.floor(stat.value * progress),
                      };
                      return newStats;
                    });
                  },
                }
              );
            });
          },
        });
      }

      // Mission section
      if (missionRef.current) {
        gsap.from(missionRef.current.querySelectorAll(".mission-card"), {
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          y: 60,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        });
      }

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        ref={heroRef}
        h1="We Build Digital"
        highlightText="Experiences"
        subtext="GTA Tech Solutions is a team of engineers, strategists, and designers dedicated to helping businesses modernize with scalable digital products, AI-powered automation, and resilient cloud architecture."
        backgroundImage={'https://images.unsplash.com/photo-1452717602770-b78d1b2115e1?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
      />

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="relative w-full px-4 md:px-20 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative  text-center p-6  backdrop-blur-sm "
              >
                <div
                  className="absolute inset-0 -z-10  pointer-events-none bg-[#a200ff]"
                  style={{
                    clipPath: " polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
                    WebkitClipPath:
                      "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
           }}
                />
                <div className="absolute w-10 h-10 rounded-l-full top-0 md:left-4 left-0 bg-[#a200ff]" />
               
                {/* <div className="absolute w-10 h-10  bottom-4 right-4 bg-[#a200ff]" /> */}
                <div className="absolute w-10 h-10 rounded-r-full bottom-0 right-0 md:right-4 bg-[#a200ff]" />
                <div className="text-4xl md:text-6xl font-semibold text-[#001E5F] mb-2">
                  {animatedStats[index].value}
                  {stat.suffix}
                </div>
                <div className="text-sm md:text-lg text-gray-300 ">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Profile & Innovations Section */}
      <section className="relative w-full px-4 md:px-20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <article className="rounded-[64px_0px_64px_64px] bg-[#DEDEE0]  p-8 md:p-12 text-black"
          >
            <h2 className="text-4xl md:text-5xl uppercase font-semibold text-[#d489ff] leading-tight mb-6">
              Introduction
            </h2>
            {/* <h3 className="text-3xl md:text-5xl font-semibold text-[#d489ff] mb-6">
              Profile
            </h3> */}

            <p className="text-xl md:text-xl leading-relaxed mb-4">
              GTA Tech Solutions was built with a clear mission: to turn complex business challenges into practical, scalable technology outcomes.
            </p>

            <p className="text-xl md:text-xl leading-relaxed">
              What started as a focused digital team has evolved into a multidisciplinary solutions partner delivering AI automation, product engineering, cloud enablement, and secure enterprise-grade software for global clients.
            </p>
          </article>

          <article className="rounded-[56px_180px_56px_56px]  p-8 md:p-12 ">
            <h2 className="text-4xl md:text-5xl uppercase font-semibold text-[#d489ff] leading-tight mb-6">
              Innovations
            </h2>

            <p className="text-xl  leading-relaxed mb-4">
              We collaborate with startups, SMBs, and enterprises to design and build modern platforms using current web, mobile, data, and cloud technologies.
            </p>

            <p className="text-xl  leading-relaxed mb-4">
              By integrating systems, automating workflows, and applying product thinking, GTA Tech Solutions helps organizations improve user experience, operational efficiency, and time-to-market.
            </p>

            <p className="text-xl  leading-relaxed">
              Our end-to-end delivery model spans discovery, strategy, design, engineering, deployment, and long-term optimization for sustainable digital growth.
            </p>
          </article>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        ref={missionRef}
        className="relative w-full py-16 md:py-24"
      >
        <Cards />
      </section>

      

      {/* Team Section */}
      {/* <section className="relative w-full px-4 md:px-20 py-16 md:py-24 bg-[#DEDEE0]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto bg-[#d489ff] rounded-xl p-8 md:p-10 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">Our Team</h2>
            <p className="text-lg md:text-xl text-white leading-relaxed">
              Our team works collaboratively on every project, combining ideas and expertise to deliver effective solutions that leave our clients satisfied.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 md:mb-14 max-w-4xl mx-auto">
            {teamLeadership.map((member) => (
              <div key={member.name} className="text-center ">
                <div className="relative w-32 h-32 md:w-36 md:h-36 border-4 border-[#d489ff]  rotate-45 rounded-[72px_72px_4px_72px] overflow-hidden bg-[#d489ff] mx-auto mb-8">
                  <Image src={member.image} alt={member.name} fill sizes="200px" className="object-cover -rotate-45 grayscale" />
                </div>
                <h3 className="text-xl uppercase font-semibold text-black  leading-tight">{member.name}</h3>
                <p className="text-lg  text-black leading-tight">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamSpecialists.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 md:w-36 md:h-36 rotate-45 rounded-[72px_72px_4px_72px] bg-[#d489ff] mx-auto mb-8 flex items-center justify-center ">
                  <svg className="w-16 h-16 text-white -rotate-45 " viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12c2.761 0 5-2.462 5-5.5S14.761 1 12 1 7 3.462 7 6.5 9.239 12 12 12Zm0 2c-4.418 0-8 2.91-8 6.5 0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2 0-3.59-3.582-6.5-8-6.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl  font-semibold text-black leading-tight">{member.name}</h3>
                <p className="text-lg  text-black leading-tight">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
