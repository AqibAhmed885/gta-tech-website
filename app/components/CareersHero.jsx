"use client";

import React from 'react';

export default function CareersHero() {
  return (
    <section className="relative w-full min-h-[60vh] px-4 md:px-20 py-20 md:py-28 flex items-center mb-12">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-12 left-10 w-72 h-72 bg-[#039932]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-10 w-72 h-72 bg-[#001E5F]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Join our team
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mb-6">
            We’re building fast, resilient products and we’re looking for talented people who care about design, engineering and great user experiences.
          </p>
          <div className="flex gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-linear-to-r from-[#039932] to-[#4BAB54] text-[#001E5F] font-semibold shadow-md hover:brightness-105 transition">Contact us</a>
            <a href="#open-roles" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/90 hover:text-white transition">View roles</a>
          </div>
        </div>

        {/* <div className="hidden md:block bg-white/5 p-6 rounded-2xl border border-white/5">
          <h4 className="text-lg font-semibold text-white mb-2">Why work with us</h4>
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
            <li>Work on meaningful products used by real customers</li>
            <li>Flexible remote-first culture</li>
            <li>Competitive compensation and benefits</li>
          </ul>
        </div> */}
      </div>
    </section>
  );
}