"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function IntelligentPreloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const resources = [
      ...Array.from(document.images),
      ...Array.from(document.querySelectorAll("script[src]")),
      ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')),
    ]

    let loadedCount = 0
    const totalResources = resources.length

    const updateProgress = () => {
      loadedCount++
      setProgress((loadedCount / totalResources) * 100)

      if (loadedCount >= totalResources) {
        setTimeout(() => setIsLoading(false), 500)
      }
    }

    resources.forEach((resource) => {
      if (resource instanceof HTMLImageElement) {
        if (resource.complete) {
          updateProgress()
        } else {
          resource.addEventListener("load", updateProgress)
          resource.addEventListener("error", updateProgress)
        }
      } else {
        updateProgress()
      }
    })

    // Fallback timeout
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <p className="text-gray-600">Loading... {Math.round(progress)}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
