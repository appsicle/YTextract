import { PlayCircle, Search, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface TimelineStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  index: number;
}

const TimelineStep = ({ icon, title, description, gradient, index }: TimelineStepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      className="flex flex-col items-center text-center relative group"
    >
      {/* Connector Line (only visible on desktop) */}
      {index < 2 && (
        <div className="absolute top-7 left-1/2 w-full h-1 bg-gradient-to-r from-white/10 to-white/5 hidden sm:block z-0">
          <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-[#FF0000] to-[#FF5050] group-hover:w-full transition-all duration-1000 ease-in-out"></div>
        </div>
      )}
      
      {/* Icon Circle */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`w-14 h-14 rounded-full ${gradient} flex items-center justify-center mb-4 relative z-10 shadow-lg shadow-${gradient.split('from-')[1].split(' ')[0]}/20`}
      >
        {icon}
      </motion.div>
      
      {/* Step Number */}
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center z-20">
        {index + 1}
      </div>
      
      {/* Content */}
      <motion.div 
        className="mt-5 transform group-hover:-translate-y-1 transition-transform duration-300"
      >
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#FF0000] transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
      </motion.div>
    </motion.div>
  );
};

export function HowItWorks() {
  const steps = [
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: "Upload Video",
      description: "Simply paste the Youtube video URL",
      gradient: "bg-gradient-to-br from-[#6366f1] to-[#8B5CF6]"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Indexed Search",
      description: "Search through all identifiable words in the video",
      gradient: "bg-gradient-to-br from-pink-500 to-purple-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Summary",
      description: "Our AI summarizes the video and provides recommendations",
      gradient: "bg-gradient-to-br from-[#FF0000] to-orange-600"
    }
  ];

  return (
    <div className="w-full py-24 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/80"></div>
        
        {/* Animated circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${Math.random() * 30 + 20}%`,
              height: `${Math.random() * 30 + 20}%`,
              background: i === 0 
                ? "radial-gradient(circle, rgba(255,0,0,0.05) 0%, transparent 70%)" 
                : i === 1 
                  ? "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)"
            }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto px-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            How It Works
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mt-4">
            Three simple steps to unlock video insights
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid sm:grid-cols-3 gap-12 sm:gap-4 relative">
            {steps.map((step, index) => (
              <TimelineStep 
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                gradient={step.gradient}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
