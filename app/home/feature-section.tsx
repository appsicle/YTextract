import { Search, Sparkles, List, BarChart, LucideIcon } from "lucide-react";
import featureImage from "./feature-img.png";
import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="group"
    >
      <div className="flex items-start space-x-4 lg:space-x-6 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
        <div
          className={`flex-shrink-0 h-12 w-12 lg:h-16 lg:w-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
        >
          <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg lg:text-xl mb-1 lg:mb-2 group-hover:text-white transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-zinc-400 lg:text-lg group-hover:text-zinc-300 transition-colors duration-300">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export function Features() {
  const features: FeatureItem[] = [
    {
      icon: Sparkles,
      title: "AI-Powered Summary",
      description:
        "Summarize within custom time range and granularity",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Search,
      title: "Indexed Search",
      description: "Coming soon...",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: List,
      title: "Engaging Hooks",
      description: "Coming soon...",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart,
      title: "VideoGPT",
      description: "Coming soon...",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section 
      id="features" 
      className="min-h-screen py-24 lg:py-32 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 w-full h-1/4 bg-gradient-to-b from-[#FF0000]/5 to-transparent opacity-30"></div>
        <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-green-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center space-y-4 mb-16 lg:mb-24"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            Supercharged Video Research
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Extract insights and summaries without watching
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-6 lg:space-y-8">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-[#FF0000]/20 to-purple-500/20 rounded-3xl blur-xl opacity-80"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-2 border border-white/10 shadow-2xl">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={featureImage}
                  width={600}
                  height={600}
                  alt="YTExtract dashboard"
                  className="rounded-lg shadow-lg w-full h-auto"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
