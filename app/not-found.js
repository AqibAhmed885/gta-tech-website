import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[200px] font-bold bg-linear-to-r from-[#d489ff] via-[#a200ff] to-[#001E5F] bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-[#d489ff]/20 -z-10"></div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-linear-to-r from-[#d489ff] to-[#a200ff] text-[#001E5F] font-bold text-lg shadow-lg hover:scale-105 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#d489ff] text-[#d489ff] font-bold text-lg hover:bg-[#d489ff]/10 transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
