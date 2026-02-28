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
    name: "GD Marketing",
    url: "https://gdmarketing.us",
    logo: "https://gdmarketing.us/gdlogo.jpg",
    description:
      "Premium digital marketing and IT solutions. Custom software development, web & mobile apps, cloud services, and more.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Marketing Street",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "Customer Service",
      email: "hello@gdmarketing.us",
    },
    sameAs: [
      "https://twitter.com/gdmarketing",
      "https://linkedin.com/company/gdmarketing",
      "https://github.com/gdmarketing",
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
