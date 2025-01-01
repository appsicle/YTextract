import { Search, Sparkles, List, BarChart } from "lucide-react";
import Image from "next/image";

export function Features() {
  return (
    <section id="features" className="min-h-screen py-24 lg:py-32 bg-zinc-950">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Supercharged Video Research
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Extract insights and summaries without watching
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-8 lg:space-y-12">
            {[
              {
                icon: Search,
                title: "Indexed Search",
                description: "Blazing fast search against any video transcript",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Sparkles,
                title: "AI-Powered Summary",
                description:
                  "Summarize within custom time range and granularity",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: List,
                title: "Engaging Hooks",
                description:
                  "Convert long form to short form with hook recommendations",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: BarChart,
                title: "VideoGPT",
                description: "Ask questions and get insights on video content",
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 lg:space-x-6"
              >
                <div
                  className={`flex-shrink-0 h-12 w-12 lg:h-16 lg:w-16 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                >
                  <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg lg:text-xl mb-1 lg:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 lg:text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl" />
            <div className="relative bg-zinc-900 rounded-2xl p-8 lg:p-12 border border-white/10">
              <Image
                src="/placeholder.svg?height=400&width=400"
                width={400}
                height={400}
                alt="YTExtract dashboard"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
