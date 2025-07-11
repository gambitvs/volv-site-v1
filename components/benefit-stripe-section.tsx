"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function BenefitStripeSection() {
  const benefits = [
    "No setup fees or hidden costs",
    "Cancel anytime, no questions asked",
    "24/7 customer support included",
    "Free data migration assistance",
    "30-day money-back guarantee",
    "Enterprise security standards",
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
          <p className="text-lg text-gray-600">We've got you covered with comprehensive support and guarantees</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm"
            >
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
