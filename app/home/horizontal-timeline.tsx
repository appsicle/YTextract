import { PlayCircle, Search, Zap } from "lucide-react";

export function HowItWorks() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 text-white pb-32">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-16">
        How It Works
      </h1>

      <div className="relative">
        {/* Timeline line */}
        {/* <div className="absolute top-[66px] left-0 w-full h-1 bg-blue-500/20 hidden sm:block" /> */}

        {/* Timeline steps */}
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-4 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center relative">
            <div className="w-14 h-14 rounded-full bg-[#6366f1] flex items-center justify-center mb-4 relative z-10">
              <PlayCircle className="w-8 h-8" />
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold mb-2">Upload Video</h3>
              <p className="text-gray-400">Simply paste the Youtube video URL</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 relative z-10">
              <Search className="w-8 h-8" />
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold mb-2">Indexed Search</h3>
              <p className="text-gray-400">
                Search through all identifiable words in the video
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center mb-4 relative z-10">
              <Zap className="w-8 h-8" />
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold mb-2">AI Summary</h3>
              <p className="text-gray-400">
                Our AI summarizes the video and provides recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
