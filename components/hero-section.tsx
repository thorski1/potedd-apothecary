import Image from 'next/image'

interface HeroSectionProps {
  title: string
  subtitle: string
  backgroundImage: string
}

export default function HeroSection({ title, subtitle, backgroundImage }: HeroSectionProps) {
  return (
    <section className="relative h-[600px]">
      <Image
        src={backgroundImage.replace(/\.(jpg|jpeg|png)$/, '.webp')}
        alt="Greenhouse background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-black/70" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">{title}</h1>
          <p className="text-xl max-w-2xl mx-auto text-white drop-shadow-md">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}