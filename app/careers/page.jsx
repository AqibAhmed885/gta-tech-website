'use client';
import positions from '../../lib/data/careers';
import CareersHero from '../components/CareersHero';

import { useState, useEffect, useRef } from 'react';

// export const metadata = {
//   title: 'Careers ',
//   description: 'Open roles and hiring at ClusterTech',
// };

export default function CareersPage() {
  const [openPosition, setOpenPosition] = useState(null);
  const modalRef = useRef(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (openPosition) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [openPosition]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && openPosition) setOpenPosition(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openPosition]);

  useEffect(() => {
    if (openPosition) {
      const t = setTimeout(() => modalRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [openPosition]);

  return (
    <main className="w-full max-w-[1440px] mx-auto md:px-0 px-4 py-20">
      <CareersHero />

      <section id="open-roles" className="py-10">
        <h2 className="text-3xl font-bold text-white mb-6">Open Roles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {positions.map((pos) => (
            <article key={pos.slug} className="rounded-xl border border-white/5 bg-[#0b1115]/95 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{pos.title}</h3>
                  <div className="text-sm text-gray-400">{pos.team} • {pos.location} • {pos.type}</div>
                </div>
                <div className="hidden md:block">
                  <button onClick={() => setOpenPosition(pos)} className="text-sm text-[#039932] hover:underline">View</button>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-300 mb-4">{pos.summary}</p>

              <div className="flex gap-3">
                <button onClick={() => setOpenPosition(pos)} className="inline-flex items-center gap-2 px-4 py-2 rounded bg-linear-to-r from-[#039932] to-[#4BAB54] text-[#001E5F] font-semibold shadow">View details</button>
                <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/10 text-white/90">Apply</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Position modal */}
      <div className={`fixed inset-0 z-50 flex items-stretch transition-opacity duration-300 ${openPosition ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} aria-hidden={!openPosition}>
        <div className={`fixed inset-0 bg-black/40 transition-opacity ${openPosition ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpenPosition(null)} aria-hidden="true" />

        <aside ref={modalRef} tabIndex={-1} className={`ml-auto w-full md:w-[60%] lg:w-[50%] max-w-[900px] h-full bg-[#0b1115]/95 backdrop-blur-xl border-l border-white/5 shadow-2xl transform transition-transform duration-700 ease-in-out ${openPosition ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true">
          {openPosition && (
            <div className="h-full overflow-auto p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex gap-2 items-center">
                    {(openPosition.tags || []).map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-[#039932] px-3 py-1 rounded-full bg-[#039932]/10">{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">{openPosition.team} • {openPosition.location} • {openPosition.type}</div>
                </div>
                <button aria-label="Close dialog" onClick={() => setOpenPosition(null)} className="text-sm text-gray-300 rounded-md px-3 py-2 hover:bg-white/5">Close</button>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{openPosition.title}</h3>

              <p className="text-sm text-gray-300 mb-4">{openPosition.description || openPosition.summary}</p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">Responsibilities</h4>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  {(openPosition.responsibilities || []).map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">Qualifications</h4>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  {(openPosition.qualifications || []).map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-linear-to-r from-[#039932] to-[#4BAB54] text-[#001E5F] font-semibold shadow">Apply</a>
                <a href="#open-roles" onClick={() => setOpenPosition(null)} className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/10 text-white/90">Back to roles</a>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}