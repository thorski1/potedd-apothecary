'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface Order {
  id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
}

function OrderConfirmationContent() {
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!session_id) return;

      try {
        const response = await fetch(`/api/get-order-details?session_id=${session_id}`);
        const data = await response.json();

        if (data.orderId) {
          const { data: orderData, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', data.orderId)
            .single();

          if (error) throw error;
          setOrderDetails(orderData);

          // Update order status to 'paid'
          await supabase
            .from('orders')
            .update({ status: 'paid' })
            .eq('id', data.orderId);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }

    fetchOrderDetails();
  }, [session_id]);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <p className="mb-4">Thank you for your order!</p>
      <p className="mb-2"><strong>Order ID:</strong> {orderDetails.id}</p>
      <p className="mb-2"><strong>Total Amount:</strong> ${orderDetails.total_amount.toFixed(2)}</p>
      <p className="mb-2"><strong>Status:</strong> {orderDetails.status}</p>
      <p className="mb-4"><strong>Shipping Address:</strong> {orderDetails.shipping_address}</p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}