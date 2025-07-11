"use client"

import React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Sparkles } from "lucide-react"

// Error boundary component
class AdvancedErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: React.ComponentType<{ error: Error; resetError: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Advanced Error Boundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || SophisticatedErrorFallback
      return (
        <FallbackComponent
          error={this.state.error!}
          resetError={() => this.setState({ hasError: false, error: null })}
        />
      )
    }

    return this.props.children
  }
}

// Sophisticated error fallback component
const SophisticatedErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRetrying(false)
    resetError()
  }

  return (
    <motion.div
      className="min-h-screen bg-surface-light flex items-center justify-center p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-md w-full text-center">
        {/* Error icon with animation */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
        >
          <AlertTriangle className="w-10 h-10 text-white" />
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-surface-dark mb-4">Something went wrong</h1>
          <p className="text-surface-dark/70 mb-8 leading-relaxed">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
          </p>
        </motion.div>

        {/* Error details (development only) */}
        {process.env.NODE_ENV === "development" && (
          <motion.details
            className="mb-8 text-left bg-neutral-100 rounded-lg p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <summary className="cursor-pointer font-medium text-surface-dark mb-2">Error Details</summary>
            <pre className="text-xs text-red-600 overflow-auto">{error.message}</pre>
          </motion.details>
        )}

        {/* Action buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full bg-surface-dark text-surface-light px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-surface-dark/90 transition-colors duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={isRetrying ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isRetrying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            {isRetrying ? "Retrying..." : "Try Again"}
          </motion.button>

          <motion.button
            onClick={() => (window.location.href = "/")}
            className="w-full border-2 border-neutral-200 text-surface-dark px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-brand-accent/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-brand-accent-light/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  )
}

// Network error component
const NetworkErrorComponent: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    setIsRetrying(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRetrying(false)
    onRetry()
  }

  return (
    <motion.div
      className="text-center p-8 glass-card rounded-3xl shadow-glass max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      >
        <AlertTriangle className="w-8 h-8 text-white" />
      </motion.div>

      <h3 className="text-xl font-bold text-surface-dark mb-4">Connection Lost</h3>
      <p className="text-surface-dark/70 mb-6">
        We're having trouble connecting to our servers. Please check your internet connection and try again.
      </p>

      <motion.button
        onClick={handleRetry}
        disabled={isRetrying}
        className="w-full bg-surface-dark text-surface-light px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-surface-dark/90 transition-colors duration-300 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={isRetrying ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: isRetrying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
        >
          <RefreshCw className="w-5 h-5" />
        </motion.div>
        {isRetrying ? "Reconnecting..." : "Try Again"}
      </motion.button>
    </motion.div>
  )
}

// 404 error component
const NotFoundComponent: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-surface-light flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-lg w-full text-center">
        {/* 404 Animation */}
        <motion.div
          className="text-8xl font-bold text-brand-accent mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-surface-dark mb-4">Page Not Found</h1>
          <p className="text-surface-dark/70 mb-8 leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-neutral-200 text-surface-dark rounded-2xl font-semibold hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>

          <motion.button
            onClick={() => (window.location.href = "/")}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-surface-dark text-surface-light rounded-2xl font-semibold hover:bg-surface-dark/90 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-20 flex items-center gap-2 text-brand-accent"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 flex items-center gap-2 text-brand-accent-light"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export { AdvancedErrorBoundary, SophisticatedErrorFallback, NetworkErrorComponent, NotFoundComponent }
