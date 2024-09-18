"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image_url: string;
	stock_quantity: number; // Added stock_quantity property
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	clearCart: () => void;
}

const CartContext = createContext<
	CartContextType | undefined
>(undefined);

export const CartProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		console.log("Initial load - Saved cart:", savedCart);
		if (savedCart) {
			try {
				const parsedCart = JSON.parse(savedCart);
				console.log(
					"Cart loaded from localStorage:",
					parsedCart
				);
				setCart(parsedCart);
			} catch (error) {
				console.error("Error parsing saved cart:", error);
			}
		}
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded) {
			console.log(
				"Cart updated, saving to localStorage:",
				cart
			);
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart, isLoaded]);

	const addToCart = (item: CartItem) => {
		console.log("Adding to cart:", item);
		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(i) => i.id === item.id
			);
			if (existingItem) {
				if (existingItem.quantity + item.quantity <= item.stock_quantity) {
					console.log("Updating existing item");
					return prevCart.map((i) =>
						i.id === item.id
							? { ...i, quantity: i.quantity + item.quantity }
							: i
					);
				} else {
					console.log("Cannot add more items than available in stock");
					return prevCart;
				}
			}
			if (item.quantity <= item.stock_quantity) {
				console.log("Adding new item");
				return [...prevCart, item];
			} else {
				console.log("Cannot add more items than available in stock");
				return prevCart;
			}
		});
	};

	const removeFromCart = (id: string) => {
		console.log("Removing from cart:", id);
		setCart((prevCart) =>
			prevCart.filter((item) => item.id !== id)
		);
	};

	const clearCart = () => {
		console.log("Clearing cart");
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error(
			"useCart must be used within a CartProvider"
		);
	}
	return context;
};
