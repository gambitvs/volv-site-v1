"use client"

import type React from "react"

import { useEffect } from "react"

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

class AdvancedAnalytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string
  private userId?: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeTracking()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeTracking() {
    // Track page views
    this.track("page_view", {
      url: window.location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
    })

    // Track scroll depth
    let maxScroll = 0
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent
        if (scrollPercent % 25 === 0) {
          this.track("scroll_depth", { percent: scrollPercent })
        }
      }
    }

    window.addEventListener("scroll", trackScroll, { passive: true })

    // Track time on page
    const startTime = Date.now()
    window.addEventListener("beforeunload", () => {
      const timeOnPage = Date.now() - startTime
      this.track("time_on_page", { duration: timeOnPage })
    })
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        session_id: this.sessionId,
        user_id: this.userId,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
    }

    this.events.push(event)
    this.sendEvent(event)
  }

  private async sendEvent(event: AnalyticsEvent) {
    try {
      // Send to your analytics endpoint
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error("Analytics error:", error)
    }
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  getEvents() {
    return this.events
  }
}

const analytics = new AdvancedAnalytics()

export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { track } = useAnalytics()

  useEffect(() => {
    // Track clicks on important elements
    const trackClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A") {
        track("click", {
          element: target.tagName.toLowerCase(),
          text: target.textContent?.slice(0, 100),
          href: target.getAttribute("href"),
        })
      }
    }

    document.addEventListener("click", trackClick)
    return () => document.removeEventListener("click", trackClick)
  }, [track])

  return <>{children}</>
}
