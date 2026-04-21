import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import TestimonialsSection from "@/components/testimonials-section"
import PricingSection from "@/components/pricing-section"
import Footer from "@/components/footer"
import LandingScrollStack from "@/components/ui/landing-scroll-stack"

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingScrollStack 
        hero={<HeroSection />}
        testimonials={<TestimonialsSection />}
        pricing={<PricingSection />}
        footer={<Footer />}
      />
    </>
  )
}
