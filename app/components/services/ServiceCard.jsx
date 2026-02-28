"use client";

import React from "react";
import Image from "next/image";

export default function ServiceSection({ 
  title,
  description,
  features = [],
  image, 
  reversed = false,
  // clipPolygon = 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)',
}) {
  return (
    <section className="service-section min-h-screen w-full flex items-center justify-center py-20 px-4 md:px-8 bg-transparent">
      <div className="max-w-[1480px] w-full h-3/5 mx-auto">
        <div
          className={`flex flex-col ${
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-8 lg:gap-16`}
        >
          {/* Image Side */}
          <div className="flex-1 w-full  service-image">
            <div className="relative w-full rounded-4xl aspect-square m-2 overflow-hidden " >


              {/* <div className="absolute inset-0 bg-linear-to-br from-[#5FAFDD] to-[#001E5F]z-10" /> */}
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform  duration-700 hover:scale-105 md:h-full h-[300px] "
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="flex-1 w-full service-text space-y-6">
            {/* <div className="inline-block px-4 py-2 rounded-full bg-[#5FAFDD]/10 border border-[#5FAFDD]/30 backdrop-blur-sm">
              <span className="text-sm font-semibold text-[#5FAFDD] tracking-wider uppercase">
                {subtitle || `Service ${String(index + 1).padStart(2, '0')}`}
              </span>
            </div> */}

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
              {title}
            </h2>

            <div className="w-20 h-1 bg-linear-to-r from-[#5FAFDD] to-[#4BAB54] rounded-full" />

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {description}
            </p>

            {/* Features List */}
            {features && features.length > 0 && (
              <ul className="space-y-3 pt-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200">
                    <svg
                      className="w-6 h-6 text-[#4BAB54] shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-base md:text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* <div className="flex gap-4 pt-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#5FAFDD] to-[#4BAB54] text-[#001E5F] font-bold text-sm hover:scale-105 transition-transform shadow-lg">
                Learn More
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
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#5FAFDD] text-[#5FAFDD] font-semibold text-sm hover:bg-[#5FAFDD]/10 transition-all">
                View Projects
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
