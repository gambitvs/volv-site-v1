"use client"

import type React from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, Play, TrendingUp, Users, Zap } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

const useOptimizedInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold,
      rootMargin: "50px",
    })
    const current = ref.current
    if (current) observer.observe(current)
    return () => {
      if (current) observer.unobserve(current)
    }
  }, [threshold])
  return [ref, isInView] as const
}

const PerformanceTypewriter: React.FC<{ text: string; delay?: number; speed?: number; className?: string }> = ({
  text,
  delay = 0,
  speed = 50,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true)
      return
    }
    const timer = setTimeout(
      () => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex((prev) => prev + 1)
      },
      delay + currentIndex * speed,
    )
    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, speed])

  return (
    <span className={`relative ${className}`}>
      {displayText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-brand-accent ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </span>
  )
}

const AdvancedFloatingMetric: React.FC<{
  icon: React.ReactNode
  value: string
  label: string
  delay: number
  position: { top?: string; bottom?: string; left?: string; right?: string }
  mouseX: any
  mouseY: any
}> = ({ icon, value, label, delay, position, mouseX, mouseY }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const unsubX = mouseX.onChange((latest: number) => {
      if (ref.current && isHovered) {
        const rect = ref.current.getBoundingClientRect()
        x.set((latest - (rect.left + rect.width / 2)) * 0.1)
      } else {
        x.set(0)
      }
    })
    const unsubY = mouseY.onChange((latest: number) => {
      if (ref.current && isHovered) {
        const rect = ref.current.getBoundingClientRect()
        y.set((latest - (rect.top + rect.height / 2)) * 0.1)
      } else {
        y.set(0)
      }
    })
    return () => {
      unsubX()
      unsubY()
    }
  }, [mouseX, mouseY, x, y, isHovered])

  return (
    <motion.div
      ref={ref}
      className="absolute glass-card rounded-2xl p-4 shadow-glass backdrop-blur-xl cursor-pointer group"
      style={{ ...position, x, y }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          className="p-2 bg-gradient-to-br from-brand-accent to-brand-accent-light rounded-lg text-surface-light"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <div>
          <motion.div
            className="text-lg font-bold text-surface-dark"
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.div>
          <div className="text-xs text-surface-dark/60">{label}</div>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-accent rounded-full"
            style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 2) * 40}%` }}
            animate={isHovered ? { y: [-10, -20, -10], opacity: [0, 1, 0], scale: [0, 1, 0] } : {}}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

const UltraSophisticatedBrowserMockup: React.FC = () => {
  const [ref, isInView] = useOptimizedInView(0.3)
  const [dataPoints, setDataPoints] = useState([
    { value: 847, label: "MRR (K)", trend: "+23.4%" },
    { value: 2.3, label: "Response (min)", trend: "-47%" },
    { value: 94.7, label: "Close Rate (%)", trend: "+12%" },
  ])

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setDataPoints((prev) =>
        prev.map((point) => ({ ...point, value: point.value + (Math.random() - 0.5) * (point.value * 0.01) })),
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [isInView])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    },
    [mouseX, mouseY],
  )

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-[800px] mx-auto"
      initial={{ opacity: 0, y: 60, rotateX: 25 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative rounded-2xl shadow-2xl bg-surface-light border border-earth-200/50 overflow-hidden backdrop-blur-xl">
        <div className="h-12 bg-gradient-to-r from-earth-100 via-earth-50 to-earth-100 flex items-center px-6 border-b border-earth-200/50">
          <div className="flex space-x-2">
            {["red", "yellow", "green"].map((color) => (
              <motion.div
                key={color}
                className={`w-3 h-3 rounded-full bg-${color}-400 shadow-sm cursor-pointer`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center">
            <motion.div
              className="bg-surface-light/80 backdrop-blur-sm rounded-lg px-4 py-1.5 text-xs text-earth-700 font-mono border border-earth-200/50 cursor-text"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-green-600">🔒</span> volv.ai/dashboard
            </motion.div>
          </div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-3 bg-earth-300 rounded-sm"
                whileHover={{ backgroundColor: "#F3954A" }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-surface-light via-earth-50/50 to-surface-light p-8">
          <Image
            src="/placeholder.svg?width=800&height=500"
            alt="Volv Dashboard showing comprehensive business metrics and AI insights"
            width={800}
            height={500}
            className="object-cover w-full rounded-xl shadow-lg"
            priority
          />
          <AdvancedFloatingMetric
            icon={<TrendingUp className="w-4 h-4" />}
            value={`$${dataPoints[0].value.toFixed(0)}K`}
            label="Monthly Revenue"
            delay={1.2}
            position={{ top: "20px", right: "20px" }}
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <AdvancedFloatingMetric
            icon={<Users className="w-4 h-4" />}
            value={`${dataPoints[1].value.toFixed(1)} min`}
            label="Avg Response"
            delay={1.4}
            position={{ bottom: "20px", left: "20px" }}
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <AdvancedFloatingMetric
            icon={<Zap className="w-4 h-4" />}
            value={`${dataPoints[2].value.toFixed(1)}%`}
            label="Close Rate"
            delay={1.6}
            position={{ top: "50%", right: "-60px", transform: "translateY(-50%)" }}
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-2 glass-card rounded-full px-3 py-1.5 shadow-glass"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-xs font-medium text-surface-dark">Live</span>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-accent/10 to-olive-light/10 blur-3xl -z-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

const PerformanceOptimizedHero: React.FC = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])

  return (
    <section className="relative bg-surface-light section-padding pt-32 md:pt-40 overflow-hidden">
      <div className="absolute inset-0 bg-radial-hero opacity-40"></div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/8 rounded-full blur-3xl will-change-transform"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transform: "translate3d(0,0,0)" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-olive-green/6 rounded-full blur-3xl will-change-transform"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0], x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transform: "translate3d(0,0,0)" }}
      />

      <motion.div className="container-custom relative z-10 text-center" style={{ y, opacity, scale }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-display font-bold text-surface-dark mb-4 max-w-5xl mx-auto leading-tight">
            Everything You Need,{" "}
            <span className="relative inline-block">
              <PerformanceTypewriter text="Before You Ask" delay={1000} speed={80} className="text-brand-accent" />
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-accent via-brand-accent-light to-brand-accent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
              />
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="max-w-3xl mx-auto text-body-large text-surface-dark/70 leading-relaxed font-medium">
            Volv consolidates data from your CRM, ad platforms, Typeform, Calendly, and more, transforming it into a
            multi-source attribution platform. Get perfect reporting and actionable insights to make{" "}
            <motion.span
              className="font-bold text-surface-dark bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 px-2 py-1 rounded-lg cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(243,149,74,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              money-making decisions
            </motion.span>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
        >
          <MagneticButton
            className="group relative overflow-hidden bg-surface-dark text-surface-light px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500"
            strength={0.3}
          >
            <span className="relative z-10 flex items-center gap-3">
              {" "}
              Book a Demo{" "}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                {" "}
                <ArrowRight className="w-5 h-5" />{" "}
              </motion.div>{" "}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-accent-light"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 bg-surface-light/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-surface-light rounded-full opacity-0"
                  style={{ left: `${10 + i * 10}%`, top: `${20 + (i % 3) * 20}%` }}
                  whileHover={{ opacity: [0, 1, 0], y: [-5, -15, -5], scale: [0, 1, 0] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Number.POSITIVE_INFINITY }}
                />
              ))}
            </motion.div>
          </MagneticButton>
          <MagneticButton
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-surface-dark border-2 border-earth-200 hover:border-brand-accent hover:text-brand-accent transition-all duration-300 glass-card"
            strength={0.2}
          >
            <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
              {" "}
              <Play className="w-5 h-5" />{" "}
            </motion.div>{" "}
            Watch Demo
          </MagneticButton>
        </motion.div>

        <UltraSophisticatedBrowserMockup />

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          <p className="text-sm text-surface-dark/50 mb-8 font-medium">Trusted by forward-thinking teams worldwide</p>
          <div className="flex justify-center items-center space-x-12">
            {["TechCorp", "InnovateLab", "GrowthCo", "ScaleUp"].map((company, index) => (
              <motion.div
                key={company}
                className="text-base font-semibold text-surface-dark/60 hover:text-brand-accent cursor-pointer relative group"
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {company}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export { PerformanceOptimizedHero }
export default PerformanceOptimizedHero
