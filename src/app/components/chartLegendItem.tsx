import { ReactNode } from "react";

interface ChartLegendItemProps {
  icon: ReactNode;
  text: string;
  color: string;
}

export function ChartLegendItem({ icon, text, color }: ChartLegendItemProps) {
  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <span className="text-sm text-black">{text}</span>
      </div>
    </div>
  );
}
