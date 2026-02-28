"use client";

import  { useEffect, useRef, useState, forwardRef } from "react";
import { gsap } from "gsap";


const services = [
  {
    number: "01",
    title: "Brand Development",
    subtitle: "Branding & Packaging",
    image: "https://picsum.photos/seed/cloud/800/600",
    description:
      "We design brand systems — not just logos. Through strategic positioning, visual identity architecture, packaging design, and corporate brand documentation, we build brands that are clear, consistent, and commercially competitive.",
  },
  {
    number: "02",
    title: "Production & Content",
    subtitle: "In-House Media Production & Social Growth Systems​",
    image: "https://picsum.photos/seed/sec/800/600",
    description:
      "We combine professional commercial production with platform- specific social media execution.From Digital Video Commercials and brand shoots to reels, post systems, publishing, and ad management — every piece of content is created to strengthen brand perception and drive measurable engagement.",
  },
  {
    number: "03",
    title: "Web Development",
    subtitle: "Frontend & Backend",
    image: "https://images.unsplash.com/photo-1666891827442-136490fc4140?q=80&w=2136&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Custom web applications built with cutting-edge technologies like React, Next.js, and Node.js. We create scalable, secure, and high-performance solutions tailored to your business needs.",
  },
  {
    number: "04",
    title: "Mobile Development",
    subtitle: "iOS & Android",
    image: "https://picsum.photos/seed/mobile/800/600",
    description:
      "Native and cross-platform mobile solutions that deliver beautiful user experiences. From concept to app store deployment, we build apps users love on both iOS and Android platforms.",
  },
  {
    number: "05",
    title: "UI/UX Design",
    subtitle: "Design & Prototyping",
    image: "https://picsum.photos/seed/uiux/800/600",
    description:
      "User-centered design that converts visitors into customers. We create intuitive interfaces, comprehensive design systems, and interactive prototypes using industry-leading tools like Figma.",
  },
  {
    number: "06",
    title: "Performance Optimization",
    subtitle: "Speed & SEO",
    image: "https://picsum.photos/seed/perf/800/600",
    description:
      "Make your applications blazingly fast with our optimization services. We improve Core Web Vitals, reduce load times, and enhance SEO to deliver exceptional user experiences.",
  },
];

