'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function StayConnected() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }])
        .select();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setMessage('You are already subscribed to our newsletter.');
        } else {
          throw error;
        }
      } else {
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-secondary-foreground">Stay Connected</h2>
      <p className="mb-6 text-secondary-foreground/80">
        Join our community by signing up for our newsletter or following us on social media to stay updated on new plants, seasonal offerings, and upcoming events.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          className="flex-grow" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      {message && (
        <p className="mb-4 text-center font-semibold text-secondary-foreground">{message}</p>
      )}
      <div className="flex gap-4">
        <a href="#" className="text-secondary-foreground hover:text-secondary">
          <Facebook className="h-6 w-6" />
        </a>
        <a href="#" className="text-secondary-foreground hover:text-secondary">
          <Instagram className="h-6 w-6" />
        </a>
        <a href="#" className="text-secondary-foreground hover:text-secondary">
          <Twitter className="h-6 w-6" />
        </a>
      </div>
    </section>
  )
}