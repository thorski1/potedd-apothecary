import { supabase } from '@/lib/supabase-client';

export async function getTotalSales() {
  const { data, error } = await supabase
    .from('orders')
    .select('total_amount')
    .throwOnError();

  if (error) throw error;

  return data?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
}

export async function getTotalOrders() {
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .throwOnError();

  if (error) throw error;

  return count || 0;
}

export async function getAverageOrderValue() {
  const { data, error } = await supabase
    .from('orders')
    .select('total_amount')
    .throwOnError();

  if (error) throw error;

  const totalSales = data?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
  const totalOrders = data?.length || 1;

  return totalSales / totalOrders;
}

export async function getTopSellingProduct() {
  const { data, error } = await supabase
    .from('order_items')
    .select('product_id, quantity')
    .throwOnError();

  if (error) throw error;

  const productQuantities = data?.reduce((acc, item) => {
    acc[item.product_id] = (acc[item.product_id] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>) || {};

  const topProductId = Object.entries(productQuantities).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (topProductId) {
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('name')
      .eq('id', topProductId)
      .single()
      .throwOnError();

    if (productError) throw productError;

    return productData?.name || 'N/A';
  }

  return 'N/A';
}

interface SalesData {
  date: string;
  amount: number;
}

export async function getSalesData(): Promise<SalesData[]> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data, error } = await supabase
    .from('orders')
    .select('created_at, total_amount')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: true });

  if (error) throw error;

  const salesByDay = data.reduce((acc, order) => {
    const date = new Date(order.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + order.total_amount;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(salesByDay).map(([date, amount]) => ({ date, amount: amount as number }));
}

interface PopularProduct {
  name: string;
    sales: number;
    product_id: string;
}

export async function getPopularProducts(): Promise<PopularProduct[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select('product_id, quantity')
    .throwOnError();

  if (error) throw error;

  const productSales = data.reduce((acc, item) => {
    acc[item.product_id] = (acc[item.product_id] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const productDetails = await Promise.all(
    topProducts.map(async ([productId, sales]) => {
      const { data, error } = await supabase
        .from('products')
        .select('name')
        .eq('id', productId)
        .single();

      if (error) throw error;

      return { name: data.name, sales, product_id: productId };
    })
  );

  return productDetails;
}

interface OrderStatusData {
	name: string;
    value: number;
    status: string;
}

export async function getOrderStatusData(): Promise<OrderStatusData[]> {
  const { data, error } = await supabase
    .from('orders')
		.select("status")
		.throwOnError();

	if (error) throw error;

		const statusCounts = data.reduce((acc, order) => {
			acc[order.status as string] = (acc[order.status as string] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

	return Object.entries(statusCounts).map(([name, value]) => ({ name, value: value as number, status: name as string }));
}