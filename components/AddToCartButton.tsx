"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cartContext";
import { useState, useEffect } from "react";

interface Product {
	id: string;
	name: string;
    price: number;
    image_url: string;
    stock_quantity: number;
}

export default function AddToCartButton({
	product,
}: {
	product: Product;
}) {
	const { addToCart, cart } = useCart();
    const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		const itemInCart = cart.find(item => item.id === product.id);
		const quantityInCart = itemInCart ? itemInCart.quantity : 0;
		setIsDisabled(quantityInCart >= product.stock_quantity);
	}, [cart, product.id, product.stock_quantity]);

	const handleAddToCart = () => {
		console.log('Adding product to cart:', product);
		addToCart({ ...product, quantity: 1 });
	};

	return (
		<Button onClick={handleAddToCart} disabled={isDisabled}>
			{isDisabled ? "Out of Stock" : "Add to Cart"}
		</Button>
	);
}
