'use client';
import posts from '../../lib/data/blogs';
import BlogCard from '../components/BlogCard';
import BlogHero from '../components/HeroSection';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import HeroSection from '../components/HeroSection';

// Simple markdown -> HTML renderer for local blog content (supports headings, lists, paragraphs, tables, and line breaks)
function mdToHtml(md = '') {
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) { i++; continue; }

    // headings
    if (line.startsWith('### ')) { out.push(`<h3 class="text-lg font-semibold text-white mb-3">${line.replace('### ', '')}</h3>`); i++; continue; }
    if (line.startsWith('## ')) { out.push(`<h2 class="text-2xl font-bold text-white mb-4">${line.replace('## ', '')}</h2>`); i++; continue; }
    if (line.startsWith('# ')) { out.push(`<h1 class="text-3xl font-extrabold text-white mb-5">${line.replace('# ', '')}</h1>`); i++; continue; }

    // table detection: header line contains '|' and next lines also contain '|' (may start with '- ')
    if (line.includes('|') && (i + 1 < lines.length) && (lines[i+1].includes('|') || lines[i+1].trim().startsWith('- '))) {
      // parse header
      const headerCells = line.split('|').map(c => c.trim());
      i++;
      const rows = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!l) break;
        if (!l.includes('|')) break;
        const rowLine = l.startsWith('- ') ? l.slice(2) : l;
        const cols = rowLine.split('|').map(c => c.trim());
        rows.push(cols);
        i++;
      }
      // build table HTML with Tailwind-friendly classes
      const ths = headerCells.map(h => `<th class="text-left py-2 pr-4 text-gray-200 font-semibold">${h}</th>`).join('');
      const trs = rows.map(r => `<tr class="border-t border-white/5">${r.map(c => `<td class="py-2 align-top text-gray-300">${c}</td>`).join('')}</tr>`).join('');
      out.push(`<div class="overflow-x-auto mb-4"><table class="w-full table-auto text-sm text-gray-300"><thead class="bg-white/5"><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`);
      continue;
    }

    // unordered list
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(`<li class="leading-relaxed">${lines[i].trim().slice(2)}</li>`);
        i++;
      }
      out.push(`<ul class="list-disc pl-5 space-y-2 text-gray-300 mb-4">${items.join('')}</ul>`);
      continue;
    }

    // paragraph (accumulate until blank line)
    let para = [raw.trim()];
    i++;
    while (i < lines.length && lines[i].trim()) { para.push(lines[i].trim()); i++; }
    out.push(`<p class="text-sm text-gray-300 mb-4">${para.join('\n').replace(/\n/g, '<br/>')}</p>`);
  }
  return out.join('');
}

// export const metadata = {
//   title: 'Blog | ClusterTech - Insights & Articles',
//   description: 'Thoughts on design, engineering, and product from our team.',
// };

export default function BlogsPage() {
  const [openPost, setOpenPost] = useState(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (openPost) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [openPost]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && openPost) setOpenPost(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openPost]);

  // Modal focus management
  const modalRef = useRef(null);
  useEffect(() => {
    if (openPost) {
      // give the modal a moment to mount then focus it for accessibility
      const t = setTimeout(() => modalRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [openPost]);

  // Decide whether to treat content as raw HTML (starts with '<') or markdown
  const rawContent = openPost?.content || openPost?.excerpt || '';
  const contentHtml = rawContent && String(rawContent).trim().startsWith('<') ? String(rawContent) : mdToHtml(rawContent);

  return (
    <main className="w-full ">
      <HeroSection
        h1='Insights &'
        highlightText='Articles'
        subtext='Thoughts on design, engineering, and product from our team.'
        backgroundImage={'https://images.unsplash.com/photo-1522517779552-6cf4c1f31ee3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
      />

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1440px] mx-auto md:px-10 px-4 pb-20">
        {posts.map((p, i) => (
          <BlogCard key={p.slug} post={p} index={i} onOpen={setOpenPost} />
        ))}
      </section>

      {/* Page-level modal */}
      <div className={`fixed inset-0 z-50 flex items-stretch transition-opacity duration-300 ${openPost ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} aria-hidden={!openPost}>
        <div className={`fixed inset-0 bg-black/40 transition-opacity ${openPost ? 'opacity-100' : 'opacity-0'}`} onClick={() => setOpenPost(null)} aria-hidden="true" />

        
        <aside ref={modalRef} tabIndex={-1} aria-labelledby="post-title" className={`ml-auto w-full md:w-[60%] lg:w-full md:max-w-[70vw] h-full bg-[#0b1115]/95 backdrop-blur-xl border-l border-white/5 shadow-2xl transform transition-transform duration-700 ease-in-out ${openPost ? 'translate-x-0' : 'translate-x-full'}`} role="dialog" aria-modal="true">
          {openPost && (
            <div className="h-full overflow-auto p-6">
              <div className="flex items-start justify-between mb-4">
                <button aria-label="Close dialog" onClick={() => setOpenPost(null)} className="text-sm text-gray-300 rounded-full px-3 py-2 hover:bg-white/5">X</button>
                <div>
                  <div className="flex gap-2 items-center">
                    {(openPost.tags || []).map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-[#d489ff] px-3 py-1 rounded-full bg-[#d489ff]/10">{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs text-right text-gray-400 mt-2">{openPost.date}</div>
                </div>
                
              </div>

              <div className="relative h-56 md:h-72 lg:h-[520px] overflow-hidden rounded-md mb-4">
                <Image
                  src={openPost?.image || '/clustertech-sd.avif'}
                  alt={openPost?.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  className="object-contain"
                />
              </div>

              {/* <h3 id="post-title" className="text-2xl font-bold text-white mb-3">{openPost?.title}</h3> */}

              <div className="prose prose-invert max-w-none text-sm text-gray-300 mb-6">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
