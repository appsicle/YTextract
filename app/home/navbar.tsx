"use client";
import { ChevronRight, Play, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
  const path = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? "border-white/10 bg-black/80 backdrop-blur-xl shadow-md" 
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold text-[#FF0000] group-hover:scale-105 transition-transform duration-200">YT</span>
              <Play className="h-4 w-4 fill-[#FF0000] stroke-[#FF0000] mx-0.5 group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-2xl font-bold text-white group-hover:text-[#FF0000] transition-colors duration-200">Extract</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          {path === "/" && (
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF0000] group-hover:w-full transition-all duration-300"></span>
              </a>
              <Button 
                className="bg-gradient-to-r from-[#FF0000] to-[#FF5050] text-white hover:shadow-lg hover:shadow-[#FF0000]/20 transition-all duration-200 scale-100 hover:scale-105"
              >
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 animate-pulse" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && path === "/" && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-lg border-t border-white/5 p-4 animate-in fade-in slide-in-from-top">
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-zinc-400 hover:text-white py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <Button 
              className="bg-gradient-to-r from-[#FF0000] to-[#FF5050] text-white w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
