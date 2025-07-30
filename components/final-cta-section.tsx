"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Users, Zap, Shield, Star, AlertCircle } from "lucide-react"

export function FinalCtaSection() {
  const router = useRouter()

  const benefits = [
    { icon: Clock, text: "Demo scheduled in 24 hours" },
    { icon: Users, text: "No commitment required" },
    { icon: Zap, text: "See your data in action" },
    { icon: Shield, text: "Enterprise-grade security" },
  ]

  const urgencyFactors = [
    "Limited demo slots available this month",
    "Priority booking for early adopters",
    "Exclusive preview of new features",
  ]

  const socialProof = [
    { metric: "500+", label: "Companies using Volv" },
    { metric: "98%", label: "Customer satisfaction" },
    { metric: "4.9/5", label: "Average rating" },
    { metric: "$2.3M", label: "Average savings per year" },
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-surface-light via-earth-50 to-earth-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-brand-accent/30 to-brand-accent-light/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-olive-green/20 to-olive-light/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(80,82,50,0.1)_1px,_transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Banner */}
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full text-red-600 font-medium mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Limited Demo Slots - Book Now!
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-dark mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to See <span className="gradient-text-perfect">Answers Before Questions?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-surface-dark/70 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join thousands of businesses that have transformed their decision-making with intelligent, predictive
            insights. Book your personalized demo today and see results in minutes, not months.
          </motion.p>

          {/* Social Proof Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {socialProof.map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center p-4 bg-white/70 rounded-xl border border-earth-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              >
                <div className="text-2xl font-bold text-surface-dark mb-1">{item.metric}</div>
                <div className="text-sm text-surface-dark/60">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Booking Button */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              type="button"
              onClick={() => router.push('/calculator')}
              className="w-full px-12 py-6 bg-gradient-to-r from-brand-accent to-brand-accent-light text-white text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center">
                Calculate Revenue
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  className="flex items-center text-sm text-surface-dark/70"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <benefit.icon className="w-4 h-4 text-brand-accent mr-2 flex-shrink-0" />
                  {benefit.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Urgency Factors */}
          <motion.div
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h3 className="text-lg font-bold text-red-800 mb-4">Don't Wait - Limited Availability:</h3>
            <div className="space-y-2">
              {urgencyFactors.map((factor, index) => (
                <motion.div
                  key={factor}
                  className="flex items-center text-red-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{factor}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-surface-dark/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm">Enterprise Security</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm">500+ Happy Customers</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              <span className="text-sm">99.9% Uptime</span>
            </div>
          </motion.div>

          {/* Final Guarantee */}
          <motion.p
            className="text-sm text-surface-dark/60 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            No-pressure demo. See exactly how Volv works with your data.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
