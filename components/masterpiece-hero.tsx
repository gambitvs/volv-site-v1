"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Play, ArrowRight, BarChart3, TrendingUp, Users, Zap } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

export function MasterpieceHero() {
  const router = useRouter()
  const [currentText, setCurrentText] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const heroTexts = ["Answers Before You Ask", "Insights Before You Need Them", "Intelligence Before You Search"]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const floatingMetrics = [
    { icon: BarChart3, label: "Revenue Growth", value: "+127%", delay: 0.2 },
    { icon: TrendingUp, label: "Efficiency", value: "+89%", delay: 0.4 },
    { icon: Users, label: "User Satisfaction", value: "98%", delay: 0.6 },
    { icon: Zap, label: "Time Saved", value: "15hrs/week", delay: 0.8 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(80,82,50,0.15)_1px,_transparent_0)] bg-[size:24px_24px]" />
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-olive-green/20 to-olive-light/20 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-surface-dark mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Get{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  className="gradient-text-perfect inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {heroTexts[currentText]}
                </motion.span>
              </AnimatePresence>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-surface-dark/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="text-brand-accent font-semibold">Before you ask</span>, Volv consolidates your business
              data and surfaces the insights you need. Experience the future of proactive business intelligence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <MagneticButton variant="primary" size="lg" className="group text-base font-medium" onClick={() => router.push('/calculator')}>
                Schedule Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" className="group text-base font-medium" onClick={() => router.push('/calculator')}>
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </MagneticButton>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <p className="text-sm text-surface-dark/60 mb-4">Trusted by 500+ growing businesses</p>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Main Dashboard Mockup */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-earth-200 overflow-hidden">
              {/* Browser Header */}
              <div className="bg-earth-100 px-4 py-3 border-b border-earth-200 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-surface-dark/60 ml-4">
                  volv.ai/dashboard
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 bg-gradient-to-br from-white to-earth-50">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-surface-dark">Business Overview</h3>
                    <div className="w-8 h-8 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-lg"></div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Revenue", value: "$127K", change: "+12%" },
                      { label: "Customers", value: "2,847", change: "+8%" },
                      { label: "Conversion", value: "3.2%", change: "+0.4%" },
                      { label: "Growth", value: "89%", change: "+15%" },
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        className="bg-white rounded-lg p-3 border border-earth-200"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                      >
                        <div className="text-xs text-surface-dark/60">{metric.label}</div>
                        <div className="text-lg font-bold text-surface-dark">{metric.value}</div>
                        <div className="text-xs text-green-600">{metric.change}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart Placeholder */}
                  <div className="bg-white rounded-lg p-4 border border-earth-200">
                    <div className="flex items-end space-x-1 h-16">
                      {[40, 65, 45, 80, 55, 90, 70, 85].map((height, index) => (
                        <motion.div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-brand-accent to-brand-accent-light rounded-sm"
                          style={{ height: `${height}%` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Metric Cards */}
            {floatingMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="absolute bg-white rounded-xl shadow-lg border border-earth-200 p-4 backdrop-blur-sm"
                style={{
                  top: `${20 + index * 15}%`,
                  right: index % 2 === 0 ? "-10%" : "auto",
                  left: index % 2 === 1 ? "-10%" : "auto",
                }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2 + metric.delay, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-lg flex items-center justify-center">
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-surface-dark/60">{metric.label}</div>
                    <div className="text-lg font-bold text-surface-dark">{metric.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
