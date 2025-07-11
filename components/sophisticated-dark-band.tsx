"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, Zap, BarChart3, Users, ArrowRight, CheckCircle, TrendingUp, Shield } from "lucide-react"

export function SophisticatedDarkBand() {
  const [activeTab, setActiveTab] = useState(0)

  const consolidationSteps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "Automatically gather data from all your business tools and platforms",
      details: "Connect 200+ integrations including CRM, marketing tools, analytics platforms, and custom APIs.",
      metrics: ["99.9% Uptime", "Real-time Sync", "Secure Transfer"],
    },
    {
      icon: Zap,
      title: "AI Processing",
      description: "Our AI engine processes and analyzes your data for meaningful insights",
      details: "Advanced machine learning algorithms identify patterns, trends, and opportunities in your data.",
      metrics: ["< 2s Processing", "95% Accuracy", "Smart Predictions"],
    },
    {
      icon: BarChart3,
      title: "Insight Generation",
      description: "Transform raw data into actionable business intelligence",
      details: "Generate comprehensive reports, dashboards, and recommendations tailored to your business needs.",
      metrics: ["Custom Reports", "Live Dashboards", "Automated Alerts"],
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team in real-time",
      details: "Create shared workspaces, assign tasks, and track progress across your entire organization.",
      metrics: ["Team Workspaces", "Role Management", "Activity Tracking"],
    },
  ]

  const benefits = [
    "Reduce manual reporting by 90%",
    "Increase decision speed by 5x",
    "Improve data accuracy to 99.9%",
    "Save 15+ hours per week",
    "Boost team productivity by 40%",
    "Eliminate data silos completely",
  ]

  const activeStepIcon = consolidationSteps[activeTab].icon
  const activeStepTitle = consolidationSteps[activeTab].title
  const activeStepDescription = consolidationSteps[activeTab].description
  const activeStepDetails = consolidationSteps[activeTab].details
  const activeStepMetrics = consolidationSteps[activeTab].metrics

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-surface-dark via-olive-green to-olive-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,251,244,0.3)_1px,_transparent_0)] bg-[size:32px_32px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 rounded-full blur-3xl"
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

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-accent/20 to-brand-accent-light/20 border border-brand-accent/30 rounded-full text-sm font-medium text-brand-accent mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Shield className="w-4 h-4 mr-2" />
              Data Consolidation
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-light mb-6">
              One Platform, <span className="gradient-text-perfect">All Your Data</span>
            </h2>

            <p className="text-lg md:text-xl text-surface-light/80 mb-8 leading-relaxed">
              Stop jumping between tools. Volv consolidates all your business data into a single, intelligent platform
              that delivers insights before you even know you need them.
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center text-surface-light/90"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <CheckCircle className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-accent-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              See How It Works
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>

          {/* Right Column - Interactive Process */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              {consolidationSteps.map((step, index) => (
                <motion.button
                  key={step.title}
                  className={`
                    flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      activeTab === index
                        ? "bg-brand-accent text-white shadow-lg"
                        : "bg-surface-light/10 text-surface-light/70 hover:bg-surface-light/20"
                    }
                  `}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <step.icon className="w-4 h-4 mr-2" />
                  {step.title}
                </motion.button>
              ))}
            </div>

            {/* Active Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="bg-surface-light/10 backdrop-blur-md rounded-2xl p-8 border border-surface-light/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-xl flex items-center justify-center mr-4">
                    {React.createElement(activeStepIcon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-surface-light">{activeStepTitle}</h3>
                    <p className="text-surface-light/70 text-sm">{activeStepDescription}</p>
                  </div>
                </div>

                <p className="text-surface-light/80 mb-6 leading-relaxed">{activeStepDetails}</p>

                <div className="grid grid-cols-3 gap-4">
                  {activeStepMetrics.map((metric, index) => (
                    <motion.div
                      key={metric}
                      className="text-center p-3 bg-surface-light/5 rounded-lg border border-surface-light/10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <div className="text-brand-accent font-semibold text-sm">{metric}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mt-8 space-x-2">
              {consolidationSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${activeTab === index ? "bg-brand-accent w-8" : "bg-surface-light/30"}
                  `}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-surface-light/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { icon: TrendingUp, label: "Average ROI", value: "340%" },
            { icon: Zap, label: "Setup Time", value: "< 5 min" },
            { icon: Users, label: "Active Users", value: "50K+" },
            { icon: Shield, label: "Uptime", value: "99.9%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                {React.createElement(stat.icon, { className: "w-6 h-6 text-white" })}
              </div>
              <div className="text-2xl font-bold text-surface-light mb-1">{stat.value}</div>
              <div className="text-surface-light/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
