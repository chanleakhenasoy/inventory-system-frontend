"use client";

import { useEffect, useState, useCallback } from "react";
import { Package, Store, PackageX, Layers, Truck } from "lucide-react";
import {
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Area,
} from "recharts";
import { OverviewCard } from "../components/overviewCard";
import ProtectedRoute from "../components/ProtectedRoute";
import ChartCard from "../components/ChartCard";

interface ApiResponse {
  data?: number;
  message?: string;
}

interface BarData {
  name: string;
  value: number;
}

export default function Dashboard() {
  const [totalProduct, setProduct] = useState<number>(0);
  const [totalCategory, setCategory] = useState<number>(0);
  const [totalStockin, setTotalStockin] = useState<number>(0);
  const [totalStockout, setTotalStockout] = useState<number>(0);
  const [deliveryIn, setDeliveryIn] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    setLoading(true);
    setError("");

    const endpoints = [
      { url: "/api/product/total", setter: setProduct },
      { url: "/api/category/total", setter: setCategory },
      { url: "/api/stockIn/item/total/quantity", setter: setTotalStockin },
      { url: "/api/stockout/sum-all", setter: setTotalStockout },
    ];

    try {
      await Promise.all(
        endpoints.map(async ({ url, setter }) => {
          const response = await fetch(
            `https://hr-inventory-be.final25.psewmad.org${url}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorData: ApiResponse = await response.json();
            throw new Error(errorData.message || `Failed to fetch ${url}`);
          }

          const result: ApiResponse = await response.json();

          switch (url) {
            case "/api/stockout/sum-all":
              const totalQuantity =
                typeof result.data === "object" &&
                result.data !== null &&
                "total_quantity" in result.data
                  ? Number((result.data as any).total_quantity) || 0
                  : 0;
              setter(totalQuantity);
              break;

            default:
              setter(result.data ?? 0);
              break;
          }
        })
      );
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Network error. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const barChartData: BarData[] = [
    { name: "Products", value: totalProduct },
    { name: "Categories", value: totalCategory },
    { name: "Stock In", value: totalStockin },
    { name: "Stock Out", value: totalStockout },
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen mt-25">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-7">
              <h1 className="text-[30px] font-bold text-[#2D579A] mb-2">
                Dashboard
              </h1>
            </div>
            <div className="bg-white h-auto rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-[20px] font-semibold mb-4 text-[#2D579A]">
                Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <OverviewCard
                  icon={<Package className="text-orange-600" size={45} />}
                  title="Total Products"
                  value={totalProduct}
                  bgColor="bg-orange-50"
                  iconColor="text-orange-600"
                />
                <OverviewCard
                  icon={<Layers className="text-blue-600" size={45} />}
                  title="Total Category"
                  value={totalCategory}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-500"
                />
                <OverviewCard
                  icon={<Store className="text-green-500" size={45} />}
                  title="Total Stock In"
                  value={totalStockin}
                  bgColor="bg-green-50"
                  iconColor="text-green-500"
                />
                <OverviewCard
                  icon={<PackageX className="text-cyan-500" size={45} />}
                  title="Total Stock Out"
                  value={totalStockout}
                  bgColor="bg-cyan-50"
                  iconColor="text-cyan-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full h-[400px] bg-white rounded-md p-4 shadow">
                <h2 className="text-xl font-semibold mb-4 text-[#2D579A] mt-2">
                  Stock Overview
                </h2>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={barChartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#4D96FF" stopOpacity={1} />
                        <stop
                          offset="100%"
                          stopColor="#4D96FF"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4D96FF"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <ChartCard
                data={{
                  totalProducts: totalProduct,
                  totalCategory: totalCategory,
                  totalStockin: totalStockin,
                  totalStockout: totalStockout,
                }}
              />
            </div>

            {loading && (
              <p className="text-center mt-4 text-gray-500">Loading data...</p>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
