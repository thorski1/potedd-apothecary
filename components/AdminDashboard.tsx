'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsTable from '@/components/ProductsTable';
import CategoriesTable from '@/components/CategoriesTable';
import ContactsTable from '@/components/ContactsTable';
import NewsletterSubscribersTable from '@/components/NewsletterSubscribersTable';
import OrderItemsTable from '@/components/OrderItemsTable';
import OrdersTable from '@/components/OrdersTable';
import ReservationsTable from '@/components/ReservationsTable';
import { logoutAction } from '@/app/admin/actions';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const tabs = [
    { id: 'products', label: 'Products', component: <ProductsTable /> },
    { id: 'categories', label: 'Categories', component: <CategoriesTable /> },
    { id: 'contacts', label: 'Contacts', component: <ContactsTable /> },
    { id: 'newsletter', label: 'Newsletter', component: <NewsletterSubscribersTable /> },
    { id: 'orderItems', label: 'Order Items', component: <OrderItemsTable /> },
    { id: 'orders', label: 'Orders', component: <OrdersTable /> },
    { id: 'reservations', label: 'Reservations', component: <ReservationsTable /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <LayoutDashboard className="mr-2" />
          Admin Dashboard
        </h1>
        <form action={logoutAction}>
          <Button type="submit" variant="outline" className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </form>
      </div>
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="bg-white shadow-md rounded-lg p-6 mt-4">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}