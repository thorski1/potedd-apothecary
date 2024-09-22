'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { v4 as uuidv4 } from 'uuid';
import { ProductCSVData } from '@/lib/types';

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

export async function importProductsFromCSV(formData: FormData) {
  const file = formData.get('file') as File;
  const content = await file.text();
  
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
  });

  const now = new Date().toISOString();
  const productsWithIds = records.map((record: ProductCSVData) => ({
    ...record,
    id: uuidv4(),
    created_at: now,
    updated_at: now,
    price: parseFloat(record.price.toString()), // Ensure price is a number
    stock_quantity: parseInt(record.stock_quantity.toString(), 10), // Ensure stock_quantity is an integer
  }));

  const { error } = await supabase.from('products').insert(productsWithIds);
  if (error) throw error;
}

export async function exportProductsToCSV() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  const csvContent = stringify(products, {
    header: true,
    columns: [
      'name',
      'short_description',
      'long_description',
      'price',
      'image_url',
      'category',
      'stock_quantity',
    ],
  });

  return csvContent;
}