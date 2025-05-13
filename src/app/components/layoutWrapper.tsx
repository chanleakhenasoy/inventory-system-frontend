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
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Load user role from localStorage (or API if necessary)
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="flex h-[850px]">
        {/* Sidebar */}
        <div className="w-90 bg-[#2D579A] text-white text-[20px]">
          <nav className="mt-6">
          <SidebarItem icon={<LayoutDashboard size={25} />} text="Dashboard" href="/dashboard" />
            <SidebarItem icon={<Store size={25} />} text="Suppliers" href="/suppliers" />
            <SidebarItem icon={<BoxIcon size={25} />} text="Category" href="/category" />
            <SidebarItem icon={<Boxes size={25} />} text="Product" href="/product" />
            <SidebarItem icon={<Package size={25} />} text="Stock In" href="/stockin" />
            <SidebarItem icon={<PackageX size={25} />} text="Stock Out" href="/stockout" />
            <SidebarItem icon={<Database size={25} />} text="Product Database" href="/product-database" />
            {role === "admin" && (
              <SidebarItem icon={<User size={25} />} text="Create User" href="/register" />
            )}
        
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
      </div>
    </>
  );
}
