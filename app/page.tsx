"use client";

import { Hero, HowItWorks, Features, Navbar } from "./home";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] text-white">
      <Navbar />
      <div className="min-h-screen">
        <Hero />
        <HowItWorks />
      </div>
      <Features />
    </div>
  );
}
