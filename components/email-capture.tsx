"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, User, Building2, ArrowRight, CheckCircle } from "lucide-react"
import { type FormData, type RevenueResults } from "@/lib/revenue-calculator"

interface EmailCaptureProps {
  calculatorData: FormData
  calculatorResults: RevenueResults
  onSubmit: (emailData: EmailData) => void
  isSubmitting: boolean
}

export interface EmailData {
  name: string
  email: string
  company?: string
}

export function EmailCapture({ 
  calculatorData, 
  calculatorResults, 
  onSubmit, 
  isSubmitting 
}: EmailCaptureProps) {
  const [formData, setFormData] = useState<EmailData>({
    name: '',
    email: '',
    company: ''
  })
  const [errors, setErrors] = useState<Partial<EmailData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<EmailData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof EmailData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-light via-earth-50 to-earth-100 p-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-earth-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-2xl flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-surface-dark mb-3">
            Almost Done!
          </h2>
          
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-brand-accent mb-1">
              {formatCurrency(calculatorResults.final_lost_revenue)}
            </div>
            <div className="text-sm text-surface-dark/70">
              in untapped revenue identified
            </div>
          </div>
          
          <p className="text-surface-dark/70 leading-relaxed">
            Enter your details below to access your personalized revenue analysis and strategic recommendations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-surface-dark mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-dark/40 w-5 h-5" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-200 ${
                  errors.name 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-earth-300 hover:border-earth-400 focus:border-brand-accent'
                }`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-surface-dark mb-2">
              Business Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-dark/40 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-earth-300 hover:border-earth-400 focus:border-brand-accent'
                }`}
                placeholder="your.email@company.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-surface-dark mb-2">
              Company Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-dark/40 w-5 h-5" />
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-earth-300 rounded-xl hover:border-earth-400 focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-200"
                placeholder="Your Company Name (Optional)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-accent to-brand-accent-light text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3" />
                Generating Your Report...
              </>
            ) : (
              <>
                Get My Revenue Analysis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </motion.button>

          {/* Privacy Notice */}
          <p className="text-xs text-surface-dark/60 text-center leading-relaxed">
            We respect your privacy. Your information will be used solely to provide your personalized revenue analysis and follow-up recommendations.
          </p>
        </form>
      </motion.div>
    </div>
  )
}