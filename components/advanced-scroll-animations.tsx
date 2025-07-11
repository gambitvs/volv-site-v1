"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export function AdvancedScrollAnimations({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const y = useTransform(smoothProgress, [0, 1], [100, -100])
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <div ref={containerRef} className="relative">
      <motion.div style={{ y, opacity, scale }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

export function ParallaxElement({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
