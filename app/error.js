'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative mb-8">
          <h1 className="text-7xl md:text-9xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Error
          </h1>
          <div className="absolute inset-0 blur-3xl bg-red-500/20 -z-10"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Something Went Wrong
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-[#d489ff] to-[#a200ff] text-[#001E5F] font-bold text-lg shadow-lg hover:scale-105 transition-all"
          >
            Try Again
          </button>

          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#d489ff] text-[#d489ff] font-bold text-lg hover:bg-[#d489ff]/10 transition-all"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
