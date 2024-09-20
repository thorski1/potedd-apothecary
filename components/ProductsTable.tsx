'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { createProduct, updateProduct, deleteProduct } from '@/app/admin/actions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error fetching products:', error);
    else setProducts(data || []);
  }

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (imageFile) {
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(`${Date.now()}-${imageFile.name}`, imageFile);

      if (error) {
        console.error('Error uploading image:', error);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path);

      newProduct.image_url = publicUrl;
    }

    const productToCreate = {
      ...newProduct,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Product;

    await createProduct(productToCreate);
    setNewProduct({});
    setImageFile(null);
    fetchProducts();
  }

  async function handleUpdateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (editingProduct) {
      if (imageFile) {
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(`${Date.now()}-${imageFile.name}`, imageFile);

        if (error) {
          console.error('Error uploading image:', error);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(data.path);

        editingProduct.image_url = publicUrl;
      }

      await updateProduct(editingProduct);
      setEditingProduct(null);
      setImageFile(null);
      fetchProducts();
    }
  }

  async function handleDeleteProduct(id: string) {
    await deleteProduct(id);
    fetchProducts();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      
      {/* Create Product Form */}
      <form onSubmit={handleCreateProduct} className="mb-8">
        <Input
          type="text"
          placeholder="Name"
          value={newProduct.name || ''}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Short Description"
          value={newProduct.short_description || ''}
          onChange={(e) => setNewProduct({ ...newProduct, short_description: e.target.value })}
          className="mb-2"
        />
        <textarea
          placeholder="Long Description"
          value={newProduct.long_description || ''}
          onChange={(e) => setNewProduct({ ...newProduct, long_description: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          rows={4}
        />
        <Input
          type="number"
          placeholder="Price"
          value={newProduct.price || ''}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          className="mb-2"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Category"
          value={newProduct.category || ''}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Stock Quantity"
          value={newProduct.stock_quantity || ''}
          onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: parseInt(e.target.value) })}
          className="mb-2"
        />
        <Button type="submit">Create Product</Button>
      </form>

      {/* Products Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {products.map((product) => (
          <AccordionItem value={product.id} key={product.id}>
            <AccordionTrigger>{product.name}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Short Description:</strong> {product.short_description}</p>
                  <p><strong>Long Description:</strong> {product.long_description}</p>
                  <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                </div>
                <div>
                  <p><strong>Stock Quantity:</strong> {product.stock_quantity}</p>
                  <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(product.updated_at).toLocaleString()}</p>
                  <img src={product.image_url} alt={product.name} className="w-32 h-32 object-cover mt-2" />
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => setEditingProduct(product)} className="mr-2">Edit</Button>
                <Button onClick={() => handleDeleteProduct(product.id)} variant="destructive">Delete</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleUpdateProduct}>
              <Input
                type="text"
                placeholder="Name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Short Description"
                value={editingProduct.short_description}
                onChange={(e) => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                className="mb-2"
              />
              <textarea
                placeholder="Long Description"
                value={editingProduct.long_description}
                onChange={(e) => setEditingProduct({ ...editingProduct, long_description: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                rows={4}
              />
              <Input
                type="number"
                placeholder="Price"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                className="mb-2"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="mb-2"
              />
              <Input
                type="text"
                placeholder="Category"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="mb-2"
              />
              <Input
                type="number"
                placeholder="Stock Quantity"
                value={editingProduct.stock_quantity}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) })}
                className="mb-2"
              />
              <Button type="submit" className="mr-2">Update</Button>
              <Button onClick={() => setEditingProduct(null)} variant="outline">Cancel</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}