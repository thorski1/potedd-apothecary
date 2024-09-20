'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching contacts:', error);
    else setContacts(data || []);
  }

  async function handleDeleteContact(id: string) {
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) console.error('Error deleting contact:', error);
    else fetchContacts();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {contacts.map((contact) => (
          <AccordionItem value={contact.id} key={contact.id}>
            <AccordionTrigger>{contact.name} - {contact.email}</AccordionTrigger>
            <AccordionContent>
              <p><strong>Message:</strong> {contact.message}</p>
              <p><strong>Created At:</strong> {new Date(contact.created_at).toLocaleString()}</p>
              <div className="mt-4">
                <Button onClick={() => handleDeleteContact(contact.id)} variant="destructive">Delete</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}