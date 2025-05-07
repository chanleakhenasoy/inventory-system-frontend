"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { SidebarItem } from "./sidebarItem";
import {
  Package,
  Store,
  PackageX,
  Layers,
} from "lucide-react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  if (isLoginPage) {
    return <>{children}</>; 
  }

  return (
    <>
      <Navbar />
      <div className="flex h-[750px]">
        {/* Sidebar */}
        <div className="w-96 bg-[#2D579A] text-white text-[20px]">
          <nav className="mt-6">
            <SidebarItem icon={<Package size={25} />} text="Dashboard" href="/dashboard" />
            <SidebarItem icon={<Store size={25} />} text="Suppliers" href="/suppliers" />
            <SidebarItem icon={<Layers size={25} />} text="Category" href="/category" />
            <SidebarItem icon={<Package size={25} />} text="Product" href="/product" />
            <SidebarItem icon={<Package size={25} />} text="Stock In" href="/stockin" />
            <SidebarItem icon={<PackageX size={25} />} text="Stock Out" href="/stockout" />
            <SidebarItem icon={<Package size={25} />} text="Create User" href="/register" />
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}
