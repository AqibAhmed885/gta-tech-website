"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import { portfolioProjects } from '../../lib/data/portfolio';
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import { FaGlobe, FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

// const categories = ["All", ...Array.from(new Set(portfolioProjects.map((p) => p.category))).sort()];

const projects = portfolioProjects;

const socialIconMap = {
  website: { Icon: FaGlobe, label: "Website" },
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

export default function PortfolioPageContent() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const lenisRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // toggle modal open when selectedProject changes
    setModalOpen(Boolean(selectedProject));
  }, [selectedProject]);

  // prevent body scroll when modal is open
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);
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

      // Grid animation
      if (gridRef.current) {
        gsap.from(gridRef.current.querySelectorAll(".project-card"), {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div className="relative w-full bg-transparent ">
      {/* Hero Section */}
      <HeroSection
        ref={heroRef}
        h1="What"
        highlightText="We Have Done"
        subtext="Explore our successful projects and see how we&apos;ve helped businesses
            transform their digital presence and achieve remarkable results."
        backgroundImage={'https://images.unsplash.com/photo-1423768164017-3f27c066407f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
      />

      {/* Filter Section */}
      {/* <section className="w-full sticky top-8 z-30  px-4 md:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  scrollTo(0, gridRef.current.offsetTop - 100);
                }}
                className={`px-6 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === category
                  ? "bg-linear-to-r from-[#d489ff] to-[#a200ff] text-[#001E5F]"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Projects Grid */}
      <section ref={gridRef} className="relative w-full px-4  py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`project-card group  min-h-[520px]  cursor-pointer`}
                onClick={() => setSelectedProject(project)}

              >
                <div
                  className="roverflow-hidden rounded-4xl overflow-hidden bg-white/5 h-full backdrop-blur-md border border-white/10 hover:border-[#d489ff]/50 transition-all hover:scale-105"

                >
                  <div className={`relative aspect-video overflow-hidden flex ${idx % 2 === 1 ? 'items-start justify-end' : 'items-end'}`}>
                    <Image
                      src={project.logo}
                      alt={project.name}
                      fill
                      className="object-contain p-12   bg-linear-to-r from-[#d489ff]  to-[#a200ff] transition-transform duration-500 group-hover:scale-110"

                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-white font-semibold">
                        View Details →
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-[#d489ff] px-3 py-1 rounded-full bg-[#d489ff]/10">
                        {project.category}
                      </span>
                      {project.year && (
                        <span className="text-xs text-gray-400">
                          {project.year}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.name}
                    </h3>

                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-gray-400 px-2 py-1 rounded bg-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {getProjectSocialLinks(project).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-xs font-semibold text-gray-400 mb-2">Social</p>
                        <div className="flex items-center gap-2">
                          {getProjectSocialLinks(project).map(({ platform, url, Icon, label }) => (
                            <Link
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              onClick={(event) => event.stopPropagation()}
                              className="h-8 w-8 rounded-full border border-white/20 bg-white/5 text-gray-200 hover:text-white hover:border-[#d489ff]/50 flex items-center justify-center transition-all"
                            >
                              <Icon className="w-4 h-4" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex bg-black/40 overflow-hidden items-start justify-end  backdrop-blur-md transition-opacity duration-900 ${modalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => {
            setModalOpen(false);
            setTimeout(() => setSelectedProject(null), 900);
          }}
        >
          <div
            className={`relative w-full max-w-[90vw] h-full md:h-full bg-[#0a0a0a] rounded-tl-3xl overflow-auto border border-white/20 shadow-2xl transform transition-transform duration-900 ${modalOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setModalOpen(false); setTimeout(() => setSelectedProject(null), 300); }}
              className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              ✕
            </button>

            <div className="relative w-full h-56 md:h-72 lg:h-96 overflow-hidden">
              <Image
                src={selectedProject.image}
                alt={selectedProject.name}
                fill
                className="object-contain px-4 md:px-24 bg-linear-to-r from-[#d489ff]  to-[#a200ff]"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-[#d489ff] px-4 py-2 rounded-full bg-[#d489ff]/10">
                  {selectedProject.category}
                </span>
                {selectedProject.year && <span className="text-sm text-gray-400">{selectedProject.year}</span>}
              </div>

              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                {selectedProject.name}
              </h2>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {selectedProject.client && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Client</h4>
                    <p className="text-white font-medium">{selectedProject.client}</p>
                  </div>
                )}
                {selectedProject.results && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Results</h4>
                    <p className="text-[#d489ff] font-medium">{selectedProject.results}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm text-white px-4 py-2 rounded-full bg-white/10 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {getProjectSocialLinks(selectedProject).length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Social</h4>
                  <div className="flex items-center gap-3">
                    {getProjectSocialLinks(selectedProject).map(({ platform, url, Icon, label }) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="h-10 w-10 rounded-full border border-white/20 bg-white/5 text-gray-200 hover:text-white hover:border-[#d489ff]/50 flex items-center justify-center transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div>
                {selectedProject.desc && (
                  <><h4 className="text-sm font-semibold text-gray-400 mb-3">Project Details</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.desc}
                  </p>
                  </>
                )}
              </div>

              <div className="flex gap-4 mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-nowrap gap-2 md:px-6 px-3 py-1.5 md:py-3 rounded-full bg-linear-to-r from-[#d489ff] to-[#a200ff] text-[#001E5F] font-semibold hover:scale-105 transition-transform"
                >
                  Start Your Project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                {selectedProject.link && (
                  <Link
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 md:px-6 px-3 md:py-3 py-2 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
                  >
                    View Live
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="relative w-full px-4  py-24 md:py-32"
        style={{
          backgroundImage: ' url(https://cdn.prod.website-files.com/6674e87be00bef7a7b0c2d42/6674e87be00bef7a7b0c2dc8_pattern-01.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundColor: 'rgba(0,0,0,0.75)',  
          backgroundBlendMode: 'overlay',   
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-4xl  p-8 md:p-24 text-center overflow-hidden">
            {/* <div className="absolute inset-0 backdrop-blur-sm" /> */}

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-semibold text-white mb-6 ">
                Let&apos;s Something  Amazing
              </h2>
              <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
                Have a project in mind? Let&apos;s discuss how we can bring your
                vision to life.
              </p>
              <div className="flex text-nowrap gap-4 justify-center items-center">
                <Link
                  href="/contact"
                  className="inline-flex relative w-64 h-16 items-center gap-5 pl-6 tracking-wider p-2 rounded-full border font-medium text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
                >
                  Get in Touch
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-2 p-2 w-12 h-12 -rotate-45 rounded-full bg-green-600 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
