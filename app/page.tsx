import { SophisticatedNav } from "@/components/sophisticated-nav"
import { MasterpieceHero } from "@/components/masterpiece-hero"
import { SophisticatedFeatureCards as SophisticatedFeatureSection } from "@/components/sophisticated-feature-cards"
import { SophisticatedDarkBand } from "@/components/sophisticated-dark-band"
import { InteractiveBenefitStripe } from "@/components/interactive-benefit-stripe"
import { CheatingSection } from "@/components/cheating-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { SophisticatedFooter } from "@/components/sophisticated-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-light">
      <SophisticatedNav />
      <MasterpieceHero />
      <SophisticatedFeatureSection />
      <SophisticatedDarkBand />
      <InteractiveBenefitStripe />
      <CheatingSection />
      <TestimonialSection />
      <FinalCtaSection />
      <SophisticatedFooter />
    </main>
  )
}
