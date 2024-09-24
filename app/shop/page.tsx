import { Suspense } from "react";
import ClientOnly from "./client";
import { Metadata } from "next";
import { createServerComponentSupabaseClient } from "@/lib/supabase-server";
import { Breadcrumbs } from '@/components/breadcrumbs';

interface Product {
	id: string;
	name: string;
	short_description: string;
	long_description: string;
	price: number;
	image_url: string;
	category: string;
	stock_quantity: number;
}

function generateItemListJsonLd(products: Product[]) {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: products.map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Product",
				name: product.name,
				description: product.short_description,
				image: product.image_url,
				url: `https://www.poteddapothecary.com/product/${product.id}`,
			},
		})),
	};
}

async function getProducts(): Promise<Product[]> {
	const supabase = createServerComponentSupabaseClient();
	try {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("name");

		if (error) {
			console.error("Error fetching products:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const products: Product[] = await getProducts();

	return {
		title: "Shop - Potedd Apothecary",
		description:
			"Browse our selection of herbal remedies and natural products",
		other: {
			"application/ld+json": JSON.stringify(
				generateItemListJsonLd(products)
			),
		},
	};
}

export default async function ShopPage() {
	const products = await getProducts();

	return (
		<main className="min-h-screen py-16 bg-secondary/10">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<Breadcrumbs />
				<Suspense fallback={<div>Loading...</div>}>
					<ClientOnly />
				</Suspense>
			</div>
		</main>
	);
}
