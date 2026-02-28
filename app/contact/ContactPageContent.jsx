"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { FiClock, FiMail, FiPhone } from "react-icons/fi";
import HeroSection from "../components/HeroSection";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: FiMail,
    title: "Email",
    detail: "info@gdmarketing.us",
    link: "mailto:info@gdmarketing.us",
  },
  {
    icon: FiPhone,
    title: "Phone",
    detail: "+1 626 379 2252",
    link: "tel:+16263792252",
  },
  {
    icon: FiClock,
    title: "Business Hours",
    detail: "Mon - Fri: 9:00 AM - 6:00 PM PST",
    link: null,
  },
];

// Map locations (dynamic): add/remove locations here
const locations = [
  {
    id: 'isb',
    name: 'Islamabad, Pakistan',
    address: 'G3FW+85M, Bahria Intellectual Village Bahria Town Intellectual Village, Rawalpindi, Pakistan',
    lat: 33.5233466,
    lng: 73.0954286,
  },
  {
    id: 'chi',
    name: 'Houston, United States',
    address: '3030 Shadowbriar Dr, Houston, TX 77082, United States',
    lat: 29.7310613,
    lng: -95.5999031,
  },
  {
    id: 'tor',
    name: 'Mississauga, Canada',
    address: '7152 Airport Rd, Mississauga, ON L4T 2H1, Canada',
    lat: 43.701637,
    lng: -79.645948,
  },

];

export default function ContactPageContent() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const lenisRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // selected map location index
  const [selectedLocation, setSelectedLocation] = useState(0);

  // helper to build a Google Maps embed URL for a lat/lng or address
  const getMapSrc = (loc) => {
    if (!loc) return '';
    // Use lat,lng embed (works well and adds a marker)
    return `https://maps.google.com/maps?q=${encodeURIComponent(loc.lat + ',' + loc.lng)}&z=15&output=embed`;
  };

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

    return () => {
      lenis.destroy();
    };
  }, []);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelector("h1"), {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(heroRef.current.querySelector("p"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        });
      }

      // Form animation
      if (formRef.current) {
        gsap.from(formRef.current.querySelectorAll(".form-field"), {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Contact info animation
      if (infoRef.current) {
        gsap.from(infoRef.current.querySelectorAll(".info-card"), {
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          scale: 0.9,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.2)",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* Hero Section */}
      <HeroSection
        h1="Let,s Build"
        highlightText="Togather"
        subtext="Have a project in mind? We’d love to hear about it. Get in touch and let’s discuss how we can help you achieve your goals."
        backgroundImage={'/contact-us.jpg'}
      />

      <div className="flex flex-col md:flex-row max-w-[1440px] mx-auto">
        {/* Contact Info Cards */}
        <section  className="relative md:w-1/3 w-full px-4  py-16">
          <div className="">
            <div className="grid grid-rows-3  gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="info-card p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#039932]/50 transition-all text-center"
                >
                  <div className="mb-4 flex justify-center text-[#4BAB54]">
                    <info.icon className="w-10 h-10" aria-hidden />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-base text-gray-300 hover:text-[#039932] transition-colors"
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={
                        info.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {info.detail}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-300">{info.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          ref={formRef}
          className="relative md:w-2/3 px-4 md:px-20 py-16 "
        >
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
                Send Us a Message
              </h2>
              <p className="text-gray-300 text-center mb-8">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 text-center">
                  ✓ Thank you! Your message has been sent successfully. We&apos;ll
                  be in touch soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="form-field">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.name ? "border-red-500" : "border-white/20"
                        } text-white placeholder-gray-500 focus:outline-none focus:border-[#039932] focus:ring-2 focus:ring-[#039932]/20 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.email ? "border-red-500" : "border-white/20"
                        } text-white placeholder-gray-500 focus:outline-none focus:border-[#039932] focus:ring-2 focus:ring-[#039932]/20 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="form-field">
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#039932] focus:ring-2 focus:ring-[#039932]/20 transition-all"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-field">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#039932] focus:ring-2 focus:ring-[#039932]/20 transition-all"
                      placeholder="+92 333 1506464"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="form-field">
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#039932] focus:ring-2 focus:ring-[#039932]/20 transition-all"
                  >
                    <option value="" className="bg-[#0a0a0a]">
                      Select a service
                    </option>
                    <option value="web" className="bg-[#0a0a0a]">
                      Web Development
                    </option>
                    <option value="mobile" className="bg-[#0a0a0a]">
                      Mobile Development
                    </option>
                    <option value="software" className="bg-[#0a0a0a]">
                      Custom Software
                    </option>
                    <option value="automation" className="bg-[#0a0a0a]">
                      Business Automation
                    </option>
                    <option value="branding" className="bg-[#0a0a0a]">
                      Branding & Marketing
                    </option>
                    <option value="cloud" className="bg-[#0a0a0a]">
                      Cloud Solutions
                    </option>
                    <option value="consulting" className="bg-[#0a0a0a]">
                      IT Consulting
                    </option>
                    <option value="other" className="bg-[#0a0a0a]">
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-field">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${errors.message ? "border-red-500" : "border-white/20"
                      } text-white placeholder-gray-500 focus:outline-none focus:border-[#039932] focus:ring-2 focus:ring-[#039932]/20 transition-all resize-none`}
                    placeholder="Tell us about your project..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-full bg-linear-to-r from-[#039932] to-[#4BAB54] text-[#001E5F] font-medium text-lg shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      

      {/* Map Section (dynamic locations) */}
      <section className="relative w-full px-4 md:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-white/10 h-[720px] md:h-[560px] bg-white/5 flex flex-col">
            {/* Location buttons */}
            <div className="p-4 flex gap-3 overflow-auto">
              {locations.map((loc, i) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(i)}
                  className={`px-4 py-2 rounded-full md:text-sm text-xs font-medium transition ${selectedLocation === i
                    ? 'bg-[#E6F9FF] text-[#158DB6] border border-[#CFF3FF]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Map iframe */}
            <div className="flex-1">
              <iframe
                src={getMapSrc(locations[selectedLocation])}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Location: ${locations[selectedLocation].name}`}
              ></iframe>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
