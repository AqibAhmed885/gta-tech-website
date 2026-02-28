"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FiCheckCircle, FiClipboard, FiSearch, FiSend, FiZap } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import ServiceSection from "../components/services/ServiceCard";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import HeroSection from "../components/HeroSection";
import SectionHeader from "../components/services/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Branding & Marketing Solutions",
    subtitle: "Branding & Packaging",
    description:
      "We design brand systems — not just logos. Through strategic positioning, visual identity architecture, packaging design, and corporate brand documentation, we build brands that are clear, consistent, and commercially competitive.",
    features: [
      "Brand identity & logo design",
      "Marketing strategy & campaigns",
      "Social media management",
      "Content creation & copywriting",
      "SEO & performance marketing",
    ],
    image: "/services/brand.jpg",
  },
  {
    id: 2,
    title: "Production & Content",
    subtitle: "In-House Media Production & Social Growth Systems​",
    description:
      "We combine professional commercial production with platform- specific social media execution.From Digital Video Commercials and brand shoots to reels, post systems, publishing, and ad management — every piece of content is created to strengthen brand perception anddrive measurable engagement.",
    features: [
      "Commercial video production",
      "Brand photography & shoots",
      "Social media content creation",
      "Reels & short-form video",
      "Content strategy & publishing systems",
    ],
    image: "/services/production.jpg",
  },
  {
    id: 3,
    title: "Software Development",
    subtitle: "Web / Mobile / Desktop",
    description:
      "Build powerful, scalable applications across all platforms. We deliver custom software solutions using cutting-edge technologies like React, Next.js, Node.js, and more. From MVPs to enterprise systems, we bring your vision to life.",
    features: [
      "Full-stack web applications",
      "iOS & Android mobile apps",
      "Cross-platform desktop apps",
      "Progressive Web Apps (PWA)",
      "API development & integration",
    ],
    image: "/services/software.webp",
  },
  {
    id: 4,
    title: "Custom Software Solutions",
    subtitle: "Tailored to Your Business",
    description:
      "Every business is unique. We create bespoke software solutions that perfectly align with your specific workflows, challenges, and goals. Our agile approach ensures flexibility and rapid delivery.",
    features: [
      "Enterprise resource planning (ERP)",
      "Customer relationship management (CRM)",
      "Inventory management systems",
      "E-commerce platforms",
      "SaaS product development",
    ],
    image: "/services/custom-software.webp",
  },
  {
    id: 5,
    title: "UI/UX Design",
    subtitle: "Beautiful, Intuitive Interfaces",
    description:
      "User experience is everything. We craft stunning, intuitive interfaces that delight users and drive engagement. Our design process combines research, prototyping, and rigorous testing.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design & branding",
      "Usability testing",
      "Design systems & component libraries",
    ],
    image: "/services/ui-ux.webp",
  },
  {
    id: 6,
    title: "Cloud Solutions",
    subtitle: "Scalable, Secure Infrastructure",
    description:
      "Harness the power of the cloud with AWS, Azure, and Google Cloud Platform. We handle architecture design, migration, deployment, monitoring, and ongoing optimization to ensure your apps run smoothly.",
    features: [
      "Cloud migration & deployment",
      "Infrastructure as Code (IaC)",
      "DevOps & CI/CD pipelines",
      "Containerization with Docker/Kubernetes",
      "Serverless architecture",
    ],
    image: "https://plus.unsplash.com/premium_photo-1683836722479-411e30b8b6e1?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    title: "Business Intelligence & Analytics",
    subtitle: "Data-Driven Decisions",
    description:
      "Turn your data into actionable insights. We build custom dashboards, analytics platforms, and reporting tools that empower you to make smarter, faster business decisions.",
    features: [
      "Data visualization & dashboards",
      "Predictive analytics & ML models",
      "Custom reporting solutions",
      "ETL & data warehousing",
      "Real-time analytics",
    ],
    image: "https://images.unsplash.com/photo-1738996747326-65b5d7d7fe9b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const processSteps = [
  {
    id: 1,
    title: "Setup",
    description:
      "We establish goals, timelines, and success metrics so every phase starts with clarity.",
    icon: FiCheckCircle,
  },
  {
    id: 2,
    title: "Discovery",
    description:
      "We learn your business, audience, and market through research, analysis, and strategic workshops.",
    icon: FiSearch,
  },
  {
    id: 3,
    title: "Design",
    description:
      "We translate strategy into impactful design systems, messaging, and visual direction.",
    icon: FiZap,
  },
  {
    id: 4,
    title: "Delivery",
    description:
      "Each cycle delivers validated assets and implementation-ready outputs for your team.",
    icon: FiClipboard,
  },
  {
    id: 5,
    title: "Deploy",
    description:
      "We launch, monitor performance, and optimize continuously to scale your brand impact.",
    icon: FiSend,
  },
];

