import { RevenueCalculator } from "@/components/revenue-calculator"

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-surface-light">
      <RevenueCalculator />
    </main>
  )
}

export const metadata = {
  title: "Lost Revenue Calculator - Volv",
  description: "Discover how much revenue you're leaving on the table with our interactive calculator",
}