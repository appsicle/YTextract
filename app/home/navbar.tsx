"use client";
import { ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const path = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-gradient-to-b from-[#0F0F0F]/80 to-[#1A1A1A]/80 backdrop-blur-xl">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-1">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-[#FF0000]">YT</span>
                <Play className="h-4 w-4 fill-[#FF0000] stroke-[#FF0000] mx-0.5" />
                <span className="text-2xl font-bold text-white">Extract</span>
              </Link>
            </div>
          </div>
          {path === "/" ? (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-sm text-zinc-400 hover:text-[#FF0000] transition-colors duration-200"
                >
                  Features
                </a>
                {/* <a
                  href="#how-it-works"
                  className="text-sm text-zinc-400 hover:text-[#FF0000] transition-colors duration-200"
                >
                  How it Works
                </a> */}
                {/* <a
              href="#pricing"
              className="text-sm text-zinc-400 hover:text-[#FF0000] transition-colors duration-200"
            >
              Pricing
            </a> */}
              </div>

              <Button className="bg-white text-black hover:bg-zinc-100 transition-colors duration-200">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
