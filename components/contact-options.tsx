import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactOptions() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <h2 className="text-3xl font-bold mb-6 text-secondary-foreground">Contact Options</h2>
      <p className="mb-6 text-secondary-foreground/80">
        We would love to hear from you! For questions or consultations, reach out to us via our contact form or send us an email. Please note, we do not accept phone calls to keep interactions calm and non-intrusive.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Link href="/contact-form">Contact Form</Link>
        </Button>
        <Button asChild variant="outline" className="border-secondary text-secondary-foreground hover:bg-secondary/10">
          <a href="mailto:info@poteddapothecary.com">Send Email</a>
        </Button>
      </div>
    </section>
  )
}