"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHorizontalScroll(containerRef, sectionsCount) {
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const container = containerRef.current;
                const sections = container.querySelectorAll(".service-section");

                if (sections.length === 0) return;

                const totalWidth = sections.length * 100;

                const scrollTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: () => `+=${totalWidth * 10}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                scrollTimeline.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                });

                sections.forEach((section) => {
                    const image = section.querySelector(".service-image");
                    const text = section.querySelector(".service-text");

                    if (image) {
                        gsap.from(image, {
                            scrollTrigger: {
                                trigger: section,
                                containerAnimation: scrollTimeline,
                                start: "left center",
                                end: "right center",
                            },
                            opacity: 0,
                            scale: 0.8,
                            duration: 1,
                        });
                    }

                    if (text) {
                        gsap.from(text.children, {
                            scrollTrigger: {
                                trigger: section,
                                containerAnimation: scrollTimeline,
                                start: "left center",
                                end: "right center",
                            },
                            opacity: 0,
                            y: 50,
                            stagger: 0.1,
                            duration: 0.8,
                        });
                    }
                });

                ScrollTrigger.refresh();
            }, containerRef);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, [containerRef, sectionsCount]);
}
