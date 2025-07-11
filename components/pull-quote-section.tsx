"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Clock, BarChart, Users, Zap, Target, ShoppingCart } from "lucide-react"
import { WistiaEmbed } from "./wistia-embed"
import { cn } from "@/lib/utils"

const caseStudies = [
  {
    company: "TechFlow Inc.",
    category: "SaaS",
    challenge: "Spending 20+ hours weekly on manual reporting",
    solution: "Automated insights and real-time dashboards",
    quote:
      "It's like having a crystal ball for our business. We see problems before they happen and opportunities before our competitors.",
    author: "Sarah Chen, VP Operations",
    metrics: [
      { icon: Clock, value: "18", unit: "hours/week", description: "Time Saved" },
      { icon: BarChart, value: "+145%", unit: "Revenue Growth" },
      { icon: Users, value: "+67%", unit: "Team Efficiency" },
    ],
    wistiaId: "5twmbbpy3y",
    wistiaAspect: "1.7777777777777777",
  },
  {
    company: "Growth Labs",
    category: "Marketing Agency",
    challenge: "Clients demanding faster insights and reporting",
    solution: "Proactive alerts and collaborative dashboards",
    quote:
      "Volv allows us to be proactive, not reactive. We're identifying campaign opportunities for clients before they even ask.",
    author: "Michael Rodriguez, Head of Analytics",
    metrics: [
      { icon: Zap, value: "98%", unit: "Client Satisfaction" },
      { icon: Clock, value: "10x", unit: "Faster Reporting" },
      { icon: Target, value: "+32%", unit: "Campaign ROI" },
    ],
    wistiaId: "srkzmdwxu9",
    wistiaAspect: "0.5625",
  },
  {
    company: "Innovate Co.",
    category: "E-commerce",
    challenge: "Missing revenue opportunities due to delayed insights",
    solution: "Predictive sales forecasting and inventory analysis",
    quote:
      "We've uncovered $2.3M in new revenue streams thanks to Volv's predictive analytics. It's an essential part of our growth engine.",
    author: "Emily Watson, Director of E-commerce",
    metrics: [
      { icon: BarChart, value: "$2.3M", unit: "New Revenue" },
      { icon: ShoppingCart, value: "8x", unit: "Faster Inventory Turns" },
      { icon: Users, value: "+45%", unit: "Customer LTV" },
    ],
    wistiaId: "u618g0ijae",
    wistiaAspect: "0.5625",
  },
]

const PullQuoteSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCaseStudy = caseStudies[activeIndex]

  return (
    <section className="section-padding bg-surface-light">
      <div className="container-custom">
        <motion.blockquote
          className="text-center text-2xl md:text-4xl font-medium text-surface-dark max-w-4xl mx-auto leading-snug"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          “Volv has revolutionized how we approach data. The insights are not just powerful, they’re presented in a way
          that’s immediately actionable for our entire team.”
          <cite className="block text-lg font-normal text-surface-dark/60 mt-6">
            — Jane Doe, CEO, Innovatech Solutions
          </cite>
        </motion.blockquote>

        <div className="grid lg:grid-cols-12 gap-10 items-start mt-16">
          <div className="lg:col-span-4 space-y-4">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-brand-accent/50",
                  activeIndex === index
                    ? "bg-white shadow-xl border-brand-accent/50 scale-105"
                    : "bg-white/60 border-earth-200/70",
                )}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-surface-dark">{study.company}</h3>
                    <p className="text-sm text-surface-dark/60 mt-1">{study.challenge}</p>
                  </div>
                  <div
                    className={cn(
                      "p-1 rounded-full transition-transform duration-300",
                      activeIndex === index ? "bg-brand-accent/10" : "bg-transparent",
                    )}
                  >
                    <ArrowRight
                      className={cn(
                        "w-5 h-5 transition-colors",
                        activeIndex === index ? "text-brand-accent" : "text-surface-dark/40",
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="bg-white rounded-2xl shadow-2xl border border-earth-200/50 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="bg-earth-100">
                  <WistiaEmbed mediaId={activeCaseStudy.wistiaId} aspectRatio={activeCaseStudy.wistiaAspect} />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-surface-dark">{activeCaseStudy.company}</h3>
                  <p className="mt-2">
                    <span className="font-semibold text-surface-dark/80">Challenge: </span>
                    <span className="text-surface-dark/60">{activeCaseStudy.challenge}</span>
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-surface-dark/80">Solution: </span>
                    <span className="text-surface-dark/60">{activeCaseStudy.solution}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    {activeCaseStudy.metrics.map((metric) => (
                      <div key={metric.description} className="bg-earth-50/70 p-4 rounded-lg">
                        <metric.icon className="w-6 h-6 mx-auto text-brand-accent mb-2" />
                        <p className="font-bold text-xl text-surface-dark">{metric.value}</p>
                        <p className="text-xs text-surface-dark/60">{metric.unit}</p>
                        <p className="text-xs text-surface-dark/60 mt-1">{metric.description}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-8 border-l-4 border-brand-accent/50 pl-6 italic text-surface-dark/80">
                    <p>&quot;{activeCaseStudy.quote}&quot;</p>
                    <cite className="block not-italic mt-4 font-semibold text-surface-dark">
                      &mdash; {activeCaseStudy.author}
                    </cite>
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PullQuoteSection
