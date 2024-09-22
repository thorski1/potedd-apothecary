export interface Product {
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

export type ProductCSVData = Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
  price: number | string;
  stock_quantity: number | string;
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}