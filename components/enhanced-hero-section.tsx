"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const FloatingElement: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
)

const EnhancedBrowserMockup: React.FC = () => {
  return (
    <motion.div
      className="relative rounded-2xl shadow-2xl bg-surface-light border border-earth-200/50 overflow-hidden w-full max-w-[700px] mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5 }}
    >
      <div className="h-10 bg-gradient-to-r from-earth-100 to-earth-50 flex items-center px-4 space-x-2 border-b border-earth-200/50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-surface-light/60 rounded-md px-3 py-1 text-xs text-earth-700 font-mono">
            volv.ai/dashboard
          </div>
        </div>
      </div>
      <div className="relative bg-gradient-to-br from-surface-light to-earth-50 p-6">
        <Image
          src="/placeholder.svg?width=700&height=400"
          alt="Volv Dashboard showing real-time business metrics and insights"
          width={700}
          height={400}
          className="object-cover w-full rounded-lg"
          priority
        />
        <motion.div
          className="absolute top-8 right-8 bg-surface-light/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-surface-light/20"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="text-xs text-earth-600 mb-1">MRR Growth</div>
          <div className="text-lg font-bold text-green-600">+23.4%</div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-8 bg-surface-light/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-surface-light/20"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        >
          <div className="text-xs text-earth-600 mb-1">Lead Response</div>
          <div className="text-lg font-bold text-brand-accent">2.3 min</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const EnhancedHeroSection: React.FC = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  return (
    <section className="relative bg-surface-light section-padding pt-32 md:pt-40 overflow-hidden">
      <div className="absolute inset-0 bg-radial-hero opacity-60"></div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent-light/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div className="container-custom relative z-10 text-center" style={{ y, opacity }}>
        <FloatingElement delay={0.1}>
          <h1 className="text-h1-custom font-bold text-surface-dark mb-6 max-w-4xl mx-auto">
            Everything You Need,{" "}
            <span className="relative">
              <span className="text-brand-accent">Before You Ask</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              />
            </span>
          </h1>
        </FloatingElement>

        <FloatingElement delay={0.2}>
          <p className="max-w-2xl mx-auto text-body-large text-surface-dark/70 mb-12 leading-relaxed">
            Volv consolidates data from your CRM, ad platforms, Typeform, Calendly, and more, transforming it into a
            multi-source attribution platform. Get perfect reporting and actionable insights to make{" "}
            <span className="font-semibold text-surface-dark">money-making decisions</span>.
          </p>
        </FloatingElement>

        <FloatingElement delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="dark-cta"
                size="lg"
                className="group relative overflow-hidden px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-base font-semibold border-2 border-earth-200 hover:border-brand-accent hover:text-brand-accent transition-all duration-300 bg-transparent"
              >
                Talk to Our Team
              </Button>
            </motion.div>
          </div>
        </FloatingElement>

        <FloatingElement delay={0.4}>
          <EnhancedBrowserMockup />
        </FloatingElement>

        <FloatingElement delay={0.8}>
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-sm text-surface-dark/50 mb-4">Trusted by forward-thinking teams</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {["Startup A", "Company B", "Team C"].map((company) => (
                <motion.div
                  key={company}
                  className="text-sm font-medium text-surface-dark"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </FloatingElement>
      </motion.div>
    </section>
  )
}

export { EnhancedHeroSection }
export default EnhancedHeroSection
