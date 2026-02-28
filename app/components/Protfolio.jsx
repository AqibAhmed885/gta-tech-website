"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef } from "react";
// Using CSS background images for clipped media and circle, so no next/image imports required here
import "./portfolio.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGlobe, FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { portfolioProjects } from "../../lib/data/portfolio.js";

const socialIconMap = {
  // website: { Icon: FaGlobe, label: "Website" },
  instagram: { Icon: FaInstagram, label: "Instagram" },
  linkedin: { Icon: FaLinkedinIn, label: "LinkedIn" },
  facebook: { Icon: FaFacebookF, label: "Facebook" },
  x: { Icon: FaXTwitter, label: "X" },
};

const getProjectSocialLinks = (project) => {
  if (!project?.socialLinks) return [];

  return Object.entries(project.socialLinks)
    .filter(([platform, url]) => socialIconMap[platform] && typeof url === "string" && url.trim())
    .map(([platform, url]) => ({
      platform,
      url,
      ...socialIconMap[platform],
    }));
};

const Protfolio = forwardRef((props, outerRef) => {
  // hover state not needed; using CSS group hover for overlays
  const clipPolygon = "polygon(0% 0%,100% 0%,100% 50%,0% 100%)";
  const altClipPolygon = "polygon(0% 0%,100% 0%,100% 100%,0% 50%)";
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [lightMode, setLightMode] = useState(false);

  // GSAP Sticky Scroll with Diagonal Movement
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".portfolio-flip-card");
      
      // Calculate total scroll distance
        // Calculate track and container widths for precise travel calculation
        const trackWidth = track.scrollWidth || (cards.length * 380 + (cards.length - 1) * 24);
        const containerWidth = section.clientWidth || window.innerWidth;
        const travel = Math.max(0, trackWidth - containerWidth);
      
      // Pin the section and create horizontal + diagonal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top+=40",
            end: () => `+=${travel}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate the track horizontally and diagonally
        // Move the track by the exact travel amount so all cards scroll into view
        tl.to(track, {
          x: -travel,
        ease: "none",
      });

      // Individual card animations: remove diagonal movement (horizontal-only)
      cards.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: section,
            start: "top top+=50",
              end: () => `+=${travel}`,
            scrub: 1,
          },
          y: 0, // no vertical offset
          rotation: 0, // keep cards upright
          scale: 1.05,
          ease: "none",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // track section progress and toggle lightMode
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId = null;

    function update() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = vh + rect.height;
      let p = (vh - rect.top) / total;
      p = Math.max(0, Math.min(1, p));

      const shouldLight = p > 0.35;
      setLightMode((prev) => (prev === shouldLight ? prev : shouldLight));

      rafId = null;
    }

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
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
      className={`md:py-6 pb-14 py-4 max-w-[1440px] h-screen mx-auto overflow-hidden md:overflow-visible transition-colors duration-500`}
    >
      <div className="px-4">
        <div className="flex  md:pt-8 pt-2 md:flex-row items-start justify-between md:mb-8 mb-4">
          <h1 className={`md:text-6xl text-3xl font-semibold uppercase  bg-linear-to-r from-[#0BC1A5] to-[#a200ff] bg-clip-text text-transparent  `}>Portfolio</h1>
            {/* <a
              href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#d489ff] to-[#a200ff] text-[#001E5F] font-bold hover:scale-105 transition-all"
            >
              View All Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a> */}
        </div>

        {/* Sticky Horizontal Scroll Container */}
        <div className="relative ">
          {/* track */}
          <div
            ref={trackRef}
            className="flex gap-6 py-2 px-2 will-change-transform"
          >
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className="portfolio-flip-card flex-none w-full md:w-[560px] min-h-[660px]  rounded-3xl perspective-1000"
                // onMouseEnter={() => setHoveredId(project.id)}
                // onMouseLeave={() => setHoveredId(null)}
              >
                <div className="card-inner w-full  h-full relative transition-all duration-500">
                  {/* FRONT OF CARD */}
                  <div className={`card-front bg-white rounded-4xl  absolute inset-0  overflow-hidden shadow-2xl`}> 
                    {/* Profile Image/Logo Circle */}
                    {/* <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl z-10">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#d489ff] to-[#a200ff] flex items-center justify-center">
                          <span className="text-white text-5xl font-bold">{project.name.charAt(0)}</span>
                        </div>
                      )}
                    </div> */}

                    
                      {/* Card media (clipped image) */}
                      {project.image && (
                        <div
                        className="absolute inset-0 z-0  md:w-[560px] w-full overflow-hidden  bg-linear-to-br from-[#d489ff] to-[#a200ff] card-media"
                          style={{
                            clipPath: index % 2 === 1 ? altClipPolygon : clipPolygon,
                            WebkitClipPath: index % 2 === 1 ? altClipPolygon : clipPolygon,
                          }}
                      >
                        {/* <div className="absolute inset-0 bg-black/30 z-10" /> */}
                        <div className={`flex ${index % 2 === 1 ? 'items-start justify-end' : 'items-end'} `} >
                          <img
                            src={project.image}
                            alt={project.name}
                            className="  h-auto max-h-[300px] md:w-[280px] w-[200px] object-contain transform transition-transform duration-700 p-8 hover:scale-105"
                          />
                        </div>
                        
                      </div>
                      )}
                      {/* Gradient Background */}
                    <div 
                      className="absolute inset-0 rounded-[30px] z-10"
                      // style={{
                      //   background: `linear-gradient(135deg, rgba(245,247,250,0) 0%, rgba(195,207,226,0.35) 100%)`
                      // }}
                    />

                    {/* Content (bottom area only) */}
                    <div className={`card-front-content absolute left-0 right-0 bottom-0 z-20 px-6 pb-6 flex flex-col ${index % 2 === 1 ? 'items-start' : 'items-end'}`}>
                      <h1 className="md:text-4xl text-xl uppercase font-semibold text-[#001E5F] mb-2 ">
                        {project.name}
                      </h1>
                      <p className="text-xl text-[#001E5F]/70 mb-4 ">
                        {project.category}
                      </p>
                      
                      {/* Motto/Tagline */}
                      <div className="bg-white/50 rounded-lg px-4 py-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block bg-[#d489ff]/10 text-[#001E5F] text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {getProjectSocialLinks(project).length > 0 && (
                        <div className="bg-white/50 rounded-lg px-4 py-2 w-full">
                          <p className="text-xs font-semibold text-[#001E5F]/70 mb-2">Social</p>
                          <div className="flex items-center gap-2">
                            {getProjectSocialLinks(project).map(({ platform, url, Icon, label }) => (
                              <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="h-8 w-8 rounded-full border border-[#001E5F]/20 bg-white/70 text-[#001E5F] hover:border-[#a200ff] flex items-center justify-center transition-all"
                              >
                                <Icon className="w-4 h-4 text-[#001E5F]" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      

                     
                    </div>
                  </div>

                  
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
});

Protfolio.displayName = "Protfolio";

export default Protfolio;
