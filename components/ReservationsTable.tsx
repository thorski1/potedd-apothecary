'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Reservation {
  id: string;
  product_id: string;
  quantity: number;
  expires_at: string;
  created_at: string;
}

export default function ReservationsTable() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const { data, error } = await supabase.from('reservations').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching reservations:', error);
    else setReservations(data || []);
  }

  async function handleDeleteReservation(id: string) {
    const { error } = await supabase.from('reservations').delete().eq('id', id);
    if (error) console.error('Error deleting reservation:', error);
    else fetchReservations();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reservations</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {reservations.map((reservation) => (
          <AccordionItem value={reservation.id} key={reservation.id}>
            <AccordionTrigger>Product: {reservation.product_id} - Quantity: {reservation.quantity}</AccordionTrigger>
            <AccordionContent>
              <p><strong>Expires At:</strong> {new Date(reservation.expires_at).toLocaleString()}</p>
              <p><strong>Created At:</strong> {new Date(reservation.created_at).toLocaleString()}</p>
              <div className="mt-4">
                <Button onClick={() => handleDeleteReservation(reservation.id)} variant="destructive">Delete</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}