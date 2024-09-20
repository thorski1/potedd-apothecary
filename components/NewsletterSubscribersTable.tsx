'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Subscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
}

export default function NewsletterSubscribersTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    const { data, error } = await supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false });
    if (error) console.error('Error fetching subscribers:', error);
    else setSubscribers(data || []);
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    const { error } = await supabase.from('newsletter_subscribers').update({ is_active: !isActive }).eq('id', id);
    if (error) console.error('Error updating subscriber:', error);
    else fetchSubscribers();
  }

  async function handleDeleteSubscriber(id: string) {
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
    if (error) console.error('Error deleting subscriber:', error);
    else fetchSubscribers();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {subscribers.map((subscriber) => (
          <AccordionItem value={subscriber.id} key={subscriber.id}>
            <AccordionTrigger>{subscriber.email} - {subscriber.is_active ? 'Active' : 'Inactive'}</AccordionTrigger>
            <AccordionContent>
              <p><strong>Subscribed At:</strong> {new Date(subscriber.subscribed_at).toLocaleString()}</p>
              <div className="mt-4">
                <Button onClick={() => handleToggleActive(subscriber.id, subscriber.is_active)} className="mr-2">
                  {subscriber.is_active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button onClick={() => handleDeleteSubscriber(subscriber.id)} variant="destructive">Delete</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}