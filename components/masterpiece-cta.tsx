"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

const features = [
  "Personalized walkthrough",
  "No commitment required",
  "See your data in action",
  "Expert consultation included",
]

export default function MasterpieceCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-gradient-to-br from-surface-light via-neutral-50 to-surface-light relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-brand-accent-light/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-accent/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200/50 shadow-soft">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-surface-dark">Ready to see the magic?</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-dark leading-tight">
              Experience <span className="gradient-text-perfect">answers before questions</span>
            </h2>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xl text-surface-dark/70 max-w-3xl mx-auto leading-relaxed">
              See how thousands of organizations have transformed their decision-making process with Volv's predictive
              business intelligence platform.
            </p>
          </motion.div>

          {/* Features list */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-wrap justify-center gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-brand-accent" />
                  <span className="text-surface-dark font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <MagneticButton
              className="bg-surface-dark text-surface-light px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-surface-dark/90 transition-all duration-300 flex items-center gap-3 shadow-elegant"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/calculator'}
            >
              See Demo
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>

            <MagneticButton
              className="border-2 border-neutral-200 text-surface-dark px-8 py-4 rounded-2xl font-semibold text-lg hover:border-brand-accent hover:text-brand-accent transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/calculator'}
            >
              See Demo
            </MagneticButton>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 pt-8 border-t border-neutral-200"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <p className="text-sm text-surface-dark/60 mb-4">Trusted by leading organizations worldwide</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              <div className="w-24 h-8 bg-neutral-200 rounded" />
              <div className="w-24 h-8 bg-neutral-200 rounded" />
              <div className="w-24 h-8 bg-neutral-200 rounded" />
              <div className="w-24 h-8 bg-neutral-200 rounded" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
