import { ReactNode } from "react";

interface OverviewCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
  iconColor?: string;
  
}

export function OverviewCard({
  icon,
  title,
  value,
  bgColor,
  iconColor,
}: OverviewCardProps) {
  return (
    <div className={`${bgColor} flex justify-center rounded-lg items-center h-[150px]`}>
      <div className={`mr-4 p-2 rounded-lg flex justify-center it ${iconColor || ''}`}>
        {icon}
      </div>
      <div>
        <div className="text-[30px] font-semibold text-black">{value}</div>
        <div className="text-[15px] text-gray-600">{title}</div>
      </div>
    </div>
  );
}
