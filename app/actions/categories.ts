'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { Category } from '@/lib/types'

export async function createCategory(category: Partial<Category>) {
  const { error } = await supabase.from("categories").insert([category]);
  if (error) throw error;
  revalidatePath('/products');
}

export async function updateCategory(id: string, category: Partial<Category>) {
  const { error } = await supabase.from("categories").update(category).eq("id", id);
  if (error) throw error;
  revalidatePath('/products');
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
  revalidatePath('/products');
}