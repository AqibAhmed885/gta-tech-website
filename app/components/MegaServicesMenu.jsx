"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function MegaServicesMenu({ items = [], open, onClose, onOpen }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                if (onClose) onClose();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);
    return (
        <div
            onMouseEnter={() => onOpen && onOpen()}
            onMouseLeave={() => onClose && onClose()}
            className={`hidden md:block fixed z-60 max-w-[1440px] mx-auto left-0 right-0 top-20 border-t border-[#0A1939] text-gray-100 shadow-xl  transition-all duration-200 ${open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                }`}
            role="menu"
            aria-hidden={!open}
        >
            <div className="max-w-[1440px] mx-auto  text-[#0A1939] py-6 mt- px-6 border border-white/5 bg-[#5EAFDB] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl uppercase font-semibold ">Explore Our Services</h1>
                        <p className="text-sm ">Full list of services across our areas of expertise</p>
                    </div>
                    <div>
                        <Link href="/services" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#039932] to-[#4BAB54] text-[#001E5F] font-semibold text-sm shadow-md hover:shadow-lg">
                            View all services
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    {items.map((cat, idx) => (
                        <div key={idx} className="space-y-3">
                            <h1 className="text-xl uppercase font-semibold  mb-2">{cat.title}</h1>
                            <ul className="space-y-2">
                                {cat.items.map((svc, i) => (
                                    <li key={i}>
                                        <Link href={svc.href} className="flex items-center gap-3 text-sm " onClick={() => onClose && onClose()}>
                                            <span className="flex-1  hover:text-[#4BAB54]">{svc.label}</span>
                                            <span className="">→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
