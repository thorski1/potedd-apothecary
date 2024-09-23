import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string;
  updated_at: string;
}

async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, updated_at')

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://potedd-apothecary.com'

  // Define your static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/cart',
    '/checkout',
    '/order-confirmation',
    '/shop',
  ]

  // Generate sitemap entries for static routes
  const staticSitemap: MetadataRoute.Sitemap = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }))

  // Fetch all products
  const products = await getAllProducts()

  // Generate sitemap entries for dynamic product routes
  const productSitemap: MetadataRoute.Sitemap = products.map(product => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // Combine static and dynamic sitemap entries
  return [...staticSitemap, ...productSitemap]
}