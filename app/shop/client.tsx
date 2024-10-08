"use client";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { Metadata } from "next";
import { Product } from "@/lib/types";

export default function ClientOnly() {
    const [products, setProducts] = useState<Product[]>([]);
		const searchParams = useSearchParams();
		const category = searchParams.get("category");

		useEffect(() => {
			async function fetchProducts() {
				let query = supabase
					.from("products")
					.select("*")
					.order("name");

				if (category) {
					query = query.eq("category", category);
				}

				const { data, error } = await query;

				if (error) {
					console.error("Error fetching products:", error);
					return;
				}

				setProducts(data || []);
			}

			fetchProducts();
		}, [category]);
	return (
		<>
			<h1 className="text-4xl font-bold mb-8 text-gray-900">
				{category
					? `Shop ${category}`
					: "Shop All Products"}
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white rounded-lg shadow-md overflow-hidden border border-secondary/20 hover:border-secondary transition-colors flex flex-col h-full"
					>
						<Image
							src={product.image_url}
							alt={product.name}
							width={400}
							height={300}
							className="w-full h-48 object-cover"
							unoptimized
						/>
						<div className="p-4 flex flex-col flex-grow">
							<h2 className="text-xl font-semibold mb-2 text-gray-900">
								{product.name}
							</h2>
							<p className="text-gray-600 mb-4 flex-grow">
								{product.short_description}
							</p>
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto">
								<span className="text-lg font-bold text-gray-900 mb-2 sm:mb-0">
									${product.price.toFixed(2)}
								</span>
								<div className="flex gap-2 w-full sm:w-auto">
									<Button
										variant="secondary"
										asChild
										className="flex-grow sm:flex-grow-0"
									>
										<Link href={`/product/${product.id}`}>
											View Details
										</Link>
									</Button>
									<AddToCartButton product={product} />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
