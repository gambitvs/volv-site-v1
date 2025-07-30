"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Zap, Shield, BarChart3, Users, Globe, Sparkles } from "lucide-react"

export function SophisticatedFeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Advanced machine learning algorithms analyze your data patterns and surface actionable insights automatically.",
      benefits: ["Predictive Analytics", "Pattern Recognition", "Automated Reporting"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      delay: 0.1,
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description:
        "Get instant updates and notifications as your business metrics change, ensuring you never miss critical moments.",
      benefits: ["Live Dashboards", "Instant Alerts", "Real-Time Sync"],
      color: "from-brand-accent to-brand-accent-light",
      bgColor: "bg-orange-50",
      delay: 0.2,
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance standards protect your sensitive business data at every step.",
      benefits: ["256-bit Encryption", "GDPR Ready"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      delay: 0.3,
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Deep dive into your business metrics with customizable dashboards and comprehensive reporting tools.",
      benefits: ["Custom Dashboards", "Advanced Filters", "Export Options"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      delay: 0.4,
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Share insights, create team workspaces, and collaborate on data analysis with your entire organization.",
      benefits: ["Team Workspaces", "Shared Dashboards", "Role Management"],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      delay: 0.5,
    },
    {
      icon: Globe,
      title: "Global Integration",
      description:
        "Connect with 200+ business tools and platforms to centralize all your data in one powerful interface.",
      benefits: ["200+ Integrations", "API Access", "Custom Connectors"],
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      delay: 0.6,
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-surface-light to-earth-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-accent/10 to-brand-accent-light/10 border border-brand-accent/20 rounded-full text-sm font-medium text-brand-accent mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-dark mb-6">
            Everything You Need to <span className="gradient-text-perfect">Succeed</span>
          </h2>

          <p className="text-lg md:text-xl text-surface-dark/70 max-w-3xl mx-auto">
            Our comprehensive suite of tools empowers your business with intelligent insights, seamless integrations,
            and enterprise-grade security.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div
                className={`
                relative h-full p-8 rounded-2xl border border-earth-200 bg-white
                transition-all duration-300 ease-out
                ${hoveredCard === index ? "shadow-2xl -translate-y-2" : "shadow-lg hover:shadow-xl"}
              `}
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300`}
                  animate={{ opacity: hoveredCard === index ? 0.05 : 0 }}
                />

                {/* Icon */}
                <motion.div
                  className={`
                    w-16 h-16 rounded-xl flex items-center justify-center mb-6
                    bg-gradient-to-br ${feature.color} shadow-lg
                  `}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-surface-dark mb-4 group-hover:text-surface-dark transition-colors duration-200">
                    {feature.title}
                  </h3>

                  <p className="text-surface-dark/70 mb-6 leading-relaxed">{feature.description}</p>

                  {/* Benefits List */}
                  <ul className="space-y-2 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefit}
                        className="flex items-center text-sm text-surface-dark/60"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: feature.delay + 0.1 + benefitIndex * 0.05 }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} mr-3`} />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  animate={{
                    borderColor: hoveredCard === index ? "rgba(243, 149, 74, 0.3)" : "transparent",
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-surface-dark/70 mb-6">Ready to experience the power of intelligent business analytics?</p>
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-brand-accent to-brand-accent-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/calculator'}
          >
            See Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
