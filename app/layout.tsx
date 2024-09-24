import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavMenu from '../components/nav-menu'
import { CartProvider } from '../lib/cartContext'
import Footer from '../components/footer'


const inter = Inter({ subsets: ['latin'] })

/**
 * Metadata for the application.
 */
export const metadata: Metadata = {
  title: 'Pot.EdD Apothecary',
  description: 'Your source for native, perennial fruits and plants',
}

/**
 * RootLayout component for the entire application.
 * 
 * This component wraps all pages and provides the basic structure,
 * including the CartProvider for global state management.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <NavMenu />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
