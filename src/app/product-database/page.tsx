"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";

export default function ProductDatabase() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const ProductDatabase = Array(10).fill({
    id: "001",
    name_en: "Football",
    name_kh: "Football",
    beginning_quantity: "20",
    stock_in: "20",
    stock_out: "30",
    quantity_in_hand: "40",
    unit_avg_cost: "20%",
    stock_amount: "100$",
    minimum_stock: "50",
    stock_checking: "20",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleCreat(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Product Database
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-15">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-8 py-3 font-semibold">
                    ID
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Name En
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                    Name Kh
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Beginning Quaintity
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Stock In
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Stock Out
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Quaintity In Hand
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Unit Avg Cost
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Stock Amount
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Minimum Stock
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Stock Checking
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {ProductDatabase.map((productDatabase, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                >
                  <td className="px-8 py-3 text-[16px]">
                    {productDatabase.id}
                  </td>
                  <td className="px-8 py-3 text-[16px]">
                    {productDatabase.name_en}
                  </td>
                  <td className="px-8 py-3 text-[16px]">
                    {productDatabase.name_kh}
                  </td>
                  <td className="px-15 py-3 text-[16px]">
                    {productDatabase.beginning_quantity}
                  </td>
                  <td className="px-15 py-3 text-[16px]">
                    {productDatabase.stock_in}
                  </td>
                  <td className="px-10 py-3 text-[16px]">
                    {productDatabase.stock_out}
                  </td>
                  <td className="px-15 py-3 cursor-pointer text-[16px]">
                    {productDatabase.quantity_in_hand}
                  </td>
                  <td className="px-10 py-3 text-[16px]">
                    {productDatabase.unit_avg_cost}
                  </td>
                  <td className="px-10 py-3 text-[16px]">
                    {productDatabase.stock_amount}
                  </td>
                  <td className="px-13 py-3 text-[16px]">
                    {productDatabase.minimum_stock}
                  </td>
                  <td className="px-15 py-3 text-[16px]">
                    {productDatabase.stock_checking}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
       
      </main>
    </div>
  );
}
