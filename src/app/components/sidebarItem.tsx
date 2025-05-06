import { ReactNode } from "react";
import Link from "next/link";

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

export function SidebarItem({ icon, text, href, active = false }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-6 py-4 text-white ${
        active ? "font-medium" : "hover:bg-[#6499EF]"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </Link>
  );
}
