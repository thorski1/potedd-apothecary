"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cartContext";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
	id: string;
	name: string;
	price: number;
	image_url: string;
	stock_quantity: number;
}

interface ProductVariant {
	id: string;
	name: string;
	price: number;
	stock_quantity: number;
	attributes: Record<string, string>;
}

interface AddToCartButtonProps {
	product: Product;
	variants?: ProductVariant[];
}

export default function AddToCartButton({ product, variants }: AddToCartButtonProps) {
	const { addToCart, cart } = useCart();
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants && variants.length > 0 ? variants[0] : null);
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		const itemInCart = cart.find(item => 
			item.id === (selectedVariant ? selectedVariant.id : product.id)
		);
		const quantityInCart = itemInCart ? itemInCart.quantity : 0;
		const stockQuantity = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;
		setIsDisabled(quantityInCart >= stockQuantity);
	}, [cart, product, selectedVariant]);

	const handleAddToCart = () => {
		const itemToAdd = selectedVariant 
			? { ...product, ...selectedVariant, id: selectedVariant.id }
			: product;
		addToCart({ ...itemToAdd, quantity: 1 });
	};

	return (
		<div>
			{variants && variants.length > 0 && (
				<Select
					value={selectedVariant?.id}
					onValueChange={(value) => setSelectedVariant(variants.find(v => v.id === value) || null)}
				>
					<SelectTrigger className="w-[180px] mb-2">
						<SelectValue placeholder="Select a variant" />
					</SelectTrigger>
					<SelectContent>
						{variants.map((variant) => (
							<SelectItem key={variant.id} value={variant.id}>
								{variant.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
			<Button onClick={handleAddToCart} disabled={isDisabled}>
				{isDisabled ? "Out of Stock" : "Add to Cart"}
			</Button>
		</div>
	);
}
