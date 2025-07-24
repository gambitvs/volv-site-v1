"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, Users, Shield, Star, Phone, ChevronDown, ChevronUp } from "lucide-react"
import { formatCurrency } from "@/lib/revenue-calculator"

interface FAQ {
  question: string
  answer: string
}

interface Testimonial {
  name: string
  company: string
  result: string
  quote: string
  avatar?: string
}

export function BookingPage() {
  const searchParams = useSearchParams()
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [revenueAmount, setRevenueAmount] = useState<number>(0)

  useEffect(() => {
    const amount = searchParams.get('revenue')
    if (amount) {
      setRevenueAmount(Number(amount))
    }
  }, [searchParams])

  const testimonials: Testimonial[] = [
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

  const faqs: FAQ[] = [
    {
      question: "What exactly happens during the strategy call?",
      answer: "We'll review your calculator results in detail, identify the highest-impact opportunities, and create a specific action plan for your business. You'll leave with clear next steps and priorities."
    },
    {
      question: "Is there really no commitment or cost?",
      answer: "Absolutely none. This is a genuine consultation to help you understand your opportunities. We only work with businesses that are a great fit, and that decision is mutual."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most businesses see initial improvements within 2-4 weeks of implementing our recommendations. The full revenue recovery typically happens over 2-3 months."
    },
    {
      question: "What if my business is too small or too large?",
      answer: "We work with businesses from $1M to $50M+ in revenue. The principles scale, and we'll tailor everything to your specific situation and resources."
    },
    {
      question: "Do you actually implement the changes or just advise?",
      answer: "We can do both. During the call, we'll discuss whether you want to implement internally or have our team help with execution. It's entirely up to you."
    }
  ]

  const processSteps = [
    {
      number: "1",
      title: "Review Your Results",
      description: "We'll analyze your calculator data and identify the biggest opportunities"
    },
    {
      number: "2",
      title: "Create Your Plan",
      description: "Get a specific, prioritized action plan tailored to your business"
    },
    {
      number: "3",
      title: "Define Next Steps",
      description: "Leave with clear priorities and timeline for implementation"
    }
  ]

  const callIncludes = [
    "Detailed analysis of your revenue gaps",
    "Specific recommendations for each opportunity",
    "Prioritized action plan with timelines",
    "Resource requirements and ROI projections",
    "Q&A about implementation challenges"
  ]

  return (
    <>
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive"
      />
      <div className="min-h-screen bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:pr-8"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Calculator Complete
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-surface-dark mb-6 leading-tight">
                    Let's Recover Your{" "}
                    <span className="gradient-text-perfect">
                      {revenueAmount > 0 ? formatCurrency(revenueAmount) : "$XXX,XXX"}
                    </span>{" "}
                    in Lost Revenue
                  </h1>
                  <p className="text-xl text-surface-dark/70 mb-8 leading-relaxed">
                    You've identified the opportunity. Now let's create your personalized recovery plan. 
                    Book a free 30-minute strategy call to turn these insights into results.
                  </p>
                </div>

                {/* Social Proof */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {String.fromCharCode(64 + i)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                        <span className="ml-2 text-sm text-surface-dark/70">4.9/5 from 127 calls</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-surface-dark/60">
                    Join 500+ companies who've recovered their lost revenue with our proven process
                  </p>
                </div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-light rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold">{step.number}</span>
                      </div>
                      <h3 className="font-semibold text-surface-dark mb-2">{step.title}</h3>
                      <p className="text-sm text-surface-dark/60">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Calendar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:pl-8"
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-earth-200 p-8">
                  <div className="text-center mb-6">
                    <Calendar className="w-12 h-12 text-brand-accent mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-surface-dark mb-2">
                      Book Your Strategy Call
                    </h2>
                    <p className="text-surface-dark/70">
                      Choose a time that works for your schedule
                    </p>
                  </div>

                  {/* Calendly inline widget */}
                  <div className="calendly-inline-widget" data-url="https://calendly.com/trading101/weekly-touch-point?primary_color=ff8000" style={{minWidth: '320px', height: '700px'}}></div>

                  {/* Call Benefits */}
                  <div className="mt-6 pt-6 border-t border-earth-200">
                    <h4 className="font-semibold text-surface-dark mb-4">Your strategy call includes:</h4>
                    <div className="space-y-3">
                      {callIncludes.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-surface-dark/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Reassurance Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-surface-dark mb-12">
              What to Expect from Your Call
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-surface-dark mb-2">30 Minutes</h3>
                <p className="text-sm text-surface-dark/60">Focused session, no fluff</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-surface-dark mb-2">No Commitment</h3>
                <p className="text-sm text-surface-dark/60">Genuine consultation, no pressure</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-surface-dark mb-2">Expert Analysis</h3>
                <p className="text-sm text-surface-dark/60">Experienced revenue specialists</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-surface-dark mb-2">Actionable Plan</h3>
                <p className="text-sm text-surface-dark/60">Clear next steps and priorities</p>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-green-800">Our Guarantee</h3>
              </div>
              <p className="text-green-700 text-lg">
                If we can't identify at least 3 specific opportunities to recover revenue in your business, 
                the call is completely free. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-surface-dark mb-4">
                Real Results from Real Businesses
              </h2>
              <p className="text-xl text-surface-dark/70">
                See how companies like yours recovered their lost revenue
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-earth-200"
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
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {testimonial.result}
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-surface-dark/70 italic">
                    "{testimonial.quote}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-surface-dark mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-surface-dark/70">
                Everything you need to know about your strategy call
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-earth-50 rounded-xl border border-earth-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-earth-100 transition-colors"
                  >
                    <h3 className="font-semibold text-surface-dark pr-4">
                      {faq.question}
                    </h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-surface-dark flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-surface-dark flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-surface-dark/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-surface-light via-earth-50 to-earth-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full text-red-600 font-medium mb-8">
                <Clock className="w-5 h-5 mr-2" />
                Limited spots available this month
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-surface-dark mb-6">
                Don't Let Another Day of Revenue Slip Away
              </h2>
              
              <p className="text-xl text-surface-dark/70 mb-8">
                You've seen the numbers. You know the opportunity exists. 
                Take the next step and turn insights into results.
              </p>

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-earth-200 mb-8">
                <div className="flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-brand-accent mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-surface-dark">
                      Prefer to Talk First?
                    </h3>
                    <p className="text-surface-dark/70">
                      Call us directly at <a href="tel:+17208066865" className="text-brand-accent font-medium">+1 (720) 806-6865</a>
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-surface-dark/60 mb-4">
                    Or scroll up to book your strategy call online
                  </p>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-8 py-3 bg-gradient-to-r from-brand-accent to-brand-accent-light text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Book Your Call Now
                  </button>
                </div>
              </div>

              <p className="text-sm text-surface-dark/60">
                <strong>Remember:</strong> If we can't identify clear opportunities, the call is completely free. 
                You have nothing to lose and everything to gain.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
