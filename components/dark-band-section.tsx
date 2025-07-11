"use client"

import { motion } from "framer-motion"
import { Zap, Shield, TrendingUp, Users } from "lucide-react"

export function DarkBandSection() {
  const stats = [
    {
      icon: Zap,
      value: "10x",
      label: "Faster Insights",
      description: "Get results in seconds, not hours",
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Uptime",
      description: "Enterprise-grade reliability",
    },
    {
      icon: TrendingUp,
      value: "340%",
      label: "Average ROI",
      description: "Proven return on investment",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Happy Users",
      description: "Trusted by businesses worldwide",
    },
  ]

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by Industry Leaders</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of businesses that have transformed their operations with our platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-200 mb-2">{stat.label}</h3>

              <p className="text-gray-400">{stat.description}</p>
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
            className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Join Them Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
