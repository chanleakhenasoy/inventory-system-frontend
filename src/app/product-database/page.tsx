"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Pagination from "@/app/components/pagination";

interface Product {
  id: string;
  name_en: string;
  name_kh: string;
  beginning_quantity: number;
  total_stockin: number;
  total_stockout: number;
  unit_avg_cost: number;
  minimum_stock: number;
}

interface CombinedProduct extends Product {
  quantity_in_hand: number;
  available_amount: number;
  status: "Sufficient" | "Insufficient";
}

export default function ProductDatabase() {
  const [products, setProducts] = useState<CombinedProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<CombinedProduct[]>([]);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  const productsPerPage = 10;
  const isInitialMount = useRef(true); // Track initial mount to avoid duplicate fetches

  // Debounced search handler
  const debouncedSearch = useCallback((term: string) => {
    setCurrentPage(1);
    setAppliedSearchTerm(term);
  }, []);

  // Use useRef to manage the timeout ID for client-side filtering
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Handle search input change with debouncing for client-side filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear existing timeout if it exists
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set new timeout for filtering
    timeoutIdRef.current = setTimeout(() => {
      // Perform client-side filtering
      const filtered = products.filter(
        (product) =>
          product.name_en.toLowerCase().includes(value.toLowerCase()) ||
          product.name_kh.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      timeoutIdRef.current = null;
    }, 300);
  };

  // Fetch products when currentPage or appliedSearchTerm changes
  useEffect(() => {
    if (isInitialMount.current) {
      fetchProducts(1, ""); // Initial fetch
      isInitialMount.current = false;
    } else {
      fetchProducts(currentPage, appliedSearchTerm);
    }
  }, [currentPage, appliedSearchTerm]);

  const fetchProducts = async (page: number, search = "") => {
    setLoading(true);
    setError([]);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/product-database?page=${page}&limit=${productsPerPage}&search=${encodeURIComponent(search)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Failed to fetch products.");
      }

      const data = await res.json();
      console.log("API Response:", data);

      const stockSummary = data?.data?.stockSummary || data.stockSummary || [];
      const total = data?.pagination?.totalItems || data.total || 0;

      const combined = stockSummary.map((item: any) => {
        const status: "Sufficient" | "Insufficient" =
          item.quantity_in_hand > 0 ? "Sufficient" : "Insufficient";

        return {
          ...item,
          name_en: item.name_en ?? "N/A",
          name_kh: item.name_kh ?? "N/A",
          beginning_quantity: parseFloat(item.beginning_quantity ?? 0),
          total_stockin: parseFloat(item.total_stockin ?? 0),
          total_stockout: parseFloat(item.total_stockout ?? 0),
          quantity_in_hand: parseFloat(item.quantity_in_hand ?? 0),
          unit_avg_cost: parseFloat(item.unit_avg_cost ?? 0),
          available_amount: parseFloat(item.available_amount ?? 0),
          minimum_stock: item.minimum_stock ?? 0,
          status,
        };
      });

      setProducts(combined);
      // Update filtered products based on the current search term
      if (searchTerm) {
        const filtered = combined.filter(
          (product: CombinedProduct) =>
            product.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.name_kh.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(combined);
      }
      setTotalItems(total);
    } catch (err) {
      setError(["Network error. Please try again."]);
      setProducts([]);
      setFilteredProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / productsPerPage);

  // Use filtered products while typing, fall back to products for search/pagination
  const displayProducts = searchTerm && !loading ? filteredProducts : products;

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 w-full sm:w-[50%]">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                className="bg-white border border-gray-300 text-gray-600 text-sm rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#2D579A] focus:border-[#2D579A] block w-full pl-10 p-2.5"
                placeholder="Name En..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button
              onClick={() => debouncedSearch(searchTerm)}
              className="bg-[#2D579A] text-white text-sm px-4 py-2 rounded-3xl hover:bg-[#6499EF] transition cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        <h1 className="text-[30px] font-bold text-[#2D579A] mt-4 mb-2">
          Product Database
        </h1>

        {error.length > 0 && (
          <div className="text-red-600 mb-4">{error[0]}</div>
        )}
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No products found.
          </div>
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
                  <th className="px-8 py-3 font-semibold">Available Stock Amount</th>
                  <th className="px-8 py-3 font-semibold">Minimum Stock</th>
                  <th className="px-8 py-3 font-semibold">Stock Checking</th>
                </tr>
              </thead>
              <tbody className="text-[#2B5190]">
                {displayProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                  >
                    <td className="px-8 py-3 text-[16px]">
                      {(currentPage - 1) * productsPerPage + index + 1}
                    </td>
                    <td className="px-8 py-3 text-[16px]">{product.name_en}</td>
                    <td className="px-8 py-3 text-[16px]">{product.name_kh}</td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.beginning_quantity}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.total_stockin}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.total_stockout}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.quantity_in_hand}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.unit_avg_cost}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {typeof product.available_amount === "number"
                        ? `$${product.available_amount.toFixed(2)}`
                        : "$0.00"}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      {product.minimum_stock}
                    </td>
                    <td className="px-8 py-3 text-[16px]">
                      <span
                        className={`px-3 py-1 rounded text-[13px] font-bold ${
                          product.status === "Sufficient"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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