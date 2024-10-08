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

/**
 * Represents a product in the e-commerce system.
 */
interface Product {
	id: string;
	name: string;
	price: number;
	image_url: string;
	stock_quantity: number;
}

/**
 * Represents a variant of a product with specific attributes.
 */
interface ProductVariant {
	id: string;
	name: string;
	price: number;
	stock_quantity: number;
	attributes: Record<string, string>;
}

/**
 * Props for the AddToCartButton component.
 */
interface AddToCartButtonProps {
	product: Product;
	variants?: ProductVariant[];
}

/**
 * AddToCartButton component for adding products to the cart.
 * 
 * This component displays a button to add a product to the cart, along with
 * a dropdown to select variants if available. It handles stock availability
 * and updates the cart context when a product is added.
 *
 * @param {AddToCartButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered AddToCartButton component.
 */
export default function AddToCartButton({ product, variants }: AddToCartButtonProps): JSX.Element {
	const { addToCart, cart } = useCart();
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
		variants && variants.length > 0 ? variants[0] : null
	);
	const [isDisabled, setIsDisabled] = useState(false);

	useEffect(() => {
		const itemInCart = cart.find(item => 
			item.id === (selectedVariant ? selectedVariant.id : product.id)
		);
		const quantityInCart = itemInCart ? itemInCart.quantity : 0;
		const stockQuantity = selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;
		setIsDisabled(quantityInCart >= stockQuantity);
	}, [cart, product, selectedVariant]);

	/**
	 * Handles the action of adding the product to the cart.
	 */
	const handleAddToCart = () => {
		const itemToAdd = selectedVariant 
			? { ...product, ...selectedVariant, id: selectedVariant.id }
			: product;
		addToCart({ ...itemToAdd, quantity: 1 });
	};

	return (
		<div className="space-y-4">
			{variants && variants.length > 0 && (
				<Select
					value={selectedVariant?.id}
					onValueChange={(value) => setSelectedVariant(variants.find(v => v.id === value) || null)}
				>
					<SelectTrigger className="w-full">
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
			<Button onClick={handleAddToCart} disabled={isDisabled} className="w-full">
				{isDisabled ? "Out of Stock" : "Add to Cart"}
			</Button>
		</div>
	);
}
