"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from '@/app/actions/auth';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import CartIcon from './CartIcon';

const navItems = [
  { name: 'Products', href: '/products' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center" onClick={() => setIsMenuOpen(false)}>
              Pot.EdD Apothecary
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700 mr-4">Welcome, {user.email}</span>
                <form action={signOut}>
                  <Button type="submit" variant="outline">Sign Out</Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="outline" className="mr-2">Log In</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
            <CartIcon />
          </div>
          <div className="sm:hidden flex items-center">
            <CartIcon />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ml-2"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item.href);
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <span className="text-sm font-medium text-gray-500">Welcome, {user.email}</span>
              </div>
              <div className="ml-3">
                <form action={signOut}>
                  <Button type="submit" variant="outline" size="sm">Sign Out</Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center px-4 space-x-3">
              <Link href="/login" passHref>
                <Button variant="outline" size="sm" onClick={() => setIsMenuOpen(false)}>Log In</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button size="sm" onClick={() => setIsMenuOpen(false)}>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}