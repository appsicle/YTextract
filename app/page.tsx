// const [showInfo, setShowInfo] = useState(true);

//   const handleDataFetch = () => {
//     setShowInfo(false);
//   };

"use client";

import logo from "./ytlogo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HowItWorks } from "@/components/horizontal-timeline";
import {
  ChevronRight,
  Play,
  Search,
  Zap,
  Sparkles,
  ArrowRight,
  List,
  BarChart,
  SquarePlay,
} from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-gradient-to-b from-[#0F0F0F]/80 to-[#1A1A1A]/80 backdrop-blur-xl">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#FF0000]">YT</span>
                  <Play className="h-4 w-4 fill-[#FF0000] stroke-[#FF0000] mx-0.5" />
                </div>
                <span className="text-2xl font-bold text-white">Extract</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm text-zinc-400 hover:text-[#FF0000] transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-zinc-400 hover:text-[#FF0000] transition-colors duration-200"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="text-sm text-zinc-400 hover:text-[#FF0000] transition-colors duration-200"
              >
                Pricing
              </a>
            </div>
            <Button className="bg-white text-black hover:bg-zinc-100 transition-colors duration-200">
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 lg:pt-64 lg:pb-48 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              <Image
                src={logo}
                alt="YTExtract Logo"
                width={70} // Adjust based on your text size
                height={70} // Keep 1:1 ratio
                className="mx-auto mr-4 pb-2 inline-block" // Centers logo and adds spacing
              />
              AI Video Insights in Seconds
            </h1>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Video transcript search, AI summary, hook generator. Video
              analysis in seconds.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute -inset-1 bg-[#FF0000]/20 rounded-lg blur-lg" />
              <div className="relative flex gap-2">
                <Input
                  placeholder="Paste YouTube URL here..."
                  className="flex-1 h-12 bg-black/40 border-0 focus-visible:ring-1 focus-visible:ring-white/20 rounded-lg"
                />
                <Button className="h-12 px-6 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white transition-colors duration-200">
                  Convert
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.2),transparent_50%)]" />
        </div> 
      </section>

      <HowItWorks />
      {/* Features */}
      <section id="features" className="py-24 lg:py-32 bg-zinc-950">
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
                  description:
                    "Blazing fast search against any video transcript",
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
                  description:
                    "Ask questions and get insights on video content",
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

      {/* Testimonials */}
      {/* <section className="py-24 lg:py-32 bg-zinc-950">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 lg:mb-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              What Our Users Say
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Join thousands of content creators who have revolutionized their
              workflow with YTExtract
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "Alex Thompson",
                role: "Tech YouTuber",
                quote:
                  "YTExtract has cut my content creation time in half. The summaries and hooks it generates are spot-on!",
              },
              {
                name: "Sarah Lee",
                role: "Lifestyle Influencer",
                quote:
                  "I can now repurpose my long videos into multiple TikToks and Reels effortlessly. Game-changer!",
              },
              {
                name: "Mike Johnson",
                role: "Educational Content Creator",
                quote:
                  "The transcript feature is incredibly accurate, and the content insights help me understand my audience better.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-zinc-900/50 rounded-2xl p-6 lg:p-8 border border-white/10"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div>
                    <p className="font-semibold lg:text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm lg:text-base text-zinc-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-zinc-300 italic lg:text-lg">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-xl" />
            <div className="relative bg-zinc-900 rounded-2xl p-8 md:p-12 lg:p-16 border border-white/10 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
                Ready to Supercharge Your Content?
              </h2>
              <p className="text-xl lg:text-2xl text-zinc-400 mb-8 lg:mb-12 max-w-3xl mx-auto">
                Join thousands of creators who are saving time and boosting
                engagement with YTExtract
              </p>
              <Button onClick={() => {}} className="bg-white text-black hover:bg-zinc-200 text-lg lg:text-xl px-8 py-6">
                Get Started for Free
                <ChevronRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Button>
              <p className="mt-4 lg:mt-6 text-sm lg:text-base text-zinc-500">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 lg:py-16 border-t border-white/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h3 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                YTExtract
              </h3>
              <p className="text-zinc-400 text-sm lg:text-base">
                Empowering creators to do more with their content
              </p>
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                Product
              </h4>
              <ul className="space-y-2 lg:space-y-3 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Use Cases
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                Company
              </h4>
              <ul className="space-y-2 lg:space-y-3 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-semibold mb-4 lg:mb-6">
                Connect
              </h4>
              <ul className="space-y-2 lg:space-y-3 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 lg:mt-16 pt-8 lg:pt-12 border-t border-white/10 text-center text-zinc-400 text-sm lg:text-base">
            © 2023 YTExtract. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
