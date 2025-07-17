"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const ClosingCtaSection: React.FC = () => {
  return (
    <section className="bg-earth-50 section-padding">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-br from-brand-accent to-orange-600 p-8 md:p-12 rounded-2xl shadow-2xl text-floral-white"
        >
          <Sparkles className="w-10 h-10 mx-auto mb-6 opacity-80" />
          <h2 className="text-h2-custom !text-3xl md:!text-4xl text-floral-white mb-4">Ready to See Volv in Action?</h2>
          <p className="text-body-large text-floral-white/80 max-w-xl mx-auto mb-10">
            Join hundreds of forward-thinking companies leveraging Volv to make smarter, faster, data-driven decisions.
            Book your personalized demo today.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="group bg-floral-white text-brand-accent hover:bg-floral-white/90 px-8 py-3 text-base font-semibold"
            onClick={() => window.location.href = '/calculator'}
          >
            See Demo
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ClosingCtaSection
