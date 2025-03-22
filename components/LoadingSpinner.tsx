import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large' | 'xl'
  className?: string
  variant?: 'default' | 'gradient'
}

export function LoadingSpinner({ 
  size = 'medium', 
  className = '',
  variant = 'default' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  if (variant === 'gradient') {
    return (
      <div className={`inline-flex ${className}`} role="status" aria-label="Loading">
        <div className={`relative ${sizeClasses[size]}`}>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, transparent 5%, #FF0000 40%, transparent 50%, transparent)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full opacity-75"
            style={{
              background: 'conic-gradient(from 180deg, transparent, transparent 5%, #FF5050 40%, transparent 50%, transparent)'
            }}
            animate={{ rotate: 360 }}
            initial={{ rotate: 90 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className={`absolute inset-1 bg-black rounded-full flex items-center justify-center ${sizeClasses[size]}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${size === 'small' ? 'w-1 h-1' : size === 'medium' ? 'w-2 h-2' : 'w-3 h-3'} bg-gradient-to-br from-[#FF0000] to-[#FF5050] rounded-full`} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`inline-block ${className}`} role="status" aria-label="Loading">
      <svg
        className={`animate-spin ${sizeClasses[size]} text-[#FF0000] drop-shadow-glow`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ filter: 'drop-shadow(0 0 6px rgba(255, 0, 0, 0.5))' }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}

