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
	stock_quantity: number;
	attributes?: Record<string, string>;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	clearCart: () => void;
	updateCart: (newCart: CartItem[]) => void; // Add this line
}

const CartContext = createContext<
	CartContextType | undefined
>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([]);

	useEffect(() => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (item: CartItem) => {
		setCart(prevCart => {
			const existingItem = prevCart.find(i => i.id === item.id);
			if (existingItem) {
				return prevCart.map(i =>
					i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
				);
			}
			return [...prevCart, item];
		});
	};

	const removeFromCart = (id: string) => {
		setCart(prevCart => prevCart.filter(item => item.id !== id));
	};

	const clearCart = () => {
		setCart([]);
	};

	const updateCart = (newCart: CartItem[]) => {
		setCart(newCart);
	};

	return (
		<CartContext.Provider
			value={{ cart, addToCart, removeFromCart, clearCart, updateCart }} // Add updateCart here
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error(
			"useCart must be used within a CartProvider"
		);
	}
	return context;
}
