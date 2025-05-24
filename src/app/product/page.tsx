"use client";

import { useState, useEffect } from "react";
import Pagination from "@/app/components/pagination";
import Button from "../components/button";
import { useRouter } from "next/navigation";

export default function Product() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  // Fetch products when page or searchTerm changes
  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchProducts = async (page: number, search: string) => {
    const token = localStorage.getItem("token");
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/getAll?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}`,
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
        setProducts(result.data || []);
        setTotalPages(Math.ceil((result.total || result.data.length) / itemsPerPage));
      } else {
        setError(result.message || "Failed to fetch products.");
        setProducts([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickToProductCreate = () => {
    router.push("/product/create");
  };

  const handleClickToProductId = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search Bar */}
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
              placeholder="Name En..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Product</h1>
          <Button onClick={handleClickToProductCreate} label="Create" />
        </div>

        {/* Loading and Error */}
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-center">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">No</th>
                <th className="w-[200px] py-3 font-semibold text-[18px]">Category Name</th>
                <th className="w-[200px] py-3 font-semibold text-[18px]">Product Code</th>
                <th className="w-[150px] py-3 font-semibold text-[18px]">Name En</th>
                <th className="w-[150px] py-3 font-semibold text-[18px]">Name Kh</th>
                <th className="w-[200px] py-3 font-semibold text-[18px]">Beginning Quantity</th>
                <th className="w-[200px] py-3 font-semibold text-[18px]">Minimum Stock</th>
                <th className="w-[150px] py-3 font-semibold text-[18px]">Created At</th>
                <th className="w-[130px] py-3 font-semibold text-[18px]">Updated At</th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {products.length > 0 ? (
                products.map((product: any, index) => (
                  <tr
                    key={product.id ?? index}
                    className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                    onClick={() => handleClickToProductId(product.id)}
                  >
                    <td className="px-5 py-3 text-[16px]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-12 py-3 text-[16px]">{product.category_name}</td>
                    <td className="px-4 py-3 text-[16px]">{product.product_code}</td>
                    <td className="px-10 py-3 text-[16px]">{product.name_en}</td>
                    <td className="px-8 py-3 text-[16px]">{product.name_kh}</td>
                    <td className="px-6 py-3 text-[16px]">{product.beginning_quantity}</td>
                    <td className="px-6 py-3 text-[16px]">{product.minimum_stock}</td>
                    <td className="px-8 py-3 text-[16px]">
                      {new Date(product.created_at).toLocaleString()}
                    </td>
                    <td className="px-2 py-3 text-[16px]">
                      {new Date(product.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-4 text-center text-gray-500">
                    No products found.
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