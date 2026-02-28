"use client";

import Image from "next/image";
import Link from "next/link";
import MegaServicesMenu from "./MegaServicesMenu";
import megaServiceCategories from "../../lib/data/megaServices";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/about", label: "Who We Are" },
  { href: "/services", label: "What We Do" },
  { href: "/portfolio", label: "What We Done" },
  { href: "/contact", label: "Contact" },
  { href: "/blogs", label: "How We Think" },
  // { href: "/careers", label: "Explore With Us" }
  { href: "/industries", label: "Who We Help" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activated, setActivated] = useState(false); // becomes true after 300px scroll
  const [scrolled, setScrolled] = useState(false); // becomes true after 40px scroll
  const [stickyHover, setStickyHover] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const openMega = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  };
  const closeMegaDelayed = (delay = 120) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
      closeTimerRef.current = null;
    }, delay);
  };


  useEffect(() => {
    const onScroll = () => {
      const shouldActivate = window.scrollY > 300;
      const shouldShowSticky = window.scrollY > 40;
      setActivated((prev) => (prev !== shouldActivate ? shouldActivate : prev));
      setScrolled((prev) => (prev !== shouldShowSticky ? shouldShowSticky : prev));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  // Split nav items for left/right layout on desktop; exclude contact because CTA handles it
  const filteredNav = navItems.filter((n) => n.href !== "/contact");
 

  // Removed automatic close effect to satisfy lint; we'll close menu via onClick of mobile links.

  return (
    <header
      className={` z-50  mx-auto absolute top-0 left-0 right-0 transition-all duration-300  `}
    >
      <div className=" px-4 sm:px-6 lg:px-8 py-2 relative z-10  hover-lift"
      >
        <div className="relative flex items-center font-bold uppercase md:justify-between justify-between h-16">


          {/* Logo on the right */}
          <div className="flex items-center  justify-start md:justify-end">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/gta-logo.png"
                alt="GTA Tech Solutions logo"
                width={200}
                height={48}
                className="object-contain rounded-lg group-hover:scale-105 transition-transform"
                priority
              />
            </Link>
          </div>

          {/* Right nav + CTA (desktop) — render all items on right */}
          <div className="hidden md:flex items-center gap-6 justify-end">
            {filteredNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm tracking-wide transition-colors group`}
                  aria-expanded={item.href === '/services' ? megaOpen : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className={`${active ? 'text-[#d489ff]' : 'text-white group-hover:text-[#d489ff]'} font-medium`}>{item.label}</span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 w-full bg-[#d489ff] rounded transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </Link>
              );
            })}

            {/* <Link
              href="/contact"
              className="ml-2 inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#d489ff] font-semibold text-sm shadow-md hover:shadow-lg hover:brightness-110 transition"
            >
              <span className="text-[#d489ff]">Lets Talk Business</span>
            </Link> */}
          </div>

          

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-4 z-9998">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#d489ff]/30 text-[#d489ff] hover:bg-[#d489ff]/10 transition"
            >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            </button>
          </div>
        </div>
      </div>
      {/* <MegaServicesMenu items={megaServiceCategories} open={megaOpen} onOpen={openMega} onClose={() => closeMegaDelayed(0)} /> */}

      {/* Sticky compact navbar shown after scrolling 40px */}
      <div
        onMouseEnter={() => setStickyHover(true)}
        onMouseLeave={() => setStickyHover(false)}
        className={`fixed top-0 left-0 bg-white right-0 z-60 transition-transform duration-1200 ${scrolled ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mx-auto  w-full uppercase transition-all duration-1200 py-2 flex items-center justify-between `}>

            {/* Logo on the right (sticky) */}
            <div className={` flex items-center justify-end  mx-6 transition-all duration-1200 ${stickyHover ? 'scale-105' : ''}`}>
              <Link href="/" className="inline-flex items-center gap-2">
                <Image
                  src="/gta-logo.png"
                  alt="logo"
                  width={120}
                  height={20}
                  className="object-contain  group-hover:scale-105 transition-transform"
                  priority />

              </Link>
            </div>

            {/* Right items (appear on hover or on scroll) - all items on right */}
            <div className={`hidden md:flex items-center  gap-6 pr-6 transition-all duration-1200 ${(stickyHover || scrolled) ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-6 pointer-events-none'}`}>
              {filteredNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href}
                    href={item.href}
                    className="relative text-sm font-semibold group"
                  >
                    <span className={`${active ? 'text-[#2C303A]' : 'text-black/80 group-hover:text-[#001E5F]'}`}>
                      {item.label}
                    </span>
                    <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-[#d489ff]  rounded transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  </Link>
                );
              })}

              <Link key="contact-sticky" href="/contact" className="ml-2 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#001E5F] font-semibold text-sm shadow-md hover:shadow-lg hover:brightness-110 transition">
                <span className="text-[#001E5F]">Lets Talk</span>
              </Link>
            </div>

            

            {/* Mobile Menu Button */}
            <div className="md:hidden absolute right-4 z-9998">
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((o) => !o)}
                className="inline-flex items-center justify-center w-8 h-8 mr-6  text-black hover:bg-[#d489ff]/10 transition"
              >
                {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Panel */}
      <div
        className={`md:hidden fixed z-9999 inset-x-4 top-[85px] overflow-hidden transition-all duration-300 ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-0 rounded-3xl border border-white/5 bg-[#0b1115]/95 backdrop-blur-xl shadow-lg">
          <nav className="flex flex-col py-4 px-4 gap-2">
            {filteredNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                    active
                    ? "bg-linear-to-r from-[#a200ff] to-[#a200ff] text-white shadow"
                      : "text-gray-100 hover:bg-white/5 hover:text-white"
                    }`}
                  onClick={() => { setOpen(false); setMegaOpen(false); }}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-[#a200ff] to-[#a200ff] text-white font-semibold text-sm shadow-md"
              onClick={() => setOpen(false)}
            >
              Start a Project
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
