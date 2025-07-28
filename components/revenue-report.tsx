"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Download, Share2, Calendar, TrendingUp, DollarSign, Target, CheckCircle, AlertCircle, Star, Shield, ExternalLink, ChevronDown, ChevronUp, BarChart3, Users, Zap } from "lucide-react"
import { FormData, RevenueResults, formatCurrency, formatNumber } from "@/lib/revenue-calculator"
import { EmailData } from "./email-capture"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface RevenueReportProps {
  results: RevenueResults
  formData: FormData
  emailData: EmailData | null
  onBack: () => void
}

export function RevenueReport({ results, formData, emailData, onBack }: RevenueReportProps) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [showFAQ, setShowFAQ] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  
  // Debug logging
  console.log('Revenue Report Results:', {
    contract_value: results.final_lost_revenue,
    cash_extraction: results.final_lost_revenue_average_order_value,
    email_data: emailData
  })
  
  // Get first name from email data for personalization
  const firstName = emailData?.name ? emailData.name.split(' ')[0] : 'there'

  const sections = [
    { id: "discovery", title: "Discovery" },
    { id: "potential", title: "Revenue Potential" },
    { id: "performance", title: "Performance Analysis" },
    { id: "interpretation", title: "Interpretation" },
    { id: "stories", title: "Success Stories" },
    { id: "cta", title: "Next Steps" },
  ]

  const faqs = [
    {
      question: "How was my lost revenue calculated?",
      answer: "We used key data points from your responses, combined with industry benchmarks, to estimate the revenue currently sitting untapped in your CRM. This figure is conservative but realistic."
    },
    {
      question: "Is this number accurate?",
      answer: "Yes! We use conservative benchmarks and data-backed formulas to estimate revenue potential. The figure is realistic but errs on the side of caution."
    },
    {
      question: "What happens during the strategy call?",
      answer: "We'll review your report together, identify specific opportunities for improvement, and outline actionable steps to recover your lost revenue. It's all about clarity and direction."
    }
  ]

  const testimonials = [
    {
      name: "Chris Garzon",
      company: "DE Academy",
      result: "250% increase in sales",
      quote: "Before Volv, data management was a mess. Now it's clean, reliable, and actionable.",
      avatar: "/avatars/chris-garzon.jpg"
    },
    {
      name: "Dr. Jeremy Gartner",
      company: "Career Propulsion",
      result: "$230K/month growth",
      quote: "We went from $70K to $230K/month — and it wasn't just from one hire, it was because everything was finally working together.",
      avatar: "/avatars/jeremy-gartner.jpg"
    },
    {
      name: "Ryan Serhant",
      company: "Sell It Like Serhant",
      result: ">100% YoY growth",
      quote: "It wasn't just about closing — it was about building a repeatable, high-performing sales process.",
      avatar: "/avatars/ryan-serhant.jpg"
    }
  ]

  const getColorClass = (color: string) => {
    const colorMap = {
      red: "text-red-600 bg-red-50 border-red-200",
      orange: "text-orange-600 bg-orange-50 border-orange-200",
      yellow: "text-yellow-600 bg-yellow-50 border-yellow-200",
      green: "text-green-600 bg-green-50 border-green-200",
      blue: "text-blue-600 bg-blue-50 border-blue-200",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.green
  }

  const scrollToSection = (index: number) => {
    setCurrentSection(index)
    const element = document.getElementById(sections[index].id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      const element = document.getElementById('revenue-report-content')
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`lost-revenue-report-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-earth-200">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-surface-dark hover:text-brand-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Calculator
            </button>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-earth-50 hover:bg-earth-100 text-surface-dark rounded-lg transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </button>
              <button 
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center px-4 py-2 bg-brand-accent hover:bg-brand-accent-light text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? "Generating PDF..." : "Download PDF"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-earth-200 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-8 overflow-x-auto">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentSection === index
                    ? "bg-brand-accent text-white"
                    : "text-surface-dark hover:bg-earth-50"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div id="revenue-report-content" className="container-custom py-12 space-y-16">
        {/* Discovery Section */}
        <motion.section
          id="discovery"
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-surface-dark mb-4">
              Lost Revenue Report
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#FFD700' }}>
              {firstName === 'there' ? 'You' : firstName}, You Just Uncovered Hidden Gold in Your CRM!
            </h2>
            <p className="text-xl md:text-2xl text-surface-dark mb-8 leading-relaxed">
              Based on your answers, your CRM is likely sitting on{' '}
              <span className="font-bold text-brand-accent">
                {formatCurrency(results.final_lost_revenue)}
              </span>{' '}
              of untapped revenue.
            </p>
            <p className="text-lg text-surface-dark/70 mb-12">
              This number represents the potential cash flow sitting inside your sales process right now. 
              The next step? Let's make sure you're not leaving money on the table.
            </p>

            {/* Treasure Visual */}
            <div className="relative">
              <motion.div
                className="text-8xl mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                💰
              </motion.div>
            </div>

            {/* Revenue Potential Bar */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-earth-200">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-surface-dark mb-2">
                  {formatCurrency(results.final_lost_revenue)}
                </div>
                <div className="text-lg text-surface-dark/70">
                  Untapped Revenue Potential
                </div>
              </div>
              <div className="w-full bg-earth-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-surface-dark/60 mt-2">
                <span>Current Performance</span>
                <span>Full Potential</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Revenue Potential Section */}
        <motion.section
          id="potential"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-dark text-center mb-12">
              Lost Revenue Potential
            </h2>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-earth-200">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-dark mb-2">Contract Value</h3>
                <div className="text-2xl font-bold text-surface-dark">
                  {formatCurrency(results.final_lost_revenue)}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-earth-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-dark mb-2">Initial Cash Extraction</h3>
                <div className="text-2xl font-bold text-surface-dark">
                  {formatCurrency(results.final_lost_revenue_average_order_value)}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-earth-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-dark mb-2">Approximate Deals</h3>
                <div className="text-2xl font-bold text-surface-dark">
                  {results.lower_range} - {results.upper_range}
                </div>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Performance Analysis Section */}
        <motion.section
          id="performance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-dark text-center mb-12">
              Conversion Rate Potential
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(results.performance_categories).map(([key, category]) => (
                <div key={key} className={`rounded-2xl p-6 border-2 ${getColorClass(category.color)}`}>
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">
                      {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      {category.percentage.toFixed(1)}%
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getColorClass(category.color)}`}>
                      {category.category}
                    </div>
                    <p className="text-sm mt-3 opacity-80">
                      {category.definition}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Interpretation Section */}
        <motion.section
          id="interpretation"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-dark text-center mb-12">
              How to Interpret Your Results
            </h2>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-earth-200 mb-8">
              <h3 className="text-2xl font-bold text-surface-dark mb-6">
                How We Calculated Your Lost Revenue Potential
              </h3>
              <p className="text-lg text-surface-dark/70 leading-relaxed">
                We analyzed your sales funnel using industry benchmarks and conservative estimates. 
                The calculation considers three key opportunity areas: re-engaging no-shows, 
                converting qualified leads who haven't booked calls, and reviving dormant prospects in your CRM.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-earth-200">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-surface-dark">
                    Frequently Asked Questions
                  </h3>
                  <button
                    onClick={() => setShowFAQ(!showFAQ)}
                    className="flex items-center text-brand-accent hover:text-brand-accent-light transition-colors"
                  >
                    {showFAQ ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {showFAQ && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {faqs.map((faq, index) => (
                        <div key={index} className="border-l-4 border-brand-accent pl-6">
                          <h4 className="font-semibold text-surface-dark mb-2">
                            {faq.question}
                          </h4>
                          <p className="text-surface-dark/70">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Success Stories Section */}
        <motion.section
          id="stories"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-dark text-center mb-12">
              Real Stories of Success
            </h2>
            <p className="text-xl text-surface-dark/70 text-center mb-12">
              Real stories of businesses like yours unlocking hidden revenue and transforming their sales processes.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-earth-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <div className="flex items-center mb-4">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-accent"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {testimonial.name[0]}
                        </span>
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="font-semibold text-surface-dark">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-surface-dark/60">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-surface-dark/70 italic">
                    "{testimonial.quote}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          id="cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-dark mb-8">
              Ready to Unlock Your Revenue Potential?
            </h2>
            <p className="text-xl text-surface-dark/70 mb-12">
              Book a free strategy call to discuss your results and create an action plan 
              to recover your lost revenue.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-earth-200 mb-8">
              <button 
                onClick={() => {
                  const params = new URLSearchParams({
                    revenue: results.final_lost_revenue.toString(),
                    ...(emailData?.name && { name: emailData.name }),
                    ...(emailData?.email && { email: emailData.email }),
                    ...(emailData?.company && { company: emailData.company })
                  })
                  router.push(`/book-strategy-call?${params.toString()}`)
                }}
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-brand-accent to-brand-accent-light text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all duration-200 group"
              >
                <Calendar className="w-5 h-5 mr-3 inline-block" />
                Book Your Free Strategy Call
                <ExternalLink className="w-5 h-5 ml-3 inline-block group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <div className="grid md:grid-cols-4 gap-6 mt-8">
                {[
                  { icon: CheckCircle, text: "Demo scheduled in 24 hours" },
                  { icon: Users, text: "No commitment required" },
                  { icon: Zap, text: "See your data in action" },
                  { icon: Shield, text: "Enterprise-grade security" },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-surface-dark/70">
                    <benefit.icon className="w-4 h-4 text-brand-accent mr-2 flex-shrink-0" />
                    {benefit.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-surface-dark/60">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">500+ Happy Customers</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                <span className="text-sm">99.9% Uptime</span>
              </div>
            </div>

            <p className="text-sm text-surface-dark/60 mt-8">
              No-pressure demo. See exactly how Volv works with your data.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
