"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../components/button";

export default function Category() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const category = Array(10).fill({
    id: "001",
    category_name: "leakhena",
    description: "mararika",
    createdAt: "2025-09-23",
    updatedAt: "2025-10-23",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickToCategoryCreate = () => {
    router.push("/category/create"); // Replace with your route
  };

  const handleClickToCategoryId = () => {
    router.push("/category/[id]"); // Replace with your route
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
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Category
          </h1>
          <Button onClick={handleClickToCategoryCreate} label="Create" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-22 py-3 font-semibold text-[18px]">
                  Category Name
                </th>
                <th className="px-18 py-3 font-semibold text-[18px]">
                  Description
                </th>
                <th className="px-18 py-3 font-semibold text-[18px]">
                  Create At
                </th>
                <th className="px-2 py-3 font-semibold text-[18px]">
                  Update At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {category.map((category, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                  onClick={handleClickToCategoryId}>
                  <td className="px-5 py-3 text-[16px]">
                      {category.id}
                  </td>
                  <td className="px-22 py-3 text-[16px]">
                    {category.category_name}
                  </td>
                  <td className="px-18 py-3 text-[16px]">
                    {category.description}
                  </td>
                  <td className="px-18 py-3 text-[16px]">
                    {category.createdAt}
                  </td>
                  <td className="px-2 py-3 text-[16px]">
                    {category.updatedAt}
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
