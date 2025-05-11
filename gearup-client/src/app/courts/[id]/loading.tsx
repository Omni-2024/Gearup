export default function Loading() {
  return (
    <main className="min-h-screen bg-[#02080D] animate-pulse">
      {/* Header Skeleton */}
      <div className="relative w-full h-[400px] bg-[#1C3F39]">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="h-8 w-1/3 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-[#1C3F39] rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      {/* About Skeleton */}
      <div className="py-8">
        <div className="container mx-auto">
          <div className="h-6 w-1/4 bg-[#1C3F39] rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-[#1C3F39] rounded"></div>
            <div className="h-4 w-3/4 bg-[#1C3F39] rounded"></div>
          </div>
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-[#1C3F39] rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
