import { Suspense } from "react"
import { BookingPage } from "@/components/booking-page"

export default function BookStrategyCallPage() {
  return (
    <main className="min-h-screen bg-surface-light">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <BookingPage />
      </Suspense>
    </main>
  )
}

export const metadata = {
  title: "Book Your Strategy Call - Volv",
  description: "Schedule your free revenue recovery strategy consultation with our experts",
}