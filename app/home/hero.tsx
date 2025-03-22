import Image from "next/image";
import logo from "./ytlogo.png";
import { SearchBar } from "@/components/index";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col justify-center items-center min-h-[50vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
              <Image
                src={logo}
                alt="YTExtract Logo"
                width={70}
                height={70}
                className="mx-auto mr-4 pb-2 inline-block animate-pulse"
              />
              <span className="relative">
                AI Video Insights 
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF0000] to-[#FF5050] rounded-full"></span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Extract the essence of any YouTube video with AI-powered analysis. Get summaries, highlights, and insights in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF0000]/20 to-[#FF5050]/20 rounded-lg blur opacity-75"></div>
            <div className="relative">
              <SearchBar />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent_70%)]" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,0,0.1),transparent_50%)]" />
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [null, Math.random() * -40 - 10 + "%"],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              filter: `blur(${Math.random() + 0.5}px)`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`
            }}
          />
        ))}
      </div>
    </section>
  );
}
