"use client"

import { useEffect, useRef } from "react"

interface PreloadResource {
  href: string
  as: "image" | "script" | "style" | "font" | "video"
  type?: string
  crossOrigin?: "anonymous" | "use-credentials"
}

export function IntelligentPreloader({ resources }: { resources: PreloadResource[] }) {
  const preloadedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const preloadResource = (resource: PreloadResource) => {
      if (preloadedRef.current.has(resource.href)) return

      const link = document.createElement("link")
      link.rel = "preload"
      link.href = resource.href
      link.as = resource.as

      if (resource.type) link.type = resource.type
      if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin

      document.head.appendChild(link)
      preloadedRef.current.add(resource.href)
    }

    // Preload critical resources immediately
    const criticalResources = resources.filter(
      (r) => r.as === "style" || r.as === "font" || (r.as === "script" && r.href.includes("critical")),
    )

    criticalResources.forEach(preloadResource)

    // Preload other resources after a delay
    const timer = setTimeout(() => {
      const nonCriticalResources = resources.filter((r) => !criticalResources.includes(r))
      nonCriticalResources.forEach(preloadResource)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resources])

  return null
}

export function useIntersectionPreload(threshold = 0.1) {
  const observerRef = useRef<IntersectionObserver>()
  const elementsRef = useRef<Map<Element, () => void>>(new Map())

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = elementsRef.current.get(entry.target)
            if (callback) {
              callback()
              observerRef.current?.unobserve(entry.target)
              elementsRef.current.delete(entry.target)
            }
          }
        })
      },
      { threshold },
    )

    return () => observerRef.current?.disconnect()
  }, [threshold])

  const observe = (element: Element, callback: () => void) => {
    if (observerRef.current) {
      elementsRef.current.set(element, callback)
      observerRef.current.observe(element)
    }
  }

  return { observe }
}
