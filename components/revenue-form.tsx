"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, DollarSign, Users, PhoneCall, Target, TrendingUp, Zap, HelpCircle } from "lucide-react"
import { FormData } from "@/lib/revenue-calculator"

interface RevenueFormProps {
  onSubmit: (data: FormData) => void
  formData: FormData
  setFormData: (data: FormData) => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

interface FormStep {
  id: string
  title: string
  description: string
  icon: React.ElementType
  fields: FormField[]
}

interface FormField {
  name: keyof FormData
  label: string
  type: "number" | "slider" | "select"
  placeholder?: string
  min?: number
  max?: number
  step?: number
  suffix?: string
  tooltip?: string
  options?: { value: string; label: string }[]
  required?: boolean
}

const formSteps: FormStep[] = [
  {
    id: "deal-info",
    title: "Deal Information",
    description: "Tell us about your typical deal size and structure",
    icon: DollarSign,
    fields: [
      {
        name: "average_deal_size",
        label: "Average Deal Size",
        type: "number",
        placeholder: "5000",
        min: 1,
        suffix: "$",
        tooltip: "What's the typical price/value of your product or service?",
        required: true,
      },
      {
        name: "average_order_value",
        label: "Average Order Value (Optional)",
        type: "number",
        placeholder: "2000",
        min: 0,
        suffix: "$",
        tooltip: "If different from deal size, what's your average order value?",
      },
    ],
  },
  {
    id: "lead-volume",
    title: "Lead Volume",
    description: "Help us understand your lead generation",
    icon: Users,
    fields: [
      {
        name: "daily_leads",
        label: "Daily Leads",
        type: "number",
        placeholder: "50",
        min: 1,
        tooltip: "How many fresh leads do you generate per day?",
        required: true,
      },
      {
        name: "total_crm_leads",
        label: "Total CRM Leads",
        type: "number",
        placeholder: "1000",
        min: 0,
        tooltip: "How many total leads do you currently have in your CRM?",
        required: true,
      },
    ],
  },
  {
    id: "qualification",
    title: "Lead Qualification",
    description: "Tell us about your lead quality",
    icon: Target,
    fields: [
      {
        name: "unqualified_fraction",
        label: "Unqualified Lead Rate",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.01,
        suffix: "%",
        tooltip: "What percentage of your leads are unqualified?",
        required: true,
      },
    ],
  },
  {
    id: "booking-activity",
    title: "Booking Activity",
    description: "Let's understand your appointment booking",
    icon: PhoneCall,
    fields: [
      {
        name: "daily_booked_calls",
        label: "Daily Booked Calls",
        type: "number",
        placeholder: "10",
        min: 0,
        tooltip: "How many calls/appointments do you book each day?",
        required: true,
      },
      {
        name: "show_up_rate",
        label: "Show-Up Rate",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.01,
        suffix: "%",
        tooltip: "What percentage of booked calls actually show up?",
        required: true,
      },
    ],
  },
  {
    id: "conversion",
    title: "Conversion Metrics",
    description: "Help us understand your sales conversion",
    icon: TrendingUp,
    fields: [
      {
        name: "conversion_rate",
        label: "Conversion Rate",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.01,
        suffix: "%",
        tooltip: "What percentage of calls convert to a sale?",
        required: true,
      },
    ],
  },
  {
    id: "follow-up",
    title: "Follow-Up Strategy",
    description: "Tell us about your follow-up approach",
    icon: Zap,
    fields: [
      {
        name: "follow_up_intensity",
        label: "Follow-Up Intensity",
        type: "select",
        options: [
          { value: "none", label: "No Follow-Up" },
          { value: "minimal", label: "Minimal Follow-Up" },
          { value: "medium", label: "Medium Follow-Up" },
          { value: "high", label: "High Follow-Up" },
        ],
        tooltip: "How aggressively do you follow up with prospects?",
        required: true,
      },
      {
        name: "num_sales_reps",
        label: "Number of Sales Reps (Optional)",
        type: "number",
        placeholder: "5",
        min: 1,
        tooltip: "How many sales representatives do you have?",
      },
    ],
  },
]

export function RevenueForm({ onSubmit, formData, setFormData, currentStep, setCurrentStep }: RevenueFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const currentStepData = formSteps[currentStep]
  const isLastStep = currentStep === formSteps.length - 1

  const updateField = (name: keyof FormData, value: any) => {
    setFormData({ ...formData, [name]: value })
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    currentStepData.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name]
        if (value === undefined || value === null || value === "" || value === 0) {
          newErrors[field.name] = `${field.label} is required`
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (isLastStep) {
        onSubmit(formData)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleNext()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [currentStep, formData, isLastStep, onSubmit, setCurrentStep])

  const renderField = (field: FormField) => {
    const value = formData[field.name]
    const hasError = errors[field.name]
    const isTouched = touchedFields.has(field.name)

    const handleBlur = () => {
      setTouchedFields(prev => new Set(prev).add(field.name))
    }

    switch (field.type) {
      case "number":
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-surface-dark">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              {field.suffix === "$" && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-dark/50">
                  $
                </div>
              )}
              <input
                type="number"
                value={value || ""}
                onChange={(e) => updateField(field.name, Number(e.target.value))}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                min={field.min}
                step={field.step}
                className={`w-full px-4 py-3 ${field.suffix === "$" ? "pl-8" : ""} border rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors ${
                  hasError ? "border-red-500" : "border-earth-200"
                }`}
              />
              {field.suffix && field.suffix !== "$" && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-dark/50">
                  {field.suffix}
                </div>
              )}
            </div>
            {hasError && (
              <p className="text-sm text-red-500">{hasError}</p>
            )}
            {field.tooltip && (
              <p className="text-sm text-surface-dark/60 flex items-center">
                <HelpCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {field.tooltip}
              </p>
            )}
          </div>
        )

      case "slider":
        const percentage = Math.round((value || 0) * 100)
        return (
          <div key={field.name} className="space-y-4">
            <label className="block text-sm font-medium text-surface-dark">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="px-4 py-6 bg-earth-50 rounded-xl border border-earth-200">
              <div className="mb-4">
                <div className="text-2xl font-bold text-brand-accent text-center">
                  {percentage}%
                </div>
              </div>
              <input
                type="range"
                value={value || 0}
                onChange={(e) => updateField(field.name, Number(e.target.value))}
                onBlur={handleBlur}
                min={field.min}
                max={field.max}
                step={field.step}
                className="w-full h-2 bg-earth-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-surface-dark/50 mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            {hasError && (
              <p className="text-sm text-red-500">{hasError}</p>
            )}
            {field.tooltip && (
              <p className="text-sm text-surface-dark/60 flex items-center">
                <HelpCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {field.tooltip}
              </p>
            )}
          </div>
        )

      case "select":
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-surface-dark">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value || ""}
              onChange={(e) => updateField(field.name, e.target.value)}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors ${
                hasError ? "border-red-500" : "border-earth-200"
              }`}
            >
              <option value="">Select an option</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {hasError && (
              <p className="text-sm text-red-500">{hasError}</p>
            )}
            {field.tooltip && (
              <p className="text-sm text-surface-dark/60 flex items-center">
                <HelpCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {field.tooltip}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-surface-dark">
            Step {currentStep + 1} of {formSteps.length}
          </span>
          <span className="text-sm text-surface-dark/60">
            {Math.round(((currentStep + 1) / formSteps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-earth-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-brand-accent to-brand-accent-light h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-earth-200 p-8"
        >
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <currentStepData.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-surface-dark mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-surface-dark/70">
              {currentStepData.description}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {currentStepData.fields.map(renderField)}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-earth-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                currentStep === 0
                  ? "text-surface-dark/40 cursor-not-allowed"
                  : "text-surface-dark hover:bg-earth-50"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-surface-dark/60 hidden sm:block">
                Press <kbd className="px-2 py-1 bg-earth-100 text-surface-dark rounded border border-earth-300 font-mono text-xs">Enter</kbd> to continue
              </div>
              <button
                onClick={handleNext}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-brand-accent to-brand-accent-light text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 group"
              >
                {isLastStep ? "Calculate Revenue" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