const Services = forwardRef((props, outerRef) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const markRef = useRef(null);
  const [lightMode, setLightMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [visibleNumber, setVisibleNumber] = useState(services[0].number);
  const [prevNumber, setPrevNumber] = useState(null);
  const prevNumRef = useRef(null);
  const currNumRef = useRef(null);
  const numberAnimRef = useRef(null);
  const visibleNumberRef = useRef(services[0].number);
  // prevActiveRef starts at -1 so first mount triggers the animations for the active item
  const prevTitleRef = useRef(-1);
  const prevImageRef = useRef(-1);
  const titleAnimRef = useRef(null);
  const imageAnimRef = useRef(null);

  // intersection observer to update activeIndex based on which service is in view
  useEffect(() => {
    // create an intersection observer that considers the center of the viewport as the "anchor".
    itemRefs.current = itemRefs.current.slice(0, services.length);

    const createObserver = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // create a small center window by using negative top/bottom margins equal to half the viewport.
      const rootMargin = `-${Math.round(vh / 2)}px 0px -${Math.round(vh / 2)}px 0px`;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.dataset.index);
              if (idx !== activeIndexRef.current) {
                activeIndexRef.current = idx;
                setActiveIndex(idx);
              }
            }
          });
        },
        { root: null, rootMargin, threshold: [0] }
      );

      itemRefs.current.forEach((el) => el && observer.observe(el));
      return observer;
    };

    let observer = createObserver();

    const onResize = () => {
      if (observer) observer.disconnect();
      observer = createObserver();
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // whenever activeIndex changes (via IO or RAF), update visible/prev numbers
  useEffect(() => {
    // set prev and visible numbers so animation runs
    if (activeIndexRef.current != null) {
      setPrevNumber(visibleNumberRef.current);
      setVisibleNumber(services[activeIndexRef.current].number);
      visibleNumberRef.current = services[activeIndexRef.current].number;
    }
  }, [activeIndex]);

  // animate title/subtitle/description for previous/current active items
  useEffect(() => {
    if (!itemRefs.current) return;
    const prevIdx = prevTitleRef.current;
    const currIdx = activeIndex;
    if (prevIdx === currIdx) {
      prevTitleRef.current = currIdx;
      return;
    }

    const prevEl = itemRefs.current[prevIdx];
    const currEl = itemRefs.current[currIdx];
    const prevTitle = prevEl ? prevEl.querySelector('h2') : null;
    const prevSub = prevEl ? prevEl.querySelector('div.text-2xl') : null;
    const prevDesc = prevEl ? prevEl.querySelector('div.text-xl') : null;
    const currTitle = currEl ? currEl.querySelector('h2') : null;
    const currSub = currEl ? currEl.querySelector('div.text-2xl') : null;
    const currDesc = currEl ? currEl.querySelector('div.text-xl') : null;

    if (titleAnimRef.current) titleAnimRef.current.kill();
    const t = gsap.timeline({});
    // animate prev out
    if (prevTitle) t.to(prevTitle, { y: -20, opacity: 0, duration: 0.18, ease: 'power1.in' }, 0);
    if (prevSub) t.to(prevSub, { y: -16, opacity: 0, duration: 0.16, ease: 'power1.in' }, 0);
    if (prevDesc) t.to(prevDesc, { y: -12, opacity: 0, duration: 0.14, ease: 'power1.in' }, 0);
    // animate curr in
    if (currTitle) t.fromTo(currTitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' }, '+=0.02');
    if (currSub) t.fromTo(currSub, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.24, ease: 'power2.out' }, '-=0.18');
    if (currDesc) t.fromTo(currDesc, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: 'power2.out' }, '-=0.2');
    titleAnimRef.current = t;
    prevTitleRef.current = currIdx;
    return () => { if (titleAnimRef.current) titleAnimRef.current.kill(); };
  }, [activeIndex]);

  // animate service image scale when the active item changes
  useEffect(() => {
    const prevIdx = prevImageRef.current;
    const currIdx = activeIndex;
    if (prevIdx === currIdx) {
      prevImageRef.current = currIdx;
      return;
    }
    const prevEl = itemRefs.current[prevIdx];
    const currEl = itemRefs.current[currIdx];
    const prevImg = prevEl ? prevEl.querySelector('.service-image') : null;
    const currImg = currEl ? currEl.querySelector('.service-image') : null;

    if (imageAnimRef.current) imageAnimRef.current.kill();
    const tl = gsap.timeline({});
    // scale previous back down
    if (prevImg) tl.to(prevImg, { scale: 1, duration: 0.24, ease: 'power2.in' }, 0);
    // scale current up slightly
    if (currImg) tl.to(currImg, { scale: 1.06, duration: 0.45, ease: 'power2.out' }, 0);
    imageAnimRef.current = tl;
    prevImageRef.current = currIdx;
    return () => { if (imageAnimRef.current) imageAnimRef.current.kill(); };
  }, [activeIndex]);

  // animate prev -> out and curr -> in whenever visibleNumber changes
  useEffect(() => {
    if (!currNumRef.current) return;
    // if there's no prev number, just animate the current in
    if (!prevNumRef.current) {
      gsap.fromTo(currNumRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" });
      return;
    }

    // animate prev out, current in
    if (numberAnimRef.current) numberAnimRef.current.kill();
    const tl = gsap.timeline({});
    tl.to(prevNumRef.current, { y: -20, opacity: 0, duration: 0.2, ease: "power2.in" })
      .fromTo(currNumRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, "-=0.05")
      .call(() => {
        // after animation, clear prev so DOM updates
        setPrevNumber(null);
      });
    numberAnimRef.current = tl;
    return () => {
      if (numberAnimRef.current) {
        numberAnimRef.current.kill();
        numberAnimRef.current = null;
      }
    };
  }, [visibleNumber, prevNumber]);

  // rotate the decorative mark image based on scroll position of the section
  useEffect(() => {
    const markEl = markRef.current;
    const parent = containerRef.current;
    if (!markEl || !parent) return;

    let rafId = null;

    function updateRotation() {
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // compute a progress value (0..1) for how much the section has moved through the viewport
      // when rect.top === vh -> progress ~0, when rect.bottom === 0 -> progress ~1
      const total = vh + rect.height;
      let p = (vh - rect.top) / total;
      p = Math.max(0, Math.min(1, p));

      // rotate up to 2 full turns (720deg) depending on progress
      const deg = p * 720;

      // toggle a light-mode look (white background with alternate text colors) once the
      // section is sufficiently inside the viewport — use a threshold so it feels natural
      const shouldLight = p > 0.35; // tweak this to change when the transition happens
      // use functional update so effect doesn't need to depend on lightMode
      setLightMode((prev) => (prev === shouldLight ? prev : shouldLight));

      // apply transform (GPU accelerated)
      markEl.style.transform = `rotate(${deg}deg)`;
      rafId = null;
    }

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(updateRotation);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // initial update
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // set initial image scales: curr image scaled up slightly
  useEffect(() => {
    // attempt to apply initial scales once the DOM nodes exist; retry until nodes are present
    let rafId;
    function applyInitialScales() {
      const imgs = itemRefs.current.map((el) => el ? el.querySelector('.service-image') : null).filter(Boolean);
      if (!imgs || imgs.length === 0) {
        rafId = requestAnimationFrame(applyInitialScales);
        return;
      }
      // set all to 1
      gsap.set(imgs, { scale: 1 });
      // scale current using activeIndexRef
      const currImg = imgs[activeIndexRef.current];
      if (currImg) gsap.set(currImg, { scale: 1.06 });
    }
    applyInitialScales();
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  // fallback / more robust top-offset-based scroll detection (handles fast scrolling)
  useEffect(() => {
    let raf = null;
    // set the fallback anchor to the vertical center of the viewport so the right text highlights
    // the service which is closer to the center of the screen.
    const getAnchorY = () => Math.round((window.innerHeight || document.documentElement.clientHeight) / 2);
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const anchorY = getAnchorY(); // center of viewport
        let closest = 0;
        let minDist = Infinity;
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // calculate element center relative to viewport and measure distance to viewport center
          const elCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elCenter - anchorY);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        if (closest !== activeIndexRef.current) {
              activeIndexRef.current = closest;
              setPrevNumber(visibleNumberRef.current);
              setVisibleNumber(services[closest].number);
              visibleNumberRef.current = services[closest].number;
              setActiveIndex(closest);
            }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // initial check
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={(el) => {
      containerRef.current = el;
      if (outerRef) {
        if (typeof outerRef === 'function') outerRef(el);
        else outerRef.current = el;
      }
    }} className="relative w-full max-w-[1440px] mx-auto flex flex-col md:flex-row justify-center py-12 px-2">
      {/* add the services title text clip */}
      {/* left: sticky selection column (desktop only) */}
      <div className="relative shrink-0 mr-12 ">
        {/* sticky with top offset so it pins while the right content scrolls */}
        <div className="sticky top-28 z-20">
          <h1 className="text-6xl md:text-8xl  font-semibold bg-linear-to-r from-[#0BC1A5] to-[#4BAB54] bg-clip-text text-transparent mb-12 uppercase" style={{ WebkitTextFillColor: 'transparent' }}>
            Services
          </h1>
          {/* counter: shows active service number */}
          {/* <div className="relative overflow-hidden mb-2 h-36">
            <div className="absolute inset-0 flex items-center">
              <div className="relative w-full h-[301px] text-[12rem] font-medium bg-linear-to-b from-[#039932] to-[#001E5F] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                {prevNumber && (
                  <span ref={prevNumRef} className="absolute inset-0 flex items-center justify-center select-none z-10">{prevNumber}</span>
                )}
                <span ref={currNumRef} className="absolute inset-0 flex items-center justify-center select-none z-20">{visibleNumber}</span>
              </div>
            </div>
          </div> */}
          
        </div>

      </div>
      
      <div
        className={`relative rounded-3xl mt-6 px-4 md:px-8 py-10 max-w-2xl md:max-w-7xl w-full transition-colors duration-500 ${
          lightMode ? 'bg-white text-[#001E5F]' : 'bg-[#191919] text-white'
        }`}
        style={{ boxShadow: "0 2px 32px 0 rgba(0,0,0,0.18)" }}
      >
        {/* Services grid */}
        <div className="py-6 md:py-10 md:px-8 px-2">
          <div className="flex flex-col gap-y-6">
            {services.map((service, i) => (
              <div
                key={service.number}
                ref={(el) => (itemRefs.current[i] = el)}
                data-index={i}
                className={`flex flex-col md:flex-row items-center gap-6 py-4 md:py-8 transition-all duration-300 ${
                  i === activeIndex ? 'opacity-100 scale-100' : 'opacity-70 scale-98'
                }`}
                // tabIndex={-1}
                aria-current={i === activeIndex}
              >
                
                <div
                  className="w-full md:w-40 h-full md:h-40 rounded-xl overflow-hidden shrink-0  "
                  aria-hidden="true"
                  // style={{
                  //   clipPath: 'clip-path: polygon(0% 0%,67% 0%,41% 100%,0% 100%);',
                  //   backgroundImage: `url(${service.image})`,
                  //   backgroundSize: 'cover',
                  //   backgroundPosition: 'center',
                  //   transformOrigin: 'center center',
                  //   willChange: 'transform',
                  // }}
                >
                  <h1 className="text-9xl  font-semibold  bg-linear-to-r from-[#0BC1A5] to-[#4BAB54] bg-clip-text text-transparent ">
                    {service.number}
                  </h1>
                  </div>
                <div className="flex flex-col  justify-center">
                  <h1 className={`text-3xl uppercase font-semibold mb-1 transition-colors duration-500 ${lightMode ? 'text-[#001E5F]' : 'text-white'}`}>
                    {service.title}
                  </h1>
                  <p className={`text-2xl font-medium transition-colors duration-500 ${lightMode ? 'text-[#4BAB54]' : 'text-[#039932]'}`}>{service.subtitle}</p>
                  <p className={`text-xl leading-relaxed transition-colors duration-500 ${lightMode ? 'text-gray-700' : 'text-gray-300'}`}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mark image bottom left (rotates based on scroll) */}
        {/* <div
          ref={markRef}
          className="absolute left-0 bottom-0 hidden md:block"
          // style={{ transformOrigin: "center center", willChange: "transform" }}
        >
          <Image
            src="/Mark.png"
            alt="Decorative mark"
            width={300}
            height={300}
            className="object-contain opacity-50"
          />
        </div> */}

        {/* Button bottom right */}
        {/* <div className="flex justify-end mt-12">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#039932] to-[#4BAB54] text-[#001E5F] text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            View all services
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div> */}
      </div>
    </section>
  );
});

Services.displayName = "Services";

export default Services;

// Export services list for use in other UI components such as mega-menu
export { services };