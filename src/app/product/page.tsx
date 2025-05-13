"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import Category from "../category/page";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function Product() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const products = Array(10).fill({
    id: "001",
    category_name: "Ball",
    product_code: "2437658765",
    name_en: "Football",
    name_kh: "Football",
    img_url: "Football",
    createdAt: "2025-09-23",
    updatedAt: "2025-09-23",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // function handleCreat(): void {
  //   throw new Error("Function not implemented.");
  // }

  const handleClickToProductCreate = () => {
    router.push("/product/create"); // Replace with your route
  };

  const handleClickToProductId = () => {
    router.push("/product/[id]"); // Replace with your route
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search Bar */}
        <div className="mb-4 w-full sm:w-[50%]">
          <SearchBar />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Product</h1>
          <Button onClick={handleClickToProductCreate} label="Create" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-12 py-3 font-semibold text-[18px]">
                  Category Name
                </th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                  Product Code
                </th>
                <th className="px-10 py-3 font-semibold text-[18px]">
                    Name En
                    </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                   Name Kh
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                   Image Url
                </th>
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Create At
                </th>
                <th className="px-2 py-3 font-semibold text-[18px]">
                  Update At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                onClick={handleClickToProductId}>
                  <td className="px-5 py-3 text-[16px]">{product.id}</td>
                  <td className="px-12 py-3 text-[16px]">{product.category_name}</td>
                  <td className="px-4 py-3 text-[16px]">{product.product_code}</td>
                  <td className="px-10 py-3 text-[16px]">{product.name_en}</td>
                  <td className="px-8 py-3 text-[16px]">{product.name_kh}</td>
                  <td className="px-6 py-3 text-[16px]">{product.img_url}</td>
                  <td className="px-8 py-3 cursor-pointer text-[16px]">
                    {product.createdAt}
                  </td>
                  <td className="px-2 py-3 text-[16px]">
                    {product.updatedAt}
                  </td>
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
