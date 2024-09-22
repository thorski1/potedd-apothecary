import { getProduct, getProductVariants } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const variants = await getProductVariants(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image 
            src={product.image_url} 
            alt={product.name} 
            width={500} 
            height={500} 
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <AddToCartButton product={product} variants={variants} />
        </div>
      </div>
    </div>
  )
}