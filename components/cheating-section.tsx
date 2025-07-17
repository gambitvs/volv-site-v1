"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle, TrendingUp, Clock, Users, Zap } from "lucide-react"
import { WistiaEmbed } from "./wistia-embed"

export function CheatingSection() {
  const [activeStory, setActiveStory] = useState(0)

  const successStories = [
    {
      company: "TechFlow Inc.",
      industry: "SaaS",
      challenge: "Spending 20+ hours weekly on manual reporting",
      solution: "Automated insights and real-time dashboards",
      results: [
        { metric: "Time Saved", value: "18 hours/week", icon: Clock },
        { metric: "Revenue Growth", value: "+145%", icon: TrendingUp },
        { metric: "Team Efficiency", value: "+67%", icon: Users },
      ],
      quote:
        "It's like having a crystal ball for our business. We see problems before they happen and opportunities before our competitors.",
      author: "Sarah Chen, VP Operations",
      avatar: "/placeholder.svg?height=64&width=64&text=SC",
      wistiaId: "5twmbbpy3y",
      wistiaAspect: "1.7777777777777777",
    },
    {
      company: "Growth Labs",
      industry: "Marketing Agency",
      challenge: "Clients demanding faster insights and reporting",
      solution: "Client-facing dashboards with real-time metrics",
      results: [
        { metric: "Client Satisfaction", value: "98%", icon: Users },
        { metric: "Report Generation", value: "10x faster", icon: Zap },
        { metric: "New Clients", value: "+89%", icon: TrendingUp },
      ],
      quote:
        "Our clients are amazed by the instant insights. We've become their most trusted partner because we always have the answers.",
      author: "Michael Rodriguez, Data Director",
      avatar: "/placeholder.svg?height=64&width=64&text=MR",
      wistiaId: "srkzmdwxu9",
      wistiaAspect: "0.5625",
    },
    {
      company: "Innovate Co.",
      industry: "E-commerce",
      challenge: "Missing revenue opportunities due to delayed insights",
      solution: "Predictive analytics and automated alerts",
      results: [
        { metric: "Revenue Recovery", value: "$2.3M", icon: TrendingUp },
        { metric: "Decision Speed", value: "8x faster", icon: Zap },
        { metric: "Missed Opportunities", value: "-95%", icon: CheckCircle },
      ],
      quote:
        "Volv doesn't just show us what happened - it tells us what's about to happen. That's the competitive edge we needed.",
      author: "Emily Watson, CEO",
      avatar: "/placeholder.svg?height=64&width=64&text=EW",
      wistiaId: "u618g0ijae",
      wistiaAspect: "0.5625",
    },
  ]

  const benefits = [
    "See trends before they become obvious",
    "Get alerts before problems become critical",
    "Identify opportunities before competitors",
    "Make decisions with perfect information",
    "Automate insights that used to take hours",
    "Predict outcomes with 95% accuracy",
  ]

  const currentStory = successStories[activeStory]
  const isVerticalVideo = Number.parseFloat(currentStory.wistiaAspect) < 1

  return (
    <section className="section-padding bg-gradient-to-br from-surface-light via-earth-50 to-earth-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-brand-accent/30 to-brand-accent-light/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-olive-green/20 to-olive-light/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-accent/10 to-brand-accent-light/10 border border-brand-accent/20 rounded-full text-brand-accent font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Zap className="w-5 h-5 mr-2" />
            Customer Success Stories
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-dark mb-6">
            It's Like <span className="gradient-text-perfect">Cheating</span>
          </h2>

          <p className="text-lg md:text-xl text-surface-dark/70 max-w-3xl mx-auto mb-8">
            When you have answers before questions are asked, success becomes inevitable. Here's how our customers are
            winning with unfair advantages.
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-center text-left p-3 bg-white/50 rounded-lg border border-earth-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <CheckCircle className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0" />
                <span className="text-sm text-surface-dark/80">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-surface-dark mb-4">Ready to Get Your Unfair Advantage?</h3>
          <p className="text-surface-dark/70 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that are already winning with predictive insights and automated intelligence.
          </p>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-accent-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/calculator'}
          >
            See Demo
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
