// /app/stockin/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function StockInList() {
  const router = useRouter();

  const stockInItems = [
    { id: 1, referenceName: "Mararika" },
    { id: 2, referenceName: "Product B" },
  ];

  const handleNavigate = (id: number) => {
    router.push(`/stockin/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Stock In List</h1>
      <ul>
        {stockInItems.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <span>{item.referenceName}</span>
            <button
              onClick={() => handleNavigate(item.id)}
              className="text-blue-600 underline"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