const industries = [
  "E-Commerce",
  "Healthcare",
  "Real Estate",
  "Education",
  "Finance & FinTech",
  "Hospitality",
  "Logistics",
  "Professional Services",
  "Startups & SaaS",
  "Retail",
];

const engagementModels = [
  {
    id: 1,
    title: "Project-Based Delivery",
    description:
      "Ideal for fixed-scope initiatives with clear timelines, milestones, and outcomes.",
  },
  {
    id: 2,
    title: "Dedicated Team",
    description:
      "A focused cross-functional team that works as an extension of your in-house operation.",
  },
  {
    id: 3,
    title: "Ongoing Growth Partner",
    description:
      "Continuous optimization and strategic support for long-term marketing and technology growth.",
  },
];

export default function ServicesPageContent() {
  const heroRef = useRef(null);
  const horizontalRef = useRef(null);
  const lenisRef = useRef(null);

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
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Hero animation
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current.querySelector(".hero-badge"), {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(heroRef.current.querySelector(".hero-title"), {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(heroRef.current.querySelector(".hero-description"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Horizontal scroll hook
  useHorizontalScroll(horizontalRef, services.length);

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        ref={heroRef}
        h1="Our"
        highlightText="Services"
        subtext="At GD Marketing, we specialize in delivering comprehensive digital marketing and IT solutions tailored to your business needs. Our expertise spans software development, cloud computing, cybersecurity, data analytics, and IT consulting. Explore our range of services designed to drive innovation and efficiency."
        backgroundImage={'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
      />


      {/* Horizontal Scroll Services Section */}
      <div ref={horizontalRef} className="relative w-full">
        <div className="flex flex-col lg:flex-row lg:flex-nowrap w-full">
          {services.map((service, index) => (
            <div key={service.id} className="w-full lg:min-w-full">
              <ServiceSection
                title={service.title}
                description={service.description}
                features={service.features}
                image={service.image}
                reversed={index % 2 !== 0}
              />
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-[1480px] mx-auto px-4 md:px-8 py-20">
        <SectionHeader
          title="How We Deliver"
          subtitle="A proven process that keeps execution aligned with your business objectives."
        />

        <div className="hidden lg:block mt-12">
          <div className="grid grid-cols-5 gap-6 items-end min-h-[190px]">
            {processSteps.map((step, index) => (
              <div key={`top-${step.id}`}>
                {index % 2 === 1 && (
                  <article className="max-w-60 mb-10 text-center mx-auto">
                    <h3 className="text-3xl font-semibold uppercase text-white mb-2">{step.title}</h3>
                    <p className="text-base text-gray-300 leading-relaxed">{step.description}</p>
                  </article>
                )}
              </div>
            ))}
          </div>

          <div className="relative h-40">
            <svg viewBox="0 0 1000 160" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
              <path
                d="M90 80 C 130 80, 130 125, 170 125 C 210 125, 210 80, 250 80 C 290 80, 290 35, 330 35 C 370 35, 370 80, 410 80 C 450 80, 450 125, 490 125 C 530 125, 530 80, 570 80 C 610 80, 610 35, 650 35 C 690 35, 690 80, 730 80 C 770 80, 770 125, 810 125 C 850 125, 850 80, 890 80"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M90 80 C 130 80, 130 125, 170 125 C 210 125, 210 80, 250 80 C 290 80, 290 35, 330 35 C 370 35, 370 80, 410 80 C 450 80, 450 125, 490 125 C 530 125, 530 80, 570 80 C 610 80, 610 35, 650 35 C 690 35, 690 80, 730 80 C 770 80, 770 125, 810 125 C 850 125, 850 80, 890 80"
                fill="none"
                stroke="#4BAB54"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray="780 600"
              />
            </svg>

            <div className="absolute inset-0 grid grid-cols-5">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={`node-${step.id}`} className="relative flex items-center justify-center">
                    <span
                      className={`absolute ${index % 2 === 0 ? "-bottom-10" : "-top-10"} w-12 h-12 rounded-full bg-[#4BAB54] text-black text-2xl font-semibold flex items-center justify-center`}
                    >
                      {step.id}
                    </span>

                    <div className="w-36 h-36 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-[#4BAB54] text-black flex items-center justify-center">
                        <Icon className="w-16 h-16" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-6 items-start min-h-[190px] mt-2">
            {processSteps.map((step, index) => (
              <div key={`bottom-${step.id}`}>
                {index % 2 === 0 && (
                  <article className="max-w-60 mt-10 text-center mx-auto">
                    <h3 className="text-3xl font-semibold uppercase text-white mb-2">{step.title}</h3>
                    <p className="text-base text-gray-300 leading-relaxed">{step.description}</p>
                  </article>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden mt-10 space-y-6">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={`mobile-${step.id}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-[#4BAB54] text-black text-xl font-semibold flex items-center justify-center">
                    {step.id}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#4BAB54]/20 text-[#4BAB54] border border-[#4BAB54]/40 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-2xl text-white font-semibold uppercase mb-2">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
