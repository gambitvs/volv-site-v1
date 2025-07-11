"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

export default function ElegantPullQuote() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="py-24 bg-gradient-to-br from-surface-light to-neutral-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/3 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Quote icon */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-accent to-brand-accent-light rounded-full flex items-center justify-center shadow-elegant">
              <Quote className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Quote text */}
          <motion.blockquote
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-dark leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            "Volv transformed our decision-making process. We now have{" "}
            <span className="gradient-text-perfect">answers before we even know the questions</span> to ask."
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-xl font-semibold text-surface-dark">Sarah Chen</p>
            <p className="text-lg text-surface-dark/70">Chief Data Officer, TechCorp</p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-20 left-20 w-2 h-2 bg-brand-accent rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-3 h-3 bg-brand-accent-light rounded-full"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
