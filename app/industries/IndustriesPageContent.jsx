"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import {
  FiTrendingUp,
  FiHeart,
  FiShoppingBag,
  FiBookOpen,
  FiCpu,
  FiTruck,
  FiZap,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

const IconCircle = ({ children, className = "" }) => (
  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${className}`}>{children}</div>
);

const industries = [
  {
    id: "finance",
    title: "Finance & Fintech",
    summary: "Modern payment rails, secure data flows, and real-time analytics for fintech startups and banks.",
    details:
      "We help banking and financial platforms move fast without sacrificing compliance or security — building transactional systems, reconciliation pipelines, and real-time insights.",
    icon: FiTrendingUp,
  },
  {
    id: "health",
    title: "Healthcare & Life Sciences",
    summary: "Secure patient systems, interoperability, and AI-assisted workflows that scale.",
    details:
      "From interoperability to clinical data platforms, we build systems that respect privacy (HIPAA/GDPR compatible patterns), provide auditability, and enable remote care.",
    icon: FiHeart,
  },
  {
    id: "ecommerce",
    title: "E‑commerce & Retail",
    summary: "Headless storefronts, inventory sync, and conversion-first UX.",
    details:
      "We design resilient e‑commerce platforms with server-side rendering, smart caches, and APIs that keep cart and checkout fast across regions.",
    icon: FiShoppingBag,
  },
  {
    id: "education",
    title: "Education & Edtech",
    summary: "Engaging learning experiences, assessment systems, and secure content management.",
    details:
      "We build platforms that scale to classrooms and enterprises, with analytics for educators and accessible UI patterns for learners.",
    icon: FiBookOpen,
  },
  {
    id: "manufacturing",
    title: "Manufacturing & IoT",
    summary: "Reliable device ingestion, edge-to-cloud pipelines, and predictive maintenance.",
    details:
      "We help connect OT and IT, build reliable ingestion layers, and deploy ML-powered predictive maintenance workflows.",
    icon: FiCpu,
  },
  {
    id: "logistics",
    title: "Logistics & Fleet",
    summary: "Route optimisation, telematics, and real-time tracking for fleets and couriers.",
    details:
      "Our systems handle location streams, efficient routing, and visibility dashboards to keep operations lean and responsive.",
    icon: FiTruck,
  },
  {
    id: "energy",
    title: "Energy & Utilities",
    summary: "Grid analytics, renewables orchestration, and demand response tools.",
    details:
      "We build telemetry platforms and control planes for modern energy assets, emphasizing security and resiliency.",
    icon: FiZap,
  },
  {
    id: "gov",
    title: "Government & Public Sector",
    summary: "Citizen services, transparency portals, and secure identity solutions.",
    details:
      "We work on high-assurance systems for governments: identity, service delivery, and open data initiatives with strong privacy controls.",
    icon: FiShield,
  },
];

export default function IndustriesPageContent() {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const SelectedIcon = selected ? selected.icon : null;

  return (
    <section className=" mx-auto ">
          <HeroSection
              h1="Industries"
              highlightText="We Serve"
              // backgroundImage={'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 max-w-[1440px] mx-auto md:px-10 px-4 py-16">
        {industries.map((it) => {
          const Icon = it.icon;
          return (
            <article
              key={it.id}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.04] p-6 shadow-lg shadow-black/20 ring-1 ring-white/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-[#039932]/30"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-[1px] transition duration-300 group-hover:opacity-100" aria-hidden>
                <div className="absolute -left-10 -top-16 h-40 w-40 rounded-full bg-[#0B67A5]/30" />
                <div className="absolute -right-12 -bottom-14 h-44 w-44 rounded-full bg-[#4BAB54]/25" />
              </div>

              <div className="relative flex flex-col gap-4">
                <div className="flex flex-col items-start gap-4">
                  <IconCircle className="">
                    <Icon className="h-9 w-9 text-[#039932]" />
                  </IconCircle>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold leading-tight text-white">
                      <p>{it.title}</p>
                    </h3>
                    <p className="text-sm text-gray-300">
                      {it.summary}
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setSelected(it)}
                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#039932] to-[#4BAB54] px-4 py-2 text-sm font-semibold text-[#001E5F] shadow shadow-black/20 transition duration-200 hover:shadow-lg hover:shadow-[#4BAB54]/30"
                  >
                    Learn more
                    <FiArrowRight className="h-4 w-4" />
                  </button>

                  <Link
                    href="/services"
                    className="text-sm font-semibold text-white/90 transition hover:text-white"
                  >
                    See services
                  </Link>
                </div> */}
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center px-4`} role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative max-w-2xl w-full rounded-2xl bg-[#071017]/95 border border-white/5 p-6 shadow-2xl transition-transform duration-300 transform scale-100">
            <div className="flex items-start gap-4">
              <div className="flex-none">
                <IconCircle className="bg-linear-to-br from-[#053B5A] to-[#0B67A5] text-white ring-1 ring-white/5">
                  {SelectedIcon && <SelectedIcon className="h-9 w-9" />}
                </IconCircle>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
                <p className="text-gray-300 mt-3">{selected.details}</p>

                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
                  <li className="bg-white/3 p-3 rounded-lg">Scalable architecture</li>
                  <li className="bg-white/3 p-3 rounded-lg">Security & compliance</li>
                  <li className="bg-white/3 p-3 rounded-lg">Cloud native ops</li>
                  <li className="bg-white/3 p-3 rounded-lg">Data & analytics</li>
                </ul>

                <div className="mt-6 flex gap-3">
                  <Link href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-[#039932] to-[#4BAB54] text-[#001E5F] font-semibold">Talk to us</Link>
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
