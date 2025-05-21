"use client";

import { useState, useEffect } from "react";
import Pagination from "@/app/components/pagination";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function StockIn() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [invoice, setInvoice] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  console.log(invoice)
  useEffect(() => {
    const fetchStockIn = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/getAll`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setInvoice(result.data || []);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch stock in.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockIn();
  }, []);

  const handleClickToStockinCreate = () => {
    router.push("/stockin/create");
  };

  const handleClickToStockinId = (id: any) => {
    router.push(`/stockin/${id}`);
    // /stockin/productId
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredStockIn = invoice.filter((item) =>
    item.name_en?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStockIn.length / itemsPerPage);

  const displayedStockIn = filteredStockIn.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("=====>",displayedStockIn)

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search input */}
        <div className="mb-4 w-full sm:w-[50%]">
          <div className="relative">
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-600 text-sm rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#2D579A] focus:border-[#2D579A] block w-full pl-10 p-2.5 transition-colors"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Title and Create button */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Stock In</h1>
          <Button onClick={handleClickToStockinCreate} label="Create" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-center">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">No</th>
                <th className="px-16 py-3 font-semibold text-[18px]">Reference Number</th>
                <th className="px-12 py-3 font-semibold text-[18px]">Supplier Name</th>
                <th className="px-12 py-3 font-semibold text-[18px]">Purchase date</th>
                <th className="px-14 py-3 font-semibold text-[18px]">Payment date </th>
                {/* <th className="px-6 py-3 font-semibold text-[18px]">Created At</th> */}
                <th className="px-10 py-3 font-semibold text-[18px]">Updated At</th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {invoice.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                  onClick={() => handleClickToStockinId(invoice.id)}
                >
                  <td className="px-5 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-14 py-3">{invoice.reference_number}</td>
                  <td className="px-14 py-3">{invoice.supplier_name}</td>
                  <td className="px-14 py-3">{new Date(invoice.purchase_date).toLocaleString()}</td>
                  <td className="px-8 py-3">{new Date(invoice.due_date).toLocaleString()}</td>
                  {/* <td className="px-18 py-3">{new Date(invoice.created_at).toLocaleString()}</td> */}
                  <td className="px-2 py-3">{new Date(invoice.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <Pagination
            totalPages={totalPages}
            initialPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}
