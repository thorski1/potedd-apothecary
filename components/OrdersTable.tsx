'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase-client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching orders:', error);
    else setOrders(data || []);
  }

  async function handleUpdateStatus(id: string, newStatus: string) {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (error) console.error('Error updating order status:', error);
    else fetchOrders();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {orders.map((order) => (
          <AccordionItem value={order.id} key={order.id}>
            <AccordionTrigger>{order.customer_name} - ${order.total_amount.toFixed(2)} - {order.status}</AccordionTrigger>
            <AccordionContent>
              <p><strong>Customer Email:</strong> {order.customer_email}</p>
              <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
              <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(order.updated_at).toLocaleString()}</p>
              <div className="mt-4">
                <Button onClick={() => handleUpdateStatus(order.id, 'processing')} className="mr-2">Process</Button>
                <Button onClick={() => handleUpdateStatus(order.id, 'shipped')} className="mr-2">Ship</Button>
                <Button onClick={() => handleUpdateStatus(order.id, 'delivered')}>Deliver</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}