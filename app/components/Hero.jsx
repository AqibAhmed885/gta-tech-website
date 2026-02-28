"use client";

import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = forwardRef((props, ref) => {
  const slides = [
    {
      badge: "Our Mission",
      title: "Innovating Through",
      titleHighlight: "Empowering Digital",
      description:
        "We're passionate about turning visionary concepts into powerful digital experiences. Every project is an opportunity to create something extraordinary that makes a real impact on people's lives.",
      ctaText: "Discover Our Story",
      ctaLink: "/about",
      gradient: "from-[#2563EB] to-[#7C3AED]",
      bgVideo: "https://www.pexels.com/download/video/28872822/",
    },
    {
      badge: "Our Vision",
      title: "Building The",
      titleHighlight: "Future Together",
      description:
        "We believe in collaboration, creativity, and pushing boundaries. Our team is driven by the desire to solve complex challenges and deliver solutions that exceed expectations every single time.",
      ctaText: "Join Our Journey",
      ctaLink: "/services",
      gradient: "from-[#7C3AED] to-[#2563EB]",
      bgVideo: "https://www.pexels.com/download/video/3997967/"
    },
    {
      badge: "Our Passion",
      title: "Creating Experiences",
      titleHighlight: "That Inspire",
      description:
        "Design isn't just what we do—it's how we think. We're obsessed with crafting beautiful, intuitive experiences that connect with users emotionally and drive meaningful engagement.",
      ctaText: "See Our Work",
      ctaLink: "/portfolio",
      gradient: "from-[#2563EB] via-[#2563EB] to-[#7C3AED]",
      bgVideo: "https://www.pexels.com/download/video/854325/",
    },
    {
      badge: "Our Commitment",
      title: "Excellence In",
      titleHighlight: "Every Detail",
      description:
        "Quality isn't negotiable. We're committed to delivering flawless solutions with meticulous attention to detail, ensuring your digital presence stands out and performs brilliantly.",
      ctaText: "Start Your Project",
      ctaLink: "/contact",
      gradient: "from-[#7C3AED] via-[#2563EB] to-[#2563EB]",
      bgVideo: "https://www.pexels.com/download/video/1824697/"
    },
  ];

  // Deterministic initial slide to avoid SSR/CSR mismatch
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 1200);
    }
  };

  const slide = slides[currentSlide];

  return (
    <section ref={ref} className="relative w-full min-h-screen md:px-0 px-0  mx-auto flex items-center justify-center overflow-hidden">
      {/* Background media: video prioritized over image */}
      {slide.bgVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover "
          src={slide.bgVideo}
          poster={slide.poster || slide.bgImage || undefined}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : slide.bgImage ? (
        <div className="absolute inset-0 ">
          <Image src={slide.bgImage} alt="" fill className="object-cover" priority />
        </div>
      ) : (
        <div className={`absolute inset-0  opacity-50 blur-4xl`} />
      )}

      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/50 " aria-hidden />

      <div className="relative   w-full">
        <div className="relative flex flex-col justify-between   p-8 md:px-12 lg:px-16 overflow-hidden   rounded-4xl ">
          
          
          <div className="relative z-10 flex flex-col mx lg:flex-row items-center gap-12">
            {/* Left content */}
            <div className={`flex-1 transition-all items-center duration-500 ${isAnimating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl uppercase lg:text-7xl   inline-block leading-tight font-semibold text-white mb-6">
                {slide.title}
                <br />

                <span className={`bg-linear-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                  {slide.titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg  md:p-4 text-gray-300 mb-8 max-w-3xl leading-relaxed">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={slide.ctaLink}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r ${slide.gradient} text-white text-sm font- shadow-lg hover:scale-105 transition-transform`}
                >
                  {slide.ctaText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>

                <a
                  href="/contact"
                  className="px-6 py-3 rounded-full border-2 border-[#d489ff] text-[#d489ff] hover:bg-[#d489ff]/10 hover:border-[#d489ff]/80 transition-all text-sm font-medium"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Right decorative image */}
            <div className={` md:absolute relative right-0  md:w-[600px] md:h-[600px] transition-all duration-500 `}>
              {/* <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} rounded-full blur-3xl opacity-30 animate-pulse`} /> */}
              {/* <Image
                src="/B1.png"
                alt="Decorative mark"
                width={500}
                height={500}
                className="object-contain md:mt-64 mt-0 drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                priority
              /> */}
            </div>
          </div>

          {/* Slider indicators */}
          <div className="relative z-10 flex justify-center gap-1 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
                  ? `w-6 bg-linear-to-r ${slide.gradient}`
                  : "w-1 bg-[#2563EB]/50 hover:bg-[#d489ff]/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;