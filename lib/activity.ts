import { supabase } from '@/lib/supabase-client';

export async function getRecentActivity() {
  // Fetch recent orders
  const { data: recentOrders, error: ordersError } = await supabase
    .from('orders')
    .select('id, created_at, customer_name')
    .order('created_at', { ascending: false })
    .limit(5)
    .throwOnError();

  if (ordersError) throw ordersError;

  // Fetch recent products
  const { data: recentProducts, error: productsError } = await supabase
    .from('products')
    .select('id, name, created_at')
    .order('created_at', { ascending: false })
    .limit(5)
    .throwOnError();

  if (productsError) throw productsError;

  const activities = [
    ...recentOrders.map(order => ({
      id: `order-${order.id}`,
      date: new Date(order.created_at).toLocaleDateString(),
      description: `New order #${order.id} placed by ${order.customer_name}`,
    })),
    ...recentProducts.map(product => ({
      id: `product-${product.id}`,
      date: new Date(product.created_at).toLocaleDateString(),
      description: `New product added: ${product.name}`,
    })),
  ];

  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
}