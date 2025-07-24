"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, TrendingUp, Users, Zap, ArrowRight, Star, Quote } from "lucide-react"

export function InteractiveBenefitStripe() {
  const [activeMetric, setActiveMetric] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const metrics = [
    {
      icon: Clock,
      title: "Time Saved",
      value: "15+ Hours",
      subtitle: "per week",
      description: "Eliminate manual reporting and data gathering with automated insights",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      value: "127%",
      subtitle: "average increase",
      description: "Make data-driven decisions that directly impact your bottom line",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Team Efficiency",
      value: "89%",
      subtitle: "productivity boost",
      description: "Empower your team with instant access to the insights they need",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Zap,
      title: "Decision Speed",
      value: "5x",
      subtitle: "faster decisions",
      description: "Get answers instantly instead of waiting days for reports",
      color: "from-brand-accent to-brand-accent-light",
      bgColor: "bg-orange-50",
    },
  ]

  const testimonials = [
    {
      quote:
        "Volv transformed our data into a strategic asset. We can finally trust our numbers, and that's fundamentally changed how we approach growth.",
      author: "Sasha Karabut",
      role: "CEO",
      company: "eCom Capital",
      avatar: "/avatars/sasha-karabut.jpg",
    },
    {
      quote: "We used to be leaking deals left and right. Now we've got visibility, automation, and confidence.",
      author: "Andrew Sharp",
      role: "COO",
      company: "Bright Vision Digital",
      avatar: "/avatars/andrew-sharp.jpg",
    },
    {
      quote: "It wasn't just about closing — it was about building a repeatable, high-performing sales process.",
      author: "Ryan Serhant",
      role: "CEO",
      company: "Sell It Like Serhant",
      avatar: "/avatars/ryan-serhant.jpg",
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-gradient-to-br from-earth-50 to-surface-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(80,82,50,0.15)_2px,_transparent_0)] bg-[size:40px_40px]" />
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-dark mb-6">
            Measurable Impact on <span className="gradient-text-perfect">Your Business</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-dark/70 max-w-3xl mx-auto">
            Join thousands of businesses that have transformed their operations with intelligent data insights.
          </p>
        </motion.div>

        {/* Interactive Metrics */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Metrics Navigation */}
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                className={`
                p-6 rounded-2xl border cursor-pointer transition-all duration-300
                ${
                  activeMetric === index
                    ? "bg-white shadow-xl border-brand-accent/30 scale-105"
                    : "bg-white/50 border-earth-200 hover:bg-white hover:shadow-lg"
                }
              `}
                onClick={() => setActiveMetric(index)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: activeMetric === index ? 1.05 : 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  bg-gradient-to-r ${metric.color}
                `}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-surface-dark">{metric.value}</span>
                      <span className="text-sm text-surface-dark/60">{metric.subtitle}</span>
                    </div>
                    <h3 className="font-semibold text-surface-dark mb-1">{metric.title}</h3>
                    <p className="text-sm text-surface-dark/70">{metric.description}</p>
                  </div>
                  <ArrowRight
                    className={`
                  w-5 h-5 transition-all duration-200
                  ${activeMetric === index ? "text-brand-accent translate-x-1" : "text-surface-dark/40"}
                `}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Metric Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMetric}
                className="bg-white rounded-2xl p-8 shadow-2xl border border-earth-200"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-8">
                  <div
                    className={`
                  w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4
                  bg-gradient-to-r ${metrics[activeMetric].color}
                `}
                  >
                    {React.createElement(metrics[activeMetric].icon, { className: "w-10 h-10 text-white" })}
                  </div>
                  <div className="text-4xl font-bold text-surface-dark mb-2">{metrics[activeMetric].value}</div>
                  <div className="text-surface-dark/60 mb-4">{metrics[activeMetric].subtitle}</div>
                  <h3 className="text-xl font-bold text-surface-dark mb-2">{metrics[activeMetric].title}</h3>
                  <p className="text-surface-dark/70">{metrics[activeMetric].description}</p>
                </div>

                {/* Progress Visualization */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-surface-dark/60">
                    <span>Before Volv</span>
                    <span>After Volv</span>
                  </div>
                  <div className="relative h-3 bg-earth-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${metrics[activeMetric].color} rounded-full`}
                      initial={{ width: "20%" }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-surface-dark/50">
                    <span>Baseline</span>
                    <span>Current Performance</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-earth-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-surface-dark mb-4">What Our Customers Say</h3>
            <div className="flex justify-center space-x-1 mb-4 text-brand-accent">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-current"
                  style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))" }}
                />
              ))}
            </div>
            <p className="text-surface-dark/60">4.9/5 from 500+ reviews</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className="text-center p-6 rounded-2xl transition-colors duration-300 hover:bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <div className="inline-block p-3 mb-4 bg-earth-100 rounded-full">
                  <Quote className="w-6 h-6 text-brand-accent" />
                </div>
                <blockquote className="text-surface-dark/80 mb-6 italic">"{testimonial.quote}"</blockquote>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-14 h-14 rounded-full p-1 bg-gradient-to-br from-brand-accent to-brand-accent-light shadow-lg">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-full h-full rounded-full border-2 border-surface-light"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-surface-dark">{testimonial.author}</div>
                    <div className="text-sm text-surface-dark/60">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
