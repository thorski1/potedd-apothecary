'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

/**
 * Represents a contact in the system.
 */
interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

/**
 * ContactsTable component for displaying and managing contacts.
 * 
 * This component fetches and displays contacts in an accordion layout,
 * allowing for viewing details and deleting contacts.
 *
 * @returns {JSX.Element} The rendered ContactsTable component.
 */
export default function ContactsTable(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  /**
   * Fetches contacts from the database.
   */
  async function fetchContacts() {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching contacts:', error);
    else setContacts(data || []);
  }

  /**
   * Handles the deletion of a contact.
   * 
   * @param {string} id - The ID of the contact to delete.
   */
  async function handleDeleteContact(id: string) {
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) console.error('Error deleting contact:', error);
    else fetchContacts();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      
      <Accordion type="single" collapsible className="w-full space-y-2">
        {contacts.map((contact) => (
          <AccordionItem value={contact.id} key={contact.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 py-2">{contact.name} - {contact.email}</AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <p className="mb-2"><strong>Message:</strong> {contact.message}</p>
              <p className="mb-4"><strong>Created At:</strong> {new Date(contact.created_at).toLocaleString()}</p>
              <Button onClick={() => handleDeleteContact(contact.id)} variant="destructive">Delete</Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}