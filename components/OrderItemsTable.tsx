'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

export default function OrderItemsTable() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetchOrderItems();
  }, []);

  async function fetchOrderItems() {
    const { data, error } = await supabase.from('order_items').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching order items:', error);
    else setOrderItems(data || []);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Items</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {orderItems.map((item) => (
          <AccordionItem value={item.id} key={item.id}>
            <AccordionTrigger>Order: {item.order_id} - Product: {item.product_id}</AccordionTrigger>
            <AccordionContent>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}