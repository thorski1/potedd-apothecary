import ContactOptions from '@/components/contact-options'
import StayConnected from '@/components/stay-connected'
import HeroSection from '@/components/hero-section'

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Contact Us"
        subtitle="We'd love to hear from you and help with any questions you may have."
        backgroundImage="/contact-hero.png"
      />
        <ContactOptions />
        <StayConnected />
    </main>
  )
}