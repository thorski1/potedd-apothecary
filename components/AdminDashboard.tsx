'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardOverview } from '@/components/DashboardOverview';
import ProductsTable from '@/components/ProductsTable';
import CategoriesTable from '@/components/CategoriesTable';
import ContactsTable from '@/components/ContactsTable';
import NewsletterSubscribersTable from '@/components/NewsletterSubscribersTable';
import OrderItemsTable from '@/components/OrderItemsTable';
import OrdersTable from '@/components/OrdersTable';
import ReservationsTable from '@/components/ReservationsTable';
import { logoutAction } from '@/app/admin/actions';
import { LogOut, LayoutDashboard, Menu } from 'lucide-react';
import { ProductBulkActions } from '@/components/ProductBulkActions';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const tabs = [
    { id: 'overview', label: 'Overview', component: <DashboardOverview /> },
    { id: 'products', label: 'Products', component: <ProductsTable /> },
    { id: 'categories', label: 'Categories', component: <CategoriesTable /> },
    { id: 'contacts', label: 'Contacts', component: <ContactsTable /> },
    { id: 'newsletter', label: 'Newsletter', component: <NewsletterSubscribersTable /> },
    { id: 'orderItems', label: 'Order Items', component: <OrderItemsTable /> },
    { id: 'orders', label: 'Orders', component: <OrdersTable /> },
    { id: 'reservations', label: 'Reservations', component: <ReservationsTable /> },
  ];

  useEffect(() => {
    if (triggerRef.current) {
      setDropdownWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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

      {/* Mobile dropdown */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button ref={triggerRef} variant="outline" className="w-full justify-between">
              {tabs.find(tab => tab.id === activeTab)?.label}
              <Menu className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ width: `${dropdownWidth}px` }}>
            {tabs.map((tab) => (
              <DropdownMenuItem key={tab.id} onSelect={() => setActiveTab(tab.id)}>
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop tabs */}
      <div className="hidden sm:block">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              {tab.component}
            </div>
          </div>
        ))}
      </div>

      {/* Add the ProductBulkActions component */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Product Bulk Actions</h2>
        <ProductBulkActions />
      </section>
    </div>
  );
}