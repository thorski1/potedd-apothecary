import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';

interface ProductCategory {
	id: string;
	name: string;
	slug: string;
	image_url: string;
	description: string;
}

async function getCategories(): Promise<ProductCategory[]> {
	const { data, error } = await supabase
		.from('categories')
		.select('*')
		.order('name');

	if (error) {
		console.error('Error fetching categories:', error);
		return [];
	}

	return data;
}

export default async function ProductsPage() {
	const categories = await getCategories();

	return (
		<main className="py-16 bg-secondary/5">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold mb-8 text-gray-900">
					Our Products
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{categories.map((category) => (
						<div
							key={category.id}
							className="bg-white rounded-lg shadow-md overflow-hidden border border-accent/20 hover:border-accent transition-colors flex flex-col h-full"
						>
							<Image
								src={category.image_url}
								alt={category.name}
								width={400}
								height={300}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4 flex flex-col flex-grow">
								<h2 className="text-xl font-semibold mb-2 text-gray-900">
									{category.name}
								</h2>
								<p className="text-gray-700 mb-4 flex-grow">
									{category.description}
								</p>
								<div className="mt-auto">
									<Button asChild variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
										<Link href={`/shop?category=${category.slug}`}>
											View Products
										</Link>
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 text-center bg-primary/10 py-8 rounded-lg">
					<h2 className="text-2xl font-semibold mb-4 text-gray-900">
						Want to see all our offerings?
					</h2>
					<p className="text-gray-700 mb-6">
						Explore our complete collection of plants, trees, and seasonal items.
					</p>
					<Button asChild variant="default" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
						<Link href="/shop">
							Shop All Products
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}
