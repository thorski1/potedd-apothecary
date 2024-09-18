import type { Metadata } from "next";
import { Lato, Merriweather } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/nav-menu";
import Footer from "@/components/footer";
import { CartProvider } from '@/lib/cartContext';

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather" });

export const metadata: Metadata = {
  title: "Pot.EdD Apothecary",
  description: "Your go-to nursery for native, perennial fruits and plants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${merriweather.variable} font-sans flex flex-col min-h-screen`}>
        <CartProvider>
          <NavMenu />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
