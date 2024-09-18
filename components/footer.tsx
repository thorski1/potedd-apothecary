import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/10 text-secondary-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl font-bold">
              Pot.EdD Apothecary
            </Link>
            <p className="text-sm">
              Your go-to nursery for native, perennial fruits and plants. Grow with us and support sustainable, micro-local gardening practices.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-secondary-foreground hover:text-secondary">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-secondary">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-secondary">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Products</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/products/live-plants" className="text-base hover:text-secondary">
                      Live Plants
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/fruit-trees" className="text-base hover:text-secondary">
                      Fruit Trees
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/seasonal-offerings" className="text-base hover:text-secondary">
                      Seasonal Offerings
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base hover:text-secondary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base hover:text-secondary">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-base hover:text-secondary">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary/20 pt-8">
          <p className="text-base text-center">&copy; {new Date().getFullYear()} Pot.EdD Apothecary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}