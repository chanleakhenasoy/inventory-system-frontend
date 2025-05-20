"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";


interface Product {
  id: string;
  name_en: string;
  name_kh: string;
  beginning_quantity: number;
  totalStockin: number;
  totalStockout: number;
  quantity_in_hand: number;
  unit_avg_cost: number;
  stock_amount: number;
  minimum_stock: number;
  stock_checking: string;
}

export default function ProductDatabase() {
  const [ProductDatabase, setProductDatabase] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  useEffect(() => {
    const fetchStockData = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      setError("");

      try {
        const [stockInRes, stockOutRes, productsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/total`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stockout/total`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (stockInRes.ok && stockOutRes.ok && productsRes.ok) {
          const stockInData = await stockInRes.json();
          const stockOutData = await stockOutRes.json();
          const productsData = await productsRes.json();

          const totalStockin = stockInData.data || 0;
          const totalStockout = stockOutData.data || 0;

          const updatedProducts = productsData.data.map((product: Product) => ({
            ...product,
            totalStockin: totalStockin,
            totalStockout: totalStockout,
          }));

          setProductDatabase(updatedProducts);
        } else {
          setError("Failed to fetch stock data.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Product Database
          </h1>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white rounded-md mt-5">
            <table className="min-w-full text-center">
              <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
                <tr>
                  <th className="px-8 py-3 font-semibold">No</th>
                  <th className="px-8 py-3 font-semibold">Name En</th>
                  <th className="px-8 py-3 font-semibold">Name Kh</th>
                  <th className="px-8 py-3 font-semibold">Beginning Quantity</th>
                  <th className="px-8 py-3 font-semibold">Stock In</th>
                  <th className="px-8 py-3 font-semibold">Stock Out</th>
                  <th className="px-8 py-3 font-semibold">Quantity In Hand</th>
                  <th className="px-8 py-3 font-semibold">Unit Avg Cost</th>
                  <th className="px-8 py-3 font-semibold">Stock Amount</th>
                  <th className="px-8 py-3 font-semibold">Minimum Stock</th>
                  <th className="px-8 py-3 font-semibold">Stock Checking</th>
                </tr>
              </thead>
              <tbody className="text-[#2B5190]">
                {ProductDatabase.map((product, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                  >
                    <td className="px-8 py-3 text-[16px]">{product.id}</td>
                    <td className="px-8 py-3 text-[16px]">{product.name_en}</td>
                    <td className="px-8 py-3 text-[16px]">{product.name_kh}</td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.beginning_quantity}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.totalStockin}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.totalStockout}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.quantity_in_hand}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.unit_avg_cost}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.stock_amount}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.minimum_stock}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.stock_checking}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
