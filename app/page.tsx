'use client';
import React, { useRef } from "react";
import Script from "next/script";
import Hero from "./components/Hero";
import LogoSlider from "./components/LogoSlider";
import Services from "./components/Services";
import Cards from "./components/Cards";
import Protfolio from "./components/Protfolio";
import useHomeAnimations from "./hooks/useHomeAnimations";

export default function Home() {
  const heroRef = useRef(null);
  const logoSliderRef = useRef(null);
  const servicesRef = useRef(null);
  const cardsRef = useRef(null);
  const portfolioRef = useRef(null);

  useHomeAnimations({
    heroRef,
    logoSliderRef,
    servicesRef,
    cardsRef,
    portfolioRef,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GTA Tech Solutions",
    url: "https://gtatechsolutions.com",
    logo: "https://gtatechsolutions.com/gta-logo.png",
    description:
      "AI-powered technology and growth solutions including custom software development, web and mobile apps, cloud modernization, cybersecurity, and digital strategy.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3030 Shadowbriar Dr",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77082",
      addressCountry: "US"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "Customer Service",
      email: "info@gtatechsolutions.com",
    },
    sameAs: [
      "https://twitter.com/gtatechsolutions",
      "https://linkedin.com/company/gtatechsolutions",
      "https://github.com/gtatechsolutions",
    ],
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Full-bleed hero */}
      <Hero ref={heroRef} />

      {/* Constrained site content */}
      <div className=" mx-auto">
        {/* <LogoSlider ref={logoSliderRef} /> */}
        <Services ref={servicesRef} />
        {/* <DaysSection /> */}
        <Cards ref={cardsRef} />
        <div className="w-full overflow-hidden">
          <Protfolio ref={portfolioRef} />

        </div>
       </div>
    </>
  );
}
