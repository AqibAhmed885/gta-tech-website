"use client";

import Image from 'next/image';
import Link from 'next/link';


export default function BlogCard({ post, index, onOpen }) {
  // const clipA = "polygon(0% 5%,100% 0%,100% 95%,0% 100%)";
  // const clipB = "polygon(0% 0%,100% 5%,100% 100%,0% 95%)";
  // const clip = index % 3 === 1 ? clipB : clipA;

  return (
    <article className="group  bg-am" >
      {onOpen ? (
        <div role="button" tabIndex={0} onClick={() => onOpen(post)} onKeyDown={(e) => { if (e.key === 'Enter') onOpen(post); }} className="block cursor-pointer w-full h-full">
          <div className=" overflow-hidden bg-white/5 rounded-4xl backdrop-blur-md border border-white/10 hover:shadow-lg transition-all h-full">
            <div className="relative h-72  overflow-hidden">
              {/* Use unoptimized to let the browser load external Unsplash URLs directly and add a local fallback on error */}
              <Image
                src={post.image || '/clustertech-sd.avif'}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
                onError={(e) => { e.currentTarget.src = '/clustertech-sd.avif'; }}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 ">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex flex-wrap gap-2">
                  {(post.tags || []).map((tag) => (
                    <span key={tag} className="text-xs font-semibold text-[#d489ff] px-3 py-1 rounded-full bg-[#d489ff]/10">{tag}</span>
                  ))}
                </div>
                <time className="text-xs text-gray-400 ml-auto">{post.date}</time>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <p className="text-sm text-gray-300 mb-4 line-clamp-5">{post.excerpt}</p>
              <div className="flex gap-3">
                <span className="text-xs text-gray-400">Read →</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/blogs/${encodeURIComponent(post.slug)}`} className="block">
          <div className=" overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-lg transition-all h-full">
            <div className="relative h-60 md:h-72 lg:h-80 overflow-hidden">
              {/* Use unoptimized to let the browser load external Unsplash URLs directly and add a local fallback on error */}
              <Image
                src={post.image || '/clustertech-sd.avif'}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
                onError={(e) => { e.currentTarget.src = '/clustertech-sd.avif'; }}
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 h-96">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex flex-wrap gap-2">
                  {(post.tags || []).map((tag) => (
                    <span key={tag} className="text-xs font-semibold text-[#d489ff] px-3 py-1 rounded-full bg-[#d489ff]/10">{tag}</span>
                  ))}
                </div>
                <time className="text-xs text-gray-400 ml-auto">{post.date}</time>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <p className="text-sm text-gray-300 mb-4 line-clamp-5">{post.excerpt}</p>
              <div className="flex gap-3">
                <span className="text-xs text-gray-400">Read →</span>
              </div>
            </div>
          </div>
        </Link>
      )}



    </article>
  );
}
