"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { SidebarItem } from "./sidebarItem";
import { useEffect, useState } from "react";

import { Package, Store, PackageX, Layers, LayoutDashboard, BoxIcon, Boxes, User, Database } from "lucide-react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (isLoginPage) {
    return <>{children}</>;
  }

  const role = isClient ? localStorage.getItem("userRole") : null;
  return (
    <>
      <Navbar />
      <div className="flex h-[965px]">
        {/* Sidebar */}
        <div className="w-80 bg-[#2D579A] text-white text-[20px] mt-[102.4px]">
          <nav>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" href="/dashboard" />
            <SidebarItem icon={<Store size={20} />} text="Suppliers" href="/suppliers" />
            <SidebarItem icon={<BoxIcon size={20} />} text="Category" href="/category" />
            <SidebarItem icon={<Boxes size={20} />} text="Product" href="/product" />
            <SidebarItem icon={<Package size={20} />} text="Stock In" href="/stockin" />
            <SidebarItem icon={<PackageX size={20} />} text="Stock Out" href="/stockout" />
            <SidebarItem icon={<Database size={20} />} text="Product Database" href="/product-database" />
            {(role === "admin" || role === "manager") && (
           <SidebarItem icon={<User size={20} />} text="Create User" href="/register" />
            )}

          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
      </div>
    </>
  );
}
