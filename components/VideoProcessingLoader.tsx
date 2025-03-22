import { Brain, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";

export function VideoProcessingLoader() {
  return (
    <div className="container max-w-7xl mx-auto">
      <motion.div 
        className="relative bg-black/40 rounded-2xl p-8 border border-white/10 overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 to-blue-500/10 rounded-3xl blur-xl -z-10" />
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 flex justify-center">
            <LoadingSpinner size="large" variant="gradient" />
          </div>
          
          <div className="flex-grow space-y-6">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-[#FF0000]" />
              <h3 className="text-xl font-medium">AI Processing</h3>
            </div>
            
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                >
                  <div className="flex-shrink-0">
                    {i === 0 ? (
                      <Bot className="w-5 h-5 text-zinc-400" />
                    ) : i === 1 ? (
                      <Sparkles className="w-5 h-5 text-zinc-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
                      </div>
                    )}
                  </div>
                  <motion.div 
                    className="h-2 bg-zinc-800/80 rounded-full flex-grow overflow-hidden"
                    animate={{
                      background: i === 0 ? [
                        "linear-gradient(90deg, #FF0000 0%, #FF0000 20%, rgba(30,30,30,0.6) 20%, rgba(30,30,30,0.6) 100%)",
                        "linear-gradient(90deg, #FF0000 0%, #FF0000 80%, rgba(30,30,30,0.6) 80%, rgba(30,30,30,0.6) 100%)"
                      ] : "linear-gradient(90deg, rgba(30,30,30,0.6) 0%, rgba(30,30,30,0.6) 100%)"
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: i === 0 ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              className="text-sm text-zinc-500 italic"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Analyzing video content, extracting key points and generating summaries...
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}