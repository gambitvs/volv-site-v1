"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle, Loader2 } from "lucide-react"

interface FormField {
  id: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  validation?: (value: string) => string | null
}

interface SophisticatedFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => Promise<void>
  submitLabel?: string
}

export function SophisticatedForm({ fields, onSubmit, submitLabel = "Submit" }: SophisticatedFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const validateField = (field: FormField, value: string) => {
    if (field.required && !value.trim()) {
      return `${field.label} is required`
    }
    if (field.validation) {
      return field.validation(value)
    }
    return null
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))

    const field = fields.find((f) => f.id === fieldId)
    if (field && touched[fieldId]) {
      const error = validateField(field, value)
      setErrors((prev) => ({ ...prev, [fieldId]: error || "" }))
    }
  }

  const handleBlur = (fieldId: string) => {
    setTouched((prev) => ({ ...prev, [fieldId]: true }))

    const field = fields.find((f) => f.id === fieldId)
    if (field) {
      const error = validateField(field, formData[fieldId] || "")
      setErrors((prev) => ({ ...prev, [fieldId]: error || "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      const error = validateField(field, formData[field.id] || "")
      if (error) newErrors[field.id] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(fields.reduce((acc, field) => ({ ...acc, [field.id]: true }), {}))
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setIsSuccess(true)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 rounded-2xl border border-green-200"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Success!</h3>
        <p className="text-green-600">Your form has been submitted successfully.</p>
      </motion.div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: fields.indexOf(field) * 0.1 }}
          className="relative"
        >
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <div className="relative">
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field.id)}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors[field.id] && touched[field.id]
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
            />

            <AnimatePresence>
              {errors[field.id] && touched[field.id] && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {errors[field.id] && touched[field.id] && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors[field.id]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          submitLabel
        )}
      </motion.button>
    </form>
  )
}
