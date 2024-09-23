import Image from 'next/image'

interface Product {
  id: number
  name: string
  image: string
}

interface FeaturedProductsProps {
  title: string
  description: string
}

const featuredProducts: Product[] = [
  { id: 1, name: 'Canna Lilies', image: '/canna-lilly.webp' },
  { id: 2, name: 'Prickly Pear Starters', image: '/prickly-pear.webp' },
  { id: 3, name: 'Elderberry Trees', image: '/elderberry.webp' },
  { id: 4, name: 'Hibiscus', image: '/hibiscus.webp' },
  // { id: 5, name: 'Figs', image: '/figs.webp' },
]

export default function FeaturedProducts({ title, description }: FeaturedProductsProps) {
  return (
    <section className="bg-secondary/5 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
        <p className="mb-8 text-gray-700">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-accent/20 hover:border-accent transition-colors">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}