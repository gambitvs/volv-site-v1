"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface ABTest {
  id: string
  variants: string[]
  weights?: number[]
}

interface ABTestContextType {
  getVariant: (testId: string) => string
  trackConversion: (testId: string, conversionType?: string) => void
}

const ABTestContext = createContext<ABTestContextType | null>(null)

export function ABTestProvider({
  children,
  tests,
}: {
  children: React.ReactNode
  tests: ABTest[]
}) {
  const [assignments, setAssignments] = useState<Record<string, string>>({})

  useEffect(() => {
    const savedAssignments = localStorage.getItem("ab_test_assignments")
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments))
    } else {
      // Assign variants for new users
      const newAssignments: Record<string, string> = {}
      tests.forEach((test) => {
        newAssignments[test.id] = assignVariant(test)
      })
      setAssignments(newAssignments)
      localStorage.setItem("ab_test_assignments", JSON.stringify(newAssignments))
    }
  }, [tests])

  const assignVariant = (test: ABTest): string => {
    const weights = test.weights || test.variants.map(() => 1 / test.variants.length)
    const random = Math.random()
    let cumulativeWeight = 0

    for (let i = 0; i < test.variants.length; i++) {
      cumulativeWeight += weights[i]
      if (random <= cumulativeWeight) {
        return test.variants[i]
      }
    }

    return test.variants[0]
  }

  const getVariant = (testId: string): string => {
    return assignments[testId] || "control"
  }

  const trackConversion = async (testId: string, conversionType = "default") => {
    const variant = getVariant(testId)

    try {
      await fetch("/api/ab-test/conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId,
          variant,
          conversionType,
          timestamp: Date.now(),
        }),
      })
    } catch (error) {
      console.error("AB test conversion tracking error:", error)
    }
  }

  return <ABTestContext.Provider value={{ getVariant, trackConversion }}>{children}</ABTestContext.Provider>
}

export function useABTest() {
  const context = useContext(ABTestContext)
  if (!context) {
    throw new Error("useABTest must be used within ABTestProvider")
  }
  return context
}

export function ABTestVariant({
  testId,
  variant,
  children,
}: {
  testId: string
  variant: string
  children: React.ReactNode
}) {
  const { getVariant } = useABTest()
  const currentVariant = getVariant(testId)

  if (currentVariant !== variant) {
    return null
  }

  return <>{children}</>
}
