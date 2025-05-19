"use client";

import { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  href: string;
}

export function SidebarItem({ icon, text, href }: SidebarItemProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    router.push(href);
  };

  const isActive = pathname === href;

  return (
    <button
      onClick={handleNavigation}
      className={`flex items-center px-10 py-6.5 text-white w-full cursor-pointer transition-colors duration-75 ${
        isActive ? "bg-[#6499EF] font-medium" : "hover:bg-[#6499EF]"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
}
