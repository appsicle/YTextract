import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message = 'Loading...' }: LoadingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <LoadingSpinner size="xl" className="mb-4" />
      <p className="text-lg font-medium text-gray-200">{message}</p>
    </div>
  )
}

