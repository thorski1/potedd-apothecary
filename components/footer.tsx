import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

/**
 * Footer component for the website.
 * 
 * This component displays the site footer, including links to various
 * sections of the site, social media links, and copyright information.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="bg-secondary/10 text-secondary-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-muted-foreground">
              Pot.EdD Apothecary
            </Link>
            <p className="text-sm text-muted-foreground">
              Your go-to nursery for native, perennial fruits and plants. Grow with us and support sustainable, micro-local gardening practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/live-plants" className="text-muted-foreground hover:text-primary transition-colors">
                  Live Plants
                </Link>
              </li>
              <li>
                <Link href="/products/fruit-trees" className="text-muted-foreground hover:text-primary transition-colors">
                  Fruit Trees
                </Link>
              </li>
              <li>
                <Link href="/products/seasonal-offerings" className="text-muted-foreground hover:text-primary transition-colors">
                  Seasonal Offerings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with our latest offerings and gardening tips.</p>
            {/* Add newsletter signup form here */}
          </div>
        </div>
        <div className="mt-8 border-t border-secondary/20 pt-8">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Pot.EdD Apothecary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}