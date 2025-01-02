import { Play } from "lucide-react";

export default function VideoProcessingLoader() {
  <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 lg:-mt-24">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/20 to-blue-500/20 rounded-3xl blur-xl" />
      <div className="relative bg-black/40 rounded-2xl p-8 border border-white/10">
        <div className="grid gap-6">
          <div className="bg-black/40 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#FF0000] to-[#FF0000]/70 flex items-center justify-center">
                <Play className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Video Analysis</p>
                <p className="text-sm text-zinc-400">Processing content...</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-2 bg-zinc-800 rounded-full w-3/4" />
            <div className="h-2 bg-zinc-800 rounded-full w-1/2" />
          </div>
        </div>
      </div>
    </div>
  </div>;
}
