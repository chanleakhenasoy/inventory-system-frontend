"use client";

import { useEffect, useState } from "react";
import Pagination from "@/app/components/pagination";

interface Product {
  id: string;
  name_en: string;
  name_kh: string;
  beginning_quantity: number;
  totalStockout: number;
  quantity_in_hand: number;
  unit_avg_cost: number;
  available_amount: number;
  minimum_stock: number;
  stock_checking: number;
}

interface StockInCount {
  name_en: string;
  total_quantity: number;
}

interface StockOutCount {
  name_en: string;
  total_quantity: number;
}

interface CombinedProduct extends Product {
  totalStockin: number;
  totalStockout: number;
  quantityInHand: number;
  unitAvgCost: number;
  availableStockAmount: number;
  status: "Sufficient" | "Insufficient";
}

export default function ProductDatabase() {
  const [totalStockinItem, setTotalStockinItem] = useState<StockInCount[]>([]);
  const [totalStockoutItem, setTotalStockoutItem] = useState<StockOutCount[]>(
    []
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [error, setError] = useState<string[]>([]); // Store multiple errors
  const productsPerPage = 10;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
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
          setError((prev) => [
            ...prev,
            errorData.message || "Failed to fetch products.",
          ]);
        }
      } catch (err) {
        setError((prev) => [...prev, "Network error while fetching products."]);
      }
    };

    const fetchTotalStockInItem = async () => {
      const token = localStorage.getItem("token");
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
          setError((prev) => [
            ...prev,
            errorData.message || "Failed to fetch stockin.",
          ]);
        }
      } catch (err) {
        setError((prev) => [...prev, "Network error while fetching stockin."]);
      }
    };

    const fetchTotalStockout = async () => {
      const token = localStorage.getItem("token");
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
          setError((prev) => [
            ...prev,
            errorData.message || "Failed to fetch stockout.",
          ]);
        }
      } catch (err) {
        setError((prev) => [...prev, "Network error while fetching stockout."]);
      }
    };

    const fetchTotalQuantityInhand = async () => {
      const token = localStorage.getItem("token");
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

          setProducts((prevProducts) =>
            prevProducts.map((product) => {
              const match = quantityData.find(
                (item: any) => item.name_en === product.name_en
              );
              return {
                ...product,
                quantity_in_hand: match
                  ? match.quantity_in_hand
                  : product.quantity_in_hand,
              };
            })
          );
        } else {
          const errorData = await response.json();
          setError((prev) => [
            ...prev,
            errorData.message || "Failed to fetch quantity in hand.",
          ]);
        }
      } catch (err) {
        setError((prev) => [
          ...prev,
          "Network error while fetching quantity in hand.",
        ]);
      }
    };

    const fetchTotalUnitAvgCost = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/unit-avg-cost`,
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
          const avgCostData = result.data || [];
          console.log(avgCostData);

          // Update products with calculated_quantity from API
          setProducts((prevProducts) =>
            prevProducts.map((product) => {
              const match = avgCostData.find(
                (item: any) => item.product_id === product.id
              );
              return {
                ...product,
                unit_avg_cost: match ? match.calculated_quantity : null,
              };
            })
          );
        } else {
          const errorData = await response.json();
          setError((prev) => [
            ...prev,
            errorData.message || "Failed to fetch unit average cost.",
          ]);
        }
      } catch (err) {
        setError((prev) => [
          ...prev,
          "Network error while fetching unit average cost.",
        ]);
      }
    };

    const fetchAvailableAmount = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/available-stock-amount`,
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
          const avgCostData = result.data || [];
          console.log(avgCostData);

          // Update products with quantity_in_hand, unit_avg_cost, and available_amount
          setProducts((prevProducts) =>
            prevProducts.map((product) => {
              const match = avgCostData.find(
                (item: any) => item.product_id === product.id
              );
              return {
                ...product,
                quantity_in_hand: match ? match.quantity_in_hand : 0,
                unit_avg_cost: match ? match.unit_avg_cost : 0,
                available_amount: match ? match.available_amount : 0,
              };
            })
          );
        } else {
          const errorData = await response.json();
          setError((prev) => [
            ...prev,
            errorData.message || "Failed to fetch available stock amount.",
          ]);
        }
      } catch (err) {
        setError((prev) => [
          ...prev,
          "Network error while fetching available stock amount.",
        ]);
      }
    };
    fetchAvailableAmount();
    fetchTotalUnitAvgCost();
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
  const stockIn = totalStockinItem.find(
    (stock) => stock.name_en === product.name_en
  );
  const stockOut = totalStockoutItem.find(
    (stock) => stock.name_en === product.name_en
  );

  const totalStockin = stockIn ? Number(stockIn.total_quantity) : 0;
  const totalStockout = stockOut ? Number(stockOut.total_quantity) : 0;
  const beginningQuantity = Number(product.beginning_quantity || 0);
  const minimumStock = Number(product.minimum_stock || 0);
  const unitAvgCost = Number(product.unit_avg_cost || 0);

  const quantityInHand = beginningQuantity + totalStockin - totalStockout;
  const availableStockAmount = quantityInHand * unitAvgCost;

  const status: "Sufficient" | "Insufficient" =
    quantityInHand > minimumStock ? "Sufficient" : "Insufficient";

  return {
    ...product,
    totalStockin,
    totalStockout,
    quantityInHand,
    unitAvgCost,
    availableStockAmount,
    status,
  };
});

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = combinedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(combinedProducts.length / productsPerPage);

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
      <main className="flex-1 overflow-y-auto p-6">
      <div className="mb-4 w-full sm:w-[50%]">
  <div className="flex items-center space-x-2">
    {/* Input with icon */}
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

    {/* Search Button */}
    <button
      onClick={handleSearch}
      className="bg-[#2D579A] text-white text-sm px-4 py-2 rounded-3xl hover:bg-[#6499EF] transition cursor-pointer"
    >
      Search
    </button>
  </div>
</div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Product Database
          </h1>
        </div>

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
                <th className="px-8 py-3 font-semibold">
                  Available Stock Amount
                </th>
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
                    {product.available_amount}$
                  </td>
                  <td className="px-8 py-3 text-[16px]">
                    {product.minimum_stock}
                  </td>
                  <td className="px-8 py-3 text-[16px]">
                    <button
                      className={`px-3 py-1 rounded text-[13px] font-bold ${
                        product.status === "Sufficient" ? "text-green-600"  : "text-red-600"
                      }`}
                    >
                      {product.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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