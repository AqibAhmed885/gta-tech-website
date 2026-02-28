"use client";
import React, { useEffect, useRef, useState } from "react";

export function StickyScroll({ content = [] }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, content.length);

    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setActive(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  return (
    <div ref={containerRef} className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <div className="space-y-8">
            {content.map((c, i) => (
              <div
                key={i}
                data-idx={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`cursor-pointer transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-60"
                }`}
              >
                <h3 className={`text-xl md:text-2xl font-semibold ${active === i ? 'text-[#d489ff]' : 'text-gray-200'}`}>
                  {c.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 mt-2">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="sticky top-24 h-[60vh] bg-transparent flex items-center justify-center rounded-md overflow-hidden">
            <div className="w-full h-full">
              {content.map((c, i) => (
                <div
                  key={i}
                  className={`w-full h-full transition-opacity duration-500 ${
                    active === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {c.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
