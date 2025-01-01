import Image from "next/image";
import logo from "@/app/ytlogo.png";
import { Button, Input, SearchBar } from "@/components/index";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function Hero() {
  return (
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
            Video transcript search, AI summary, hook generator. Video analysis
            in seconds.
          </p>

          <div className="relative max-w-xl mx-auto">
            <div className="absolute -inset-1 bg-[#FF0000]/20 rounded-lg blur-lg" />
            <div className="relative flex gap-2">
              {/* <Input
                placeholder="Paste YouTube URL here..."
                className="flex-1 h-12 bg-black/40 border-0 focus-visible:ring-1 focus-visible:ring-white/20 rounded-lg"
              /> */}
              <SearchBar />
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
  );
}
