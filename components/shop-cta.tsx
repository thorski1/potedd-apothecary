import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ShopCTA() {
  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Start Your Green Journey?</h2>
        <p className="text-xl mb-8 text-gray-700">Explore our collection of sustainable, locally-grown plants and fruits.</p>
        <Button asChild variant="default" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    </section>
  )
}