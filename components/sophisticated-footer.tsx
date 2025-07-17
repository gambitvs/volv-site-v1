"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook } from "lucide-react"
import Image from "next/image"

export function SophisticatedFooter() {

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Integrations", href: "#integrations" },
        { name: "Pricing", href: "#pricing" },
        { name: "API", href: "#api" },
        { name: "Security", href: "#security" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Press", href: "#press" },
        { name: "Partners", href: "#partners" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "Help Center", href: "#help" },
        { name: "Blog", href: "#blog" },
        { name: "Webinars", href: "#webinars" },
        { name: "Case Studies", href: "#cases" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "GDPR", href: "#gdpr" },
        { name: "Compliance", href: "#compliance" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
    { icon: Github, href: "#github", label: "GitHub" },
    { icon: Facebook, href: "#facebook", label: "Facebook" },
  ]

  const contactInfo = [
    { icon: Mail, text: "hello@volv.ai", href: "mailto:hello@volv.ai" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#location" },
  ]

  return (
    <footer className="bg-gradient-to-br from-surface-dark via-olive-green to-olive-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,251,244,0.3)_2px,_transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-brand-accent/10 to-brand-accent-light/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container-custom relative z-10">

        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 relative">
                <Image src="/volv-logo.png" alt="Volv Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="text-xl font-bold text-surface-light">Volv</span>
            </div>
            <p className="text-surface-light/70 mb-6">
              Get answers before you ask questions with Volv's predictive business intelligence platform.
            </p>
            <div className="space-y-3">
              {contactInfo.map((info) => (
                <a
                  key={info.text}
                  href={info.href}
                  className="flex items-center space-x-3 text-surface-light/70 hover:text-surface-light transition-colors"
                >
                  <info.icon className="w-5 h-5 text-brand-accent" />
                  <span>{info.text}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <h4 className="text-lg font-semibold text-surface-light mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-surface-light/70 hover:text-surface-light transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="py-8 border-t border-surface-light/20 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-surface-light/60 text-sm mb-4 md:mb-0">
            © 2024 Volv. All rights reserved. Built with intelligence.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-surface-light/10 rounded-full flex items-center justify-center hover:bg-brand-accent/20 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5 text-surface-light/80" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
