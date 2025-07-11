"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({})

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case "navigation":
            const navEntry = entry as PerformanceNavigationTiming
            setMetrics((prev) => ({
              ...prev,
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            }))
            break

          case "paint":
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({
                ...prev,
                firstContentfulPaint: entry.startTime,
              }))
            }
            break

          case "largest-contentful-paint":
            setMetrics((prev) => ({
              ...prev,
              largestContentfulPaint: entry.startTime,
            }))
            break

          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              setMetrics((prev) => ({
                ...prev,
                cumulativeLayoutShift: (prev.cumulativeLayoutShift || 0) + (entry as any).value,
              }))
            }
            break

          case "first-input":
            setMetrics((prev) => ({
              ...prev,
              firstInputDelay: (entry as any).processingStart - entry.startTime,
            }))
            break
        }
      }
    })

    observer.observe({ entryTypes: ["navigation", "paint", "largest-contentful-paint", "layout-shift", "first-input"] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Send metrics to analytics
    if (Object.keys(metrics).length > 0) {
      fetch("/api/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metrics,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      }).catch(console.error)
    }
  }, [metrics])

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-xs">
      <h4 className="font-bold mb-2">Performance Metrics</h4>
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span>{key}:</span>
          <span>{typeof value === "number" ? Math.round(value) : value}ms</span>
        </div>
      ))}
    </div>
  )
}
