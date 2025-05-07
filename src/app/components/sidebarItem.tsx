"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

export function SidebarItem({ icon, text, href, active = false }: SidebarItemProps) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleNavigation}
      className={`flex items-center px-6 py-4 text-white ${
        active ? "font-medium" : "hover:bg-[#6499EF] w-full"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

