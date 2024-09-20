import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';

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

async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image_url}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.long_description}</p>
          <p className="mb-4">In Stock: {product.stock_quantity}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}