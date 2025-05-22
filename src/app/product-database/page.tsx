"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name_en: string;
  name_kh: string;
  beginning_quantity: number;
  totalStockout: number;
  quantity_in_hand: number;
  unit_avg_cost: number;
  stock_amount: number;
  minimum_stock: number;
  stock_checking: number;
}

interface StockCount {
  name_en: string;
  total_quantity: number;
}

interface StockOutCount {
  name_en: string;
  total_quantity: number;
}

interface CombinedProduct extends Product {
  totalStockin: number;
}

export default function ProductDatabase() {
  const [totalStockinItem, setTotalStockinItem] = useState<StockCount[]>([]);
  const [totalStockoutItem, setTotalStockoutItem] = useState<StockOutCount[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string[]>([]); // Store multiple errors
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingStockIn, setLoadingStockIn] = useState(false);
  const [loadingStockOut, setLoadingStockOut] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      setLoadingProducts(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/getAll`,
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
          const fetchedProducts = result.data || [];
          setProducts(fetchedProducts);
        } else {
          const errorData = await response.json();
          setError((prev) => [...prev, errorData.message || "Failed to fetch products."]);
        }
      } catch (err) {
        setError((prev) => [...prev, "Network error while fetching products."]);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchTotalStockInItem = async () => {
      const token = localStorage.getItem("token");
      setLoadingStockIn(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/item/total`,
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
          const fetchedStockin = result.data || [];
          setTotalStockinItem(fetchedStockin);
        } else {
          const errorData = await response.json();
          setError((prev) => [...prev, errorData.message || "Failed to fetch stockin."]);
        }
      } catch (err) {
        setError((prev) => [...prev, "Network error while fetching stockin."]);
      } finally {
        setLoadingStockIn(false);
      }
    };

    const fetchTotalStockout = async () => {
      const token = localStorage.getItem("token");
      setLoadingStockOut(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockout/item/total`,
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
          const fetchedStockout = result.data || [];
          setTotalStockoutItem(fetchedStockout);
        } else {
          const errorData = await response.json();
          setError((prev) => [...prev, errorData.message || "Failed to fetch stockout."]);
        }
      } catch (err) {
        setError((prev) => [...prev, "Network error while fetching stockout."]);
      } finally {
        setLoadingStockOut(false);
      }
    };

    const fetchTotalQuantityInhand = async () => {
      const token = localStorage.getItem("token");
      setLoadingStockOut(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/quantity-in-hand`,
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
          const quantityData = result.data || [];
    
          // Update products with quantity_in_hand from API
          setProducts((prevProducts) =>
            prevProducts.map((product) => {
              const match = quantityData.find((item: any) => item.name_en === product.name_en);
              return {
                ...product,
                quantity_in_hand: match ? match.quantity_in_hand : product.quantity_in_hand,
              };
            })
          );
        } else {
          const errorData = await response.json();
          setError((prev) => [...prev, errorData.message || "Failed to fetch quantity in hand."]);
        }
      } catch (err) {
        setError((prev) => [...prev, "Network error while fetching quantity in hand."]);
      } finally {
        setLoadingStockOut(false);
      }
    };
    

    fetchTotalQuantityInhand();
    fetchTotalStockout();
    fetchTotalStockInItem();
    fetchProducts();
    
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Combine products with their totalStockin and totalStockout values
  const combinedProducts: CombinedProduct[] = products.map((product) => {
    const stockIn = totalStockinItem.find((stock) => stock.name_en === product.name_en);
    const stockOut = totalStockoutItem.find((stock) => stock.name_en === product.name_en);
    return {
      ...product,
      totalStockin: stockIn ? stockIn.total_quantity : 0,
      totalStockout: stockOut ? stockOut.total_quantity : product.totalStockout, // Use fetched or default
    };
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = combinedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(combinedProducts.length / productsPerPage);

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Product Database
          </h1>
        </div>

        {/* Error Messages */}
        {error.length > 0 && (
          <div className="text-red-500 mb-4">
            {error.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        {/* Loading State */}
        {(loadingProducts || loadingStockIn || loadingStockOut) ? (
          <p className="text-[#2D579A]">Loading...</p>
        ) : combinedProducts.length === 0 ? (
          <p className="text-[#2D579A]">No products available.</p>
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
                {currentProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                  >
                    <td className="px-8 py-3 text-[16px]">
                      {indexOfFirstProduct + index + 1}
                    </td>
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

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-[#2D579A] text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === page ? "bg-[#2D579A] text-white" : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-[#2D579A] text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}