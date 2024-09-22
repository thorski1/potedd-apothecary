import { Metadata } from 'next'
import { Lato, Merriweather } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/nav-menu";
import Footer from "@/components/footer";
import { CartProvider } from '@/lib/cartContext';
import { Toaster } from "@/components/ui/toaster";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather" });

export const metadata: Metadata = {
  metadataBase: new URL('https://potedd-apothecary.com'),
  title: {
    default: 'Potedd Apothecary',
    template: '%s | Potedd Apothecary',
  },
  description: 'Discover unique potions and magical remedies at Potedd Apothecary.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://potedd-apothecary.com',
    siteName: 'Potedd Apothecary',
    images: [
      {
        url: '/homepage-hero.png',
        width: 1200,
        height: 630,
        alt: 'Potedd Apothecary - Magical Remedies and Potions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@poteddapothecary',
    creator: '@poteddapothecary',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${merriweather.variable} font-sans flex flex-col min-h-screen`}>
        <CartProvider>
          <NavMenu />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
