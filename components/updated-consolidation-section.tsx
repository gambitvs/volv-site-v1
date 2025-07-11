"use client"

import { motion } from "framer-motion"
import { Database, Zap, Shield, TrendingUp, Users, Clock } from "lucide-react"

export function UpdatedConsolidationSection() {
  const benefits = [
    {
      icon: Database,
      title: "Unified Data Hub",
      description: "Consolidate all your business data into one intelligent platform",
      metric: "99.9% uptime",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get insights in milliseconds, not hours",
      metric: "< 100ms response",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance standards",
      metric: "SOC 2 certified",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered forecasting for better decision making",
      metric: "95% accuracy",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and collaborate in real-time",
      metric: "Unlimited users",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous monitoring with instant alerts",
      metric: "Real-time alerts",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need in <span className="text-blue-600">One Platform</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop juggling multiple tools. Volv consolidates your entire business intelligence stack into one powerful,
            easy-to-use platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>

              <p className="text-gray-600 mb-4">{benefit.description}</p>

              <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                {benefit.metric}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
