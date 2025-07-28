"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, Download, Share2, Calendar, DollarSign, Users, TrendingUp, PhoneCall, Target, Zap } from "lucide-react"
import { RevenueForm } from "./revenue-form"
import { RevenueReport } from "./revenue-report"
import { EmailCapture, type EmailData } from "./email-capture"
import { calculateRevenue, type FormData, type RevenueResults } from "@/lib/revenue-calculator"

export function RevenueCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    average_deal_size: 0,
    daily_leads: 0,
    unqualified_fraction: 0,
    daily_booked_calls: 0,
    total_crm_leads: 0,
    show_up_rate: 0,
    conversion_rate: 0,
    follow_up_intensity: "none",
    average_order_value: 0,
    num_sales_reps: 0,
  })
  const [results, setResults] = useState<RevenueResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [emailData, setEmailData] = useState<EmailData | null>(null)

  const handleFormSubmit = async (data: FormData) => {
    setIsCalculating(true)
    
    // Simulate calculation time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const calculatedResults = calculateRevenue(data)
    setResults(calculatedResults)
    setIsCalculating(false)
    
    // Show email capture after calculation
    setShowEmailCapture(true)
  }

  const handleEmailSubmit = async (emailFormData: EmailData) => {
    setIsSubmittingEmail(true)
    
    try {
      // Prepare data for API
      const submitData = {
        // Email data
        name: emailFormData.name,
        email: emailFormData.email,
        company: emailFormData.company,
        
        // Calculator results
        contractValue: results?.final_lost_revenue,
        cashExtraction: results?.final_lost_revenue_average_order_value,
        dealSize: formData.average_deal_size,
        dailyLeads: formData.daily_leads,
        showUpRate: formData.show_up_rate,
        conversionRate: formData.conversion_rate,
        followUpIntensity: formData.follow_up_intensity,
        totalCrmLeads: formData.total_crm_leads,
        dailyBookedCalls: formData.daily_booked_calls,
        unqualifiedFraction: formData.unqualified_fraction,
        averageOrderValue: formData.average_order_value,
      }
      
      // Submit to API
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })
      
      if (response.ok) {
        setEmailData(emailFormData)
        setShowEmailCapture(false)
      } else {
        console.error('Failed to submit lead data')
        // Still proceed to show results
        setEmailData(emailFormData)
        setShowEmailCapture(false)
      }
    } catch (error) {
      console.error('Error submitting lead:', error)
      // Still proceed to show results
      setEmailData(emailFormData)
      setShowEmailCapture(false)
    } finally {
      setIsSubmittingEmail(false)
    }
  }
  
  const handleBack = () => {
    setResults(null)
    setCurrentStep(0)
    setShowEmailCapture(false)
    setEmailData(null)
  }

  if (isCalculating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
        <motion.div
          className="text-center max-w-md mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-surface-dark mb-3">
            Calculating Your Lost Revenue...
          </h2>
          <p className="text-surface-dark/70 mb-6">
            We're analyzing your sales data and identifying untapped opportunities.
          </p>
          <div className="space-y-3">
            {[
              "Analyzing your sales funnel",
              "Identifying conversion gaps",
              "Calculating revenue potential",
              "Preparing your personalized report"
            ].map((step, index) => (
              <motion.div
                key={step}
                className="flex items-center text-sm text-surface-dark/60"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.5 }}
              >
                <CheckCircle className="w-4 h-4 text-brand-accent mr-2 flex-shrink-0" />
                {step}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  // Show email capture after calculation but before results
  if (results && showEmailCapture) {
    return (
      <EmailCapture
        calculatorData={formData}
        calculatorResults={results}
        onSubmit={handleEmailSubmit}
        isSubmitting={isSubmittingEmail}
      />
    )
  }
  
  // Show results after email is captured
  if (results && !showEmailCapture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
        <RevenueReport 
          results={results} 
          formData={formData} 
          emailData={emailData}
          onBack={handleBack} 
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
      {/* Header */}
      <div className="container-custom py-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-xl flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-surface-dark">
              Lost Revenue Calculator
            </h1>
          </div>
          <p className="text-lg text-surface-dark/70 leading-relaxed">
            Discover how much revenue you're leaving on the table in your sales process. 
            Our calculator analyzes your current metrics and reveals untapped opportunities.
          </p>
        </motion.div>

        {/* Form */}
        <RevenueForm
          onSubmit={handleFormSubmit}
          formData={formData}
          setFormData={setFormData}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  )
}
