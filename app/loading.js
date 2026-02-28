export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo or spinner */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-[#039932]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#039932] border-t-transparent animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="text-white text-lg font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}
