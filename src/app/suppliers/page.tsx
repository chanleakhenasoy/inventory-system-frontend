"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/button";
import Pagination from "@/app/components/pagination";

export default function Supplier() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSuppliers = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/supplier/getAll`,
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
          setSuppliers(result.data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch suppliers.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickToSupplierCreate = () => {
    router.push("/suppliers/create");
  };

  const handleClickToSupplierId = (id: string) => {
    router.push(`/suppliers/${id}`);
  };

  // ✅ Correct filtering based on supplier_name
  const filteredSupplier = Array.isArray(suppliers)
    ? suppliers.filter((supplier) => {
        const name = supplier?.supplier_name || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  const totalPages = Math.ceil(filteredSupplier.length / itemsPerPage);

  const displayedSuppliers = filteredSupplier.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              placeholder="Supplier Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Supplier
          </h1>
          <Button onClick={handleClickToSupplierCreate} label="Create" />
        </div>

        {/* Loading and Error */}
        {loading && <p>Loading suppliers...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-4">
          <table className="min-w-full text-center">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-10 py-3 font-semibold">No</th>
                <th className="w-[300px] py-3 font-semibold text-[18px]">
                  Supplier Name
                </th>
                <th className="w-[300px] py-3 font-semibold text-[18px]">
                  Phone Number
                </th>
                <th className="w-[300px] py-3 font-semibold text-[18px]">
                  Address
                </th>
                <th className="w-[300px] py-3 font-semibold text-[18px]">
                  Company Name
                </th>
                <th className="w-[300px] py-3 font-semibold text-[18px]">
                  Created At
                </th>
                <th className="w-[300px] py-3 font-semibold text-[18px]">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {displayedSuppliers.length > 0 ? (
                displayedSuppliers.map((supplier: any, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                    onClick={() => handleClickToSupplierId(supplier.id)}
                  >
                    <td className="px-5 py-3 text-[16px]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="w-[300px]  py-3 text-[16px]">
                      {supplier.supplier_name}
                    </td>
                    <td className="w-[300px]  py-3 text-[16px]">
                      {supplier.phone_number}
                    </td>
                    <td className="w-[300px]  py-3 text-[16px]">
                      {supplier.address}
                    </td>
                    <td className="w-[300px]  py-3 text-[16px]">
                      {supplier.company_name}
                    </td>
                    <td className="w-[300px] py-3 text-[16px]">
                      {new Date(supplier.created_at).toLocaleString()}
                    </td>
                    <td className="w-[300px]  py-3 text-[16px]">
                      {new Date(supplier.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No suppliers found.
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
