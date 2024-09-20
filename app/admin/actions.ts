'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  
  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set('admin_authenticated', 'true', { httpOnly: true, secure: true });
    redirect('/admin');
  } else {
    return { error: 'Invalid password' };
  }
}

export async function logoutAction() {
  cookies().delete('admin_authenticated');
  redirect('/admin');
}

interface Product {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export async function createProduct(product: Product) {
  const { error } = await supabase.from('products').insert(product);
  if (error) throw error;
}

export async function updateProduct(product: Product) {
  const { error } = await supabase
    .from('products')
    .update({
      ...product,
      updated_at: new Date().toISOString(),
    })
    .eq('id', product.id);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  // First, get the product to find the image URL
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('image_url')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  // Delete the image from storage if it exists
  if (product && product.image_url) {
    const imagePath = product.image_url.split('/').pop();
    const { error: deleteImageError } = await supabase.storage
      .from('product-images')
      .remove([imagePath]);

    if (deleteImageError) throw deleteImageError;
  }

  // Delete the product from the database
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

// Add similar functions for categories and orders