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

  useEffect(() => {
    fetchStockIn(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [invoice]);

  const fetchStockIn = async (page: number) => {
    const token = localStorage.getItem("token");
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/getAll?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setInvoice(result.data || []); // Always update the suppliers, even if empty
        setCurrentPage(page);
        if ((result.data || []).length === 0) {
        }
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

  const handlePageChange = (page: number) => {
    fetchStockIn(page);
    // setCurrentPage(page);
  };

  const handleClickToStockinCreate = () => {
    router.push("/stockin/create");
  };

  const handleClickToStockinId = (id: any) => {
    router.push(`/stockin/${id}`);
  };

  const filteredStockIn = invoice.filter((invoice) =>
    invoice.reference_number
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStockIn.length / itemsPerPage);

  const displayedStockIn = filteredStockIn.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

    // Reset to first page when searchTerm changes
    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search */}
        <div className="mb-4 w-full sm:w-[50%]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-600 text-sm rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#2D579A] focus:border-[#2D579A] block w-full pl-10 p-2.5 transition-colors"
              placeholder="Reference Number..."
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
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Stock In
          </h1>
          <Button onClick={handleClickToStockinCreate} label="Create" />
        </div>

        {/* Error and Loading */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading && <div className="text-gray-500 mb-4">Loading...</div>}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-center">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">No</th>
                <th className="px-16 py-3 font-semibold text-[18px]">
                  Reference Number
                </th>
                <th className="px-12 py-3 font-semibold text-[18px]">
                  Supplier Name
                </th>
                <th className="px-12 py-3 font-semibold text-[18px]">
                  Purchase Date
                </th>
                <th className="px-14 py-3 font-semibold text-[18px]">
                  Payment Date
                </th>
                <th className="px-10 py-3 font-semibold text-[18px]">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
            {invoice.length > 0 ? (
                invoice.map((invoice: any, index) => (
                  <tr
                    key={invoice.id ?? index}
                    className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                    onClick={() => handleClickToStockinId(invoice.id)}
                  >
                    <td className="px-5 py-3">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-14 py-3">{invoice.reference_number}</td>
                    <td className="px-14 py-3">{invoice.supplier_name}</td>
                    <td className="px-14 py-3">
                      {new Date(invoice.purchase_date).toLocaleString()}
                    </td>
                    <td className="px-8 py-3">
                      {new Date(invoice.due_date).toLocaleString()}
                    </td>
                    <td className="px-2 py-3">
                      {new Date(invoice.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                  This page data is empty.
                  </td>
                </tr>
              )}
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
