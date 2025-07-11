"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Star } from "lucide-react"

export function FeatureProofSection() {
  const features = [
    {
      title: "Real-time Analytics Dashboard",
      description: "Monitor your business metrics as they happen with our live dashboard",
      proof: "Used by 10,000+ businesses",
      rating: 4.9,
    },
    {
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations based on your data patterns",
      proof: "95% accuracy rate",
      rating: 4.8,
    },
    {
      title: "Custom Reporting",
      description: "Create beautiful reports tailored to your specific needs",
      proof: "500+ report templates",
      rating: 4.9,
    },
    {
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team in real-time",
      proof: "Unlimited team members",
      rating: 4.7,
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features, <span className="text-blue-600">Proven Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed with your success in mind, backed by real data and customer feedback.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                <div className="flex items-center ml-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(feature.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{feature.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>

              <p className="text-gray-600 mb-4">{feature.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {feature.proof}
                </span>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
