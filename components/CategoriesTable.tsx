'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from 'next/image';

interface Category {
  id: string;
  slug: string;
  image_url: string;
  name: string;
  description: string;
}

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({});
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) console.error('Error fetching categories:', error);
    else setCategories(data || []);
  }

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('categories').insert([newCategory]);
    if (error) console.error('Error creating category:', error);
    else {
      fetchCategories();
      setNewCategory({});
    }
  }

  async function handleUpdateCategory(e: React.FormEvent) {
    e.preventDefault();
    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update(editingCategory)
        .eq('id', editingCategory.id);
      if (error) console.error('Error updating category:', error);
      else {
        fetchCategories();
        setEditingCategory(null);
      }
    }
  }

  async function handleDeleteCategory(id: string) {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) console.error('Error deleting category:', error);
    else fetchCategories();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      
      {/* Create Category Form */}
      <form onSubmit={handleCreateCategory} className="mb-8">
        <Input
          type="text"
          placeholder="Name"
          value={newCategory.name || ''}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Slug"
          value={newCategory.slug || ''}
          onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Image URL"
          value={newCategory.image_url || ''}
          onChange={(e) => setNewCategory({ ...newCategory, image_url: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Description"
          value={newCategory.description || ''}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          className="mb-2"
        />
        <Button type="submit">Create Category</Button>
      </form>

      {/* Categories Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category) => (
          <AccordionItem value={category.id} key={category.id}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Slug:</strong> {category.slug}</p>
                  <p><strong>Description:</strong> {category.description}</p>
                </div>
                <div>
                  <Image src={category.image_url} alt={category.name} width={128} height={128} className="object-cover mt-2" />
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => setEditingCategory(category)} className="mr-2">Edit</Button>
                <Button onClick={() => handleDeleteCategory(category.id)} variant="destructive">Delete</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h3 className="text-xl font-bold mb-4">Edit Category</h3>
            <form onSubmit={handleUpdateCategory}>
              <Input
                type="text"
                placeholder="Name"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Slug"
                value={editingCategory.slug}
                onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Image URL"
                value={editingCategory.image_url}
                onChange={(e) => setEditingCategory({ ...editingCategory, image_url: e.target.value })}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Description"
                value={editingCategory.description}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                className="mb-2"
              />
              <Button type="submit" className="mr-2">Update</Button>
              <Button onClick={() => setEditingCategory(null)} variant="outline">Cancel</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}