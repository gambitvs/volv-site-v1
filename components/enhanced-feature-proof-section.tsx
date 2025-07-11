"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Star, TrendingUp, Shield, Zap, Users } from "lucide-react"

export function EnhancedFeatureProofSection() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-time Analytics Dashboard",
      description: "Monitor your business metrics as they happen with our live, interactive dashboard.",
      proof: "Used by 10,000+ businesses",
      rating: 4.9,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations and predictive forecasts based on your data patterns.",
      proof: "95% accuracy rate",
      rating: 4.8,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Create beautiful, custom reports tailored to your specific needs and brand.",
      proof: "SOC 2 Compliant",
      rating: 4.9,
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights, assign tasks, and collaborate with your team in real-time.",
      proof: "Unlimited team members",
      rating: 4.7,
      color: "from-indigo-500 to-indigo-600",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-dark mb-6">
            Powerful Features, <span className="gradient-text-perfect">Proven Results</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-dark/70 max-w-3xl mx-auto">
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
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-earth-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white shadow-md`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 bg-earth-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-bold text-surface-dark">{feature.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-surface-dark mb-3">{feature.title}</h3>
              <p className="text-surface-dark/70 mb-6">{feature.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {feature.proof}
                </span>
                <a
                  href="#"
                  className="text-brand-accent hover:text-brand-accent-dark flex items-center text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
