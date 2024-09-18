import Image from 'next/image'
import MissionPhilosophy from '@/components/mission-philosophy'
import OwnerStory from '@/components/owner-story'
import ShopCTA from '@/components/shop-cta'

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[400px]">
        <Image
          src="/about-hero.png"
          alt="Our greenhouse"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto h-full flex items-center justify-center text-center text-white">
          <h1 className="text-5xl font-bold">About Pot.EdD Apothecary</h1>
        </div>
      </section>
      
      <MissionPhilosophy />
      
      <OwnerStory />
      
      <ShopCTA />
    </main>
  )
}