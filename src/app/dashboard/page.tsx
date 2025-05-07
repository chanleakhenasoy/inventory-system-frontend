'use client';

import {
  Search,
  Bell,
  Package,
  Store,
  PackageX,
  Layers,
  Truck,
} from "lucide-react";
import PieChart from "@/app/components/chart";
import Navbar from "../components/navbar";
import { SidebarItem } from "../components/sidebarItem";
import { OverviewCard } from "../components/overviewCard";
import { ChartLegendItem } from "../components/chartLegendItem";

export default function Dashboard() {
  return (
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-6">
              <div className="w-full sm:w-[10%] md:w-[30%] lg:w-[50%]">
               
              </div>
              <div>
                <h1 className="text-[30px] font-bold text-[#2D579A] mb-6  ">
                <h1 className="text-[30px] font-bold text-[#2D579A] mb-6">
                  Dashboard
                </h1>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="bg-white h-[290px] rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-[20px] font-semibold mb-4 text-[#2D579A]">Over View</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                <OverviewCard
                  icon={<Package className="text-blue-600" size={45} />}
                  title="Total Products"
                  value="300"
                  bgColor="bg-blue-50"
                  iconColor="text-blue-600"
                />
                <OverviewCard
                  icon={<Store className="text-orange-500" size={45} />}
                  title="Low Stock"
                  value="50"
                  bgColor="bg-orange-50"
                  iconColor="text-orange-500"
                />
                <OverviewCard
                  icon={<PackageX className="text-green-500" size={45} />}
                  title="Out Of Stock"
                  value="10"
                  bgColor="bg-green-50"
                  iconColor="text-green-500"
                />
                <OverviewCard
                  icon={<Layers className="text-cyan-500" size={45} />}
                  title="Total product category"
                  value="300"
                  bgColor="bg-cyan-50"
                  iconColor="text-cyan-500"
                />
              </div>
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming Deliveries */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg mb-4 text-[#2D579A] text-[20px] font-semibold">
                  Upcoming Deliveries
                </h2>
                <div className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Truck size={60} className="text-gray-700" />
                    </div>
                    <div className="text-2xl font-bold text-black">20 Day</div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-center items-center">
                    <PieChart />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <ChartLegendItem
                      icon={<Package className="text-blue-600" size={20} />}
                      text="Total Products"
                      color="bg-blue-500"
                    />
                    <ChartLegendItem
                      icon={<PackageX className="text-orange-500"  size={20} />}
                      text="Out of stock"
                      color="bg-green-500"
                    />
                    <ChartLegendItem
                      icon={<Store className="text-green-500" size={20} />}
                      text="Low Stock"
                      color="bg-orange-500"
                    />
                    <ChartLegendItem
                      icon={<Layers className="text-cyan-500" size={20} />}
                      text="Total product category"
                      color="bg-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}
