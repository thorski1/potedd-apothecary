import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ButtonProps {
  text: string
  href: string
}

interface CallToActionProps {
  header: string
  subheader: string
  primaryButton: ButtonProps
  secondaryButton: ButtonProps
}

export default function CallToAction({ header, subheader, primaryButton, secondaryButton }: CallToActionProps) {
  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{header}</h2>
        <p className="text-xl mb-8 text-gray-700">{subheader}</p>
        <Button asChild variant="default" size="lg" className="mr-4 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={primaryButton.href}>{primaryButton.text}</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-accent text-gray-900 hover:bg-accent/10">
          <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
        </Button>
      </div>
    </section>
  )
}