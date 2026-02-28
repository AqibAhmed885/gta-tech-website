"use client";

import Image from "next/image";
import React, { forwardRef } from "react";

const images = [
  "/vector.png",
  "/vector 1.png",
  "/vector 2.png",
  "/vector 3.png",
  "/vector 4.png",
];

const LogoSlider = forwardRef(({ speed = 30, gap = "4rem" }, ref) => {
  return (
    <section ref={ref} className="relative w-full md:py-20 py-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 " />
      

      <div className="relative max-w-7xl overflow-hidden mx-auto px-6">
        {/* Logo Marquee with gradient fade edges */}
        <div className="relative">
          {/* Left fade */}

          {/* Scrolling logos container */}
          <div className="overflow-hidden py-8">
            <div
              className="logo-marquee flex items-center"
              style={{
                gap: gap,
                width: "max-content",
                animation: `scroll ${speed}s linear infinite`,
              }}
            >
              {/* First set of logos */}
              {images.map((src, i) => (
                <div
                  key={`first-${i}`}
                  className="group relative shrink-0 p-6  transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src={encodeURI(src)}
                    alt={`Partner logo ${i + 1}`}
                    width={600}
                    height={400}
                    className="grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300 object-contain h-8 w-auto"
                  />
                </div>
              ))}
              {/* Second set of logos for seamless loop */}
              {images.map((src, i) => (
                <div
                  key={`second-${i}`}
                  className="group relative shrink-0 p-6 transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src={encodeURI(src)}
                    alt={`Partner logo ${i + 1}`}
                    width={600}
                    height={400}
                    className="grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300 object-contain h-8 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
});

LogoSlider.displayName = "LogoSlider";

export default LogoSlider;