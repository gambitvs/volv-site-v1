"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WifiOff, Download, X } from "lucide-react"

const PWASystem: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Online/offline detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  return (
    <>
      {/* Online/Offline Status */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">You're offline</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-surface-light border border-neutral-200 rounded-2xl shadow-2xl p-6"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-accent/10 rounded-2xl">
                <Download className="w-6 h-6 text-brand-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-surface-dark mb-2">Install Volv App</h3>
                <p className="text-sm text-surface-dark/70 mb-4">
                  Get faster access and offline capabilities by installing our app.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="px-4 py-2 bg-brand-accent text-white rounded-lg text-sm font-medium hover:bg-brand-accent-dark transition-colors"
                  >
                    Install
                  </button>
                  <button
                    onClick={() => setShowInstallPrompt(false)}
                    className="px-4 py-2 text-surface-dark/70 text-sm font-medium hover:text-surface-dark transition-colors"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PWASystem
