"use client";

import { useCart } from "@/lib/cartContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const { cart, isLoading } = useCart();
  const itemCount = isLoading ? 0 : cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {!isLoading && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}