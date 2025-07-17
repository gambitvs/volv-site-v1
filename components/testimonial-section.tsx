"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Award, TrendingUp } from "lucide-react"
import { WistiaEmbed } from "./wistia-embed"

export function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 2,
      quote: "Before Volv, data management was a mess. Now it's clean, reliable, and actionable.",
      author: "Chris Garzon",
      role: "CEO",
      company: "DE Academy",
      industry: "E-commerce",
      avatar: "/placeholder.svg?height=80&width=80&text=CG",
      wistiaId: "qit8jpjtui",
      wistiaAspect: "0.5625",
      metrics: [
        { label: "Increase in Sales Activity", value: "250%" },
        { label: "Rep Performance Tracked", value: "100%" },
        { label: "New Rep Onboarding", value: "<24hr" },
      ],
      rating: 5,
      featured: false,
    },
    {
      id: 3,
      quote:
        "We went from $70K to $230K/month — and it wasn't just from one hire, it was because everything was finally working together.",
      author: "Dr. Jeremy Gartner",
      role: "CEO",
      company: "Career Propulsion",
      industry: "Career Coaching",
      avatar: "/placeholder.svg?height=80&width=80&text=JG",
      wistiaId: "5twmbbpy3y",
      wistiaAspect: "1.7777777777777777",
      metrics: [
        { label: "Rep Efficiency", value: "3X" },
        { label: "Monthly Growth", value: "$70K → $230K" },
        { label: "Accountability", value: "100% Tracked" },
      ],
      rating: 5,
      featured: true,
    },
    {
      id: 4,
      quote: "It wasn't just about closing — it was about building a repeatable, high-performing sales process.",
      author: "Ryan Serhant",
      role: "CEO",
      company: "Sell It Like Serhant",
      industry: "Real Estate",
      avatar: "/placeholder.svg?height=80&width=80&text=RS",
      wistiaId: "u618g0ijae",
      wistiaAspect: "0.5625",
      metrics: [
        { label: "YoY Growth", value: ">100%" },
        { label: "Follow-Up Sales", value: "+40%" },
        { label: "Rep Efficiency", value: "3X" },
      ],
      rating: 5,
      featured: false,
    },
  ]

  const stats = [
    { icon: Star, label: "Average Rating", value: "4.9/5" },
    { icon: Award, label: "Customer Success Rate", value: "98%" },
    { icon: TrendingUp, label: "Average ROI", value: "340%" },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentData = testimonials[currentTestimonial]
  const isVerticalVideo = Number.parseFloat(currentData.wistiaAspect) < 1

  return (
    <section className="section-padding bg-gradient-to-br from-surface-dark via-olive-green to-olive-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,251,244,0.3)_2px,_transparent_0)] bg-[size:48px_48px]" />
      </div>
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 border border-brand-accent/30 rounded-full text-brand-accent font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Quote className="w-5 h-5 mr-2" />
            Customer Stories
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-light mb-6">
            Trusted by Industry <span className="gradient-text-perfect">Leaders</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-light/80 max-w-3xl mx-auto">
            See how businesses across industries are transforming their operations with intelligent insights.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-accent/10 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-xl flex items-center justify-center shadow-inner-white">
                  <stat.icon
                    className="w-6 h-6 text-white"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
                  />
                </div>
              </div>
              <div className="text-2xl font-bold text-surface-light mb-1">{stat.value}</div>
              <div className="text-surface-light/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface-light/10 to-surface-light/5 backdrop-blur-md border border-surface-light/20 h-full flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-full ${isVerticalVideo ? "max-w-sm" : ""}`}>
                  <WistiaEmbed mediaId={currentData.wistiaId} aspectRatio={currentData.wistiaAspect} />
                </div>
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 rounded-full text-sm font-medium text-surface-dark">
                  {currentData.company}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6 inline-block p-3 bg-brand-accent/10 rounded-full border border-brand-accent/20">
                  <Quote className="w-10 h-10 text-brand-accent" />
                </div>
                <blockquote className="text-xl md:text-2xl text-surface-light leading-relaxed mb-8 font-medium">
                  "{currentData.quote}"
                </blockquote>
                <div className="flex items-center space-x-4 mb-8">
                  <img
                    src={currentData.avatar || "/placeholder.svg"}
                    alt={currentData.author}
                    className="w-16 h-16 rounded-full border-2 border-brand-accent/30"
                  />
                  <div>
                    <div className="text-lg font-bold text-surface-light">{currentData.author}</div>
                    <div className="text-surface-light/70">{currentData.role}</div>
                    <div className="text-surface-light/60 text-sm">{currentData.industry}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-8">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-surface-light/70 ml-2">({currentData.rating}/5)</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {currentData.metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      className="text-center p-4 bg-surface-light/10 rounded-xl border border-surface-light/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <div className="text-lg font-bold text-surface-light">{metric.value}</div>
                      <div className="text-xs text-surface-light/70">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-between mt-12">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentTestimonial === index
                        ? "bg-brand-accent w-8"
                        : "bg-surface-light/30 hover:bg-surface-light/50"
                    }`}
                    onClick={() => {
                      setCurrentTestimonial(index)
                      setIsAutoPlaying(false)
                    }}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                <motion.button
                  className="w-10 h-10 bg-surface-light/10 hover:bg-brand-accent/20 rounded-full flex items-center justify-center border border-surface-light/20 hover:border-brand-accent transition-colors duration-200"
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5 text-surface-light" />
                </motion.button>
                <motion.button
                  className="w-10 h-10 bg-surface-light/10 hover:bg-brand-accent/20 rounded-full flex items-center justify-center border border-surface-light/20 hover:border-brand-accent transition-colors duration-200"
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5 text-surface-light" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
