"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Image from "next/image"

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-surface-light section-padding pt-24 md:pt-32 overflow-hidden">
      <div className="absolute inset-0 bg-radial-hero opacity-30 z-0"></div>
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full px-4 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-accent">Unlock Your Data Potential</span>
            </motion.div>
            <h1 className="text-h1-custom font-bold text-surface-dark mb-6">
              Intelligent Insights, <br className="hidden md:block" />
              <span className="text-brand-accent">Effortlessly Delivered.</span>
            </h1>
            <p className="text-body-large text-surface-dark/70 mb-10 leading-relaxed">
              Volv empowers your team with AI-driven analytics, turning complex data into clear, actionable strategies
              for growth and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="dark-cta" size="lg" className="group">
                See Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-earth-300 hover:border-brand-accent hover:text-brand-accent bg-transparent"
              >
                Talk to Our Team
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="aspect-video bg-earth-100 rounded-2xl shadow-xl overflow-hidden border border-earth-200/50">
              <Image
                src="/placeholder.svg?width=600&height=338"
                alt="Abstract data visualization representing Volv's analytics platform"
                width={600}
                height={338}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <motion.div
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl -z-10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
