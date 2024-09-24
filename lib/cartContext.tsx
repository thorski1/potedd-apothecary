"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";
import { supabase } from '@/lib/supabase-client';
import { useToast } from "@/hooks/use-toast";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image_url?: string;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (item: CartItem) => Promise<void>;
	removeFromCart: (id: string) => Promise<void>;
	clearCart: () => Promise<void>;
	updateQuantity: (id: string, quantity: number) => Promise<void>;
	isLoading: boolean;
}

const CartContext = createContext<
	CartContextType | undefined
>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [user, setUser] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { toast } = useToast();

	useEffect(() => {
		const fetchUserAndCart = async () => {
			const { data: { user } } = await supabase.auth.getUser();
			setUser(user);
			if (user) {
				await loadCart(user.id);
			} else {
				const localCart = localStorage.getItem('cart');
				if (localCart) {
					setCart(JSON.parse(localCart));
				}
				setIsLoading(false);
			}
		};

		fetchUserAndCart();

		const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
			setUser(session?.user ?? null);
			if (event === 'SIGNED_IN') {
				await syncLocalCartWithDatabase(session?.user?.id ?? '');
			} else if (event === 'SIGNED_OUT') {
				setCart([]);
				setIsLoading(false);
			}
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	const loadCart = async (userId: string) => {
		setIsLoading(true);
		try {
			const { data, error } = await supabase
				.from('carts')
				.select('items')
				.eq('user_id', userId)
				.order('updated_at', { ascending: false })
				.limit(1)
				.single();

			if (error) {
				if (error.code === 'PGRST116') {
					await saveCart([]);
				} else {
					throw error;
				}
			} else {
				setCart(data?.items || []);
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to load your cart. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const saveCart = async (newCart: CartItem[]) => {
		if (!user) {
			localStorage.setItem('cart', JSON.stringify(newCart));
			setCart(newCart);
			return;
		}

		try {
			const { error } = await supabase
				.from('carts')
				.upsert({ 
					user_id: user.id, 
					items: newCart,
					updated_at: new Date().toISOString()
				});

			if (error) throw error;
			setCart(newCart);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update your cart. Please try again.",
				variant: "destructive",
			});
		}
	};

	const syncLocalCartWithDatabase = async (userId: string) => {
		const localCart = localStorage.getItem('cart');
		if (localCart) {
			const parsedCart = JSON.parse(localCart);
			await saveCart(parsedCart);
			localStorage.removeItem('cart');
		}
		await loadCart(userId);
	};

	const addToCart = async (item: CartItem) => {
		const newCart = [...cart];
		const existingItem = newCart.find((i) => i.id === item.id);
		if (existingItem) {
			existingItem.quantity += item.quantity;
		} else {
			newCart.push(item);
		}
		await saveCart(newCart);
	};

	const removeFromCart = async (id: string) => {
		const newCart = cart.filter((item) => item.id !== id);
		await saveCart(newCart);
	};

	const clearCart = async () => {
		await saveCart([]);
	};

	const updateQuantity = async (id: string, quantity: number) => {
		const newCart = cart.map((item) =>
			item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
		);
		await saveCart(newCart);
	};

	return (
		<CartContext.Provider
			value={{ 
				cart, 
				addToCart, 
				removeFromCart, 
				clearCart, 
				updateQuantity,
				isLoading 
			}}
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
