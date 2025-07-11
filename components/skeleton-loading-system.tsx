"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useEffect } from "react"

interface MasterSkeletonSystemProps {
  onLoadComplete: () => void
}

const SkeletonBox: React.FC<{ className?: string; delay?: number }> = ({ className = "", delay = 0 }) => (
  <motion.div
    className={`bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 rounded-lg ${className}`}
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
      delay,
    }}
    style={{
      backgroundSize: "200% 100%",
    }}
  />
)

export const MasterSkeletonSystem: React.FC<MasterSkeletonSystemProps> = ({ onLoadComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onLoadComplete, 1500)
    return () => clearTimeout(timer)
  }, [onLoadComplete])

  return (
    <div className="min-h-screen bg-surface-light">
      {/* Navigation Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-surface-light/95 backdrop-blur-md">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <SkeletonBox className="w-24 h-8" />
            <div className="hidden md:flex items-center gap-8">
              {[...Array(4)].map((_, i) => (
                <SkeletonBox key={i} className="w-16 h-4" delay={i * 0.1} />
              ))}
            </div>
            <SkeletonBox className="w-24 h-10 rounded-xl" delay={0.4} />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <SkeletonBox className="w-48 h-10 mx-auto mb-8 rounded-full" delay={0.2} />
          <SkeletonBox className="w-full max-w-4xl h-16 mx-auto mb-6 rounded-2xl" delay={0.4} />
          <SkeletonBox className="w-full max-w-3xl h-6 mx-auto mb-12 rounded-lg" delay={0.6} />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <SkeletonBox className="w-48 h-12 rounded-2xl" delay={0.8} />
            <SkeletonBox className="w-32 h-12 rounded-2xl" delay={1.0} />
          </div>

          <SkeletonBox className="w-full max-w-4xl h-96 mx-auto rounded-3xl" delay={1.2} />
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div className="py-24 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SkeletonBox className="w-32 h-8 mx-auto mb-6 rounded-full" delay={0.2} />
            <SkeletonBox className="w-96 h-12 mx-auto mb-4 rounded-2xl" delay={0.4} />
            <SkeletonBox className="w-80 h-6 mx-auto rounded-lg" delay={0.6} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-surface-light p-8 rounded-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              >
                <SkeletonBox className="w-16 h-16 mx-auto mb-6 rounded-2xl" />
                <SkeletonBox className="w-32 h-6 mx-auto mb-4 rounded-lg" />
                <SkeletonBox className="w-full h-4 mb-2 rounded" />
                <SkeletonBox className="w-3/4 h-4 mx-auto rounded" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-surface-dark text-surface-light px-6 py-3 rounded-full shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-4 h-4 bg-brand-accent rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-sm font-medium">Loading Volv...</span>
        </div>
      </motion.div>
    </div>
  )
}
