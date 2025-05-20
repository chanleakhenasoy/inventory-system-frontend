// 'use client';

// import {
//   Search,
//   Bell,
//   Package,
//   Store,
//   PackageX,
//   Layers,
//   Truck,
// } from "lucide-react";
// import PieChart from "@/app/components/chart";
// import Navbar from "../components/navbar";
// import { SidebarItem } from "../components/sidebarItem";
// import { OverviewCard } from "../components/overviewCard";
// import { ChartLegendItem } from "../components/chartLegendItem";
// import { useEffect, useState } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";

// export default function Dashboard() {
//   const [totalProduct, setProduct] = useState<number>(0);
//   const [totalCategory, setCategory] = useState<number>(0);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchTotalProduct = async () => {
//       const token = localStorage.getItem("token");
//       setLoading(true);
//       setError("");
  
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/total`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         if (response.ok) {
//           const result = await response.json();
//           setProduct(result.data || []);
//         } else {
//           const errorData = await response.json();
//           setError(errorData.message || "Failed to fetch total products.");
//         }
//       } catch (err) {
//         setError("Network error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchTotalCategory = async () => {
//       const token = localStorage.getItem("token");
//       setLoading(true);
//       setError("");

//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/total`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         if (response.ok) {
//           const result = await response.json();
//           setCategory(result.data || []);
//         } else {
//           const errorData = await response.json();
//           setError(errorData.message || "Failed to fetch total category.");
//         }
//       } catch (err) {
//         setError("Network error. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchTotalProduct();
//     fetchTotalCategory();
//   }, []);
  
  
//     return (
//       <ProtectedRoute>
//       <div className="flex h-screen mt-25">
//         {/* Main Content */}
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <main className="flex-1 overflow-y-auto p-6">
//             <div className="flex flex-col gap-6">
//               <div className="w-full sm:w-[10%] md:w-[30%] lg:w-[50%]">
               
//               </div>
//               <div className="flex items-center justify-between mb-7">
//                 <h1 className="text-[30px] font-bold text-[#2D579A] mb-9">
//                   Dashboard
//                 </h1>
//               </div>
//             </div>

//             {/* Overview Cards */}
//             <div className="bg-white h-[290px] rounded-lg shadow-sm p-6 mb-6">
//               <h2 className="text-[20px] font-semibold mb-4 text-[#2D579A]">Over View</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
//                 <OverviewCard
//                   icon={<Package className="text-blue-600" size={45} />}
//                   title="Total Products"
//                   value= {totalProduct}
//                   bgColor="bg-blue-50"
//                   iconColor="text-blue-600"
//                 />
//                 <OverviewCard
//                   icon={<Store className="text-orange-500" size={45} />}
//                   title="Low Stock"
//                   value="50"
//                   bgColor="bg-orange-50"
//                   iconColor="text-orange-500"
//                 />
//                 <OverviewCard
//                   icon={<PackageX className="text-green-500" size={45} />}
//                   title="Out Of Stock"
//                   value="10"
//                   bgColor="bg-green-50"
//                   iconColor="text-green-500"
//                 />
//                 <OverviewCard
//                   icon={<Layers className="text-cyan-500" size={45} />}
//                   title="Total product category"
//                   value={totalCategory}
//                   bgColor="bg-cyan-50"
//                   iconColor="text-cyan-500"
//                 />
//               </div>
//             </div>

//             {/* Lower Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Upcoming Deliveries */}
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-lg mb-4 text-[#2D579A] text-[20px] font-semibold">
//                   Upcoming Deliveries
//                 </h2>
//                 <div className="flex items-center justify-center p-6">
//                   <div className="text-center">
//                     <div className="flex justify-center mb-4">
//                       <Truck size={60} className="text-gray-700" />
//                     </div>
//                     <div className="text-2xl font-bold text-black">20 Day</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Chart */}
//               <div className="bg-white rounded-lg shadow-sm p-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex justify-center items-center">
//                     <PieChart />
//                   </div>
//                   <div className="flex flex-col justify-center space-y-4">
//                     <ChartLegendItem
//                       icon={<Package className="text-blue-600" size={20} />}
//                       text="Total Products"
//                       color="bg-blue-500"
//                     />
//                     <ChartLegendItem
//                       icon={<PackageX className="text-orange-500"  size={20} />}
//                       text="Out of stock"
//                       color="bg-green-500"
//                     />
//                     <ChartLegendItem
//                       icon={<Store className="text-green-500" size={20} />}
//                       text="Low Stock"
//                       color="bg-orange-500"
//                     />
//                     <ChartLegendItem
//                       icon={<Layers className="text-cyan-500" size={20} />}
//                       text="Total product category"
//                       color="bg-cyan-500"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//       </ProtectedRoute>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { Package, Store, PackageX, Layers, Truck } from "lucide-react";
import { OverviewCard } from "../components/overviewCard";
import ProtectedRoute from "../components/ProtectedRoute";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  const [totalProduct, setProduct] = useState<number>(0);
  const [totalCategory, setCategory] = useState<number>(0);
  const [lowStock, setLowStock] = useState<number>(0);
  const [outOfStock, setOutOfStock] = useState<number>(0);
  const [deliveryIn, setDeliveryIn] = useState<number>(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const endpoints = [
          { url: "/product/total", setter: setProduct },
          { url: "/category/total", setter: setCategory },
          { url: "/product/low-stock", setter: setLowStock },
          { url: "/product/out-of-stock", setter: setOutOfStock },
          { url: "/delivery/in", setter: setDeliveryIn },
        ];

        await Promise.all(
          endpoints.map(async ({ url, setter }) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
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
              console.log(`Response from ${url}:`, result);
              setter(result.data ?? 0);
            } else {
              const errorData = await response.json();
              console.error(`Error response from ${url}:`, errorData);
              throw new Error(errorData.message || `Failed to fetch ${url}`);
            }
          })
        );
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex h-screen mt-25">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-6">
              <div className="w-full sm:w-[10%] md:w-[30%] lg:w-[50%]"></div>
              <div className="flex items-center justify-between mb-7">
                <h1 className="text-[30px] font-bold text-[#2D579A] mb-9">
                  Dashboard
                </h1>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="bg-white h-[290px] rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-[20px] font-semibold mb-4 text-[#2D579A]">
                Over View
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                <OverviewCard
                  icon={<Package className="text-blue-600" size={45} />}
                  title="Total Products"
                  value={typeof totalProduct === "number" ? totalProduct : 0}
                  bgColor="bg-blue-50"
                  iconColor="text-blue-600"
                />
                <OverviewCard
                  icon={<Store className="text-orange-500" size={45} />}
                  title="Low Stock"
                  value={typeof lowStock === "number" ? lowStock : 0}
                  bgColor="bg-orange-50"
                  iconColor="text-orange-500"
                />
                <OverviewCard
                  icon={<PackageX className="text-green-500" size={45} />}
                  title="Out Of Stock"
                  value={typeof outOfStock === "number" ? outOfStock : 0}
                  bgColor="bg-green-50"
                  iconColor="text-green-500"
                />
                <OverviewCard
                  icon={<Layers className="text-cyan-500" size={45} />}
                  title="Total product category"
                  value={typeof totalCategory === "number" ? totalCategory : 0}
                  bgColor="bg-cyan-50"
                  iconColor="text-cyan-500"
                />
              </div>
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming Deliveries */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg mb-4 text-[#2D579A] text-[20px] font-semibold text-center">
                  Upcoming Deliveries
                </h2>
                <div className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Truck size={60} className="text-gray-700" />
                    </div>
                    <div className="text-2xl font-bold text-black">
                      {typeof deliveryIn === "number" ? deliveryIn : 0} Day
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <ChartCard
                data={{
                  totalProducts: totalProduct,
                  lowStock: lowStock,
                  outOfStock: outOfStock,
                  totalCategory: totalCategory,
                }}
              />
            </div>

            {loading && (
              <p className="text-center mt-4 text-gray-500">Loading data...</p>
            )}
            {error && <p className="text-center mt-4 text-red-600">{error}</p>}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
