import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero-section'
import { PartnersSection } from '@/components/landing/partners-section'
import { DashboardPreview } from '@/components/landing/dashboard-preview'
import { TrustSection } from '@/components/landing/trust-section'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PartnersSection />
        <DashboardPreview />
        <TrustSection />
      </main>
      <Footer />
    </div>
  )
}
