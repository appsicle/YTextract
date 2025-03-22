import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import { motion } from 'framer-motion'

interface LoadingPageProps {
  message?: string
  submessage?: string
}

export function LoadingPage({ 
  message = 'Processing your video...', 
  submessage = 'This will only take a moment' 
}: LoadingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{ 
              y: [null, Math.random() * -40 - 10 + "%"],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
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
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center px-4"
      >
        <LoadingSpinner size="xl" variant="gradient" className="mb-8" />
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.h2>
        <p className="text-zinc-400 max-w-md">{submessage}</p>
      </motion.div>
    </div>
  )
}

