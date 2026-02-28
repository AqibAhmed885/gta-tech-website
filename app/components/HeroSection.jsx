"use client";
import Image from "next/image";
import Prism from './Prism';

export default function HeroSection({
  h1 = "Insights &",
  highlightText = "Articles",
  subtext = "Thoughts on design, engineering, and product from our team.",
  backgroundImage = null, // url string
  backgroundVideo = null, // url string (mp4/webm)
  poster = null, // poster image for video
  overlay = true, // whether to show a semi-opaque overlay for readability
  overlayClass = "bg-black/60",
  usePrism = true, // render animated prism when no image/video provided
  // prismColor = '#039932',
  // prismTintStrength = 0.6
}) {
  return (
    <section className="relative w-full min-h-screen px-4 md:px-0  flex items-center  mb-12">
      {/* Background: video takes precedence over image */}
      {backgroundVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover -z-20"
          src={backgroundVideo}
          poster={poster || backgroundImage || undefined}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : backgroundImage ? (
        <div className="absolute inset-0 ">
          <Image src={backgroundImage} alt="" fill className="object-cover"  />
        </div>
        ) : usePrism ? (
          <div className="absolute inset-0 ">
            <Prism
              height={3.5}
              baseWidth={5.5}
              animationType="rotate"
              glow={1}
              noise={0.35}
              scale={3.6}
              hueShift={0.6}
              colorFrequency={0.0}
              bloom={1.2}
              suspendWhenOffscreen
            />
          </div>
      ) : (
        <div className="absolute inset-0 opacity-20 pointer-events-none -z-20">
          <div className="absolute top-40 left-20 w-96 h-96 bg-[#039932]/40 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#001E5F]/50 rounded-full blur-3xl" />
        </div>
      )}

      {/* Optional overlay above the media and below content */}
      {
        overlay && <div className={`absolute inset-0 ${overlayClass} z-10`} aria-hidden />
      }

      <div className="relative  max-w-[1440px] mx-auto  z-10">
        <h1 className="text-4xl md:text-7xl  uppercase s  lg:text-7xl font-semibold leading-tight text-white mb-6">
          {h1} {" "}
          <span className="bg-linear-to-r  from-[#039932] to-[#4BAB54] bg-clip-text text-transparent">
            {highlightText}
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 max-w-4xl  leading-relaxed">
          {subtext}
        </p>
      </div>
    </section>
  );
}
