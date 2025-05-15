"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import { useRouter } from "next/navigation";
import Button from "../components/button";

export default function Category() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(categories);

  useEffect(() => {
    const fetchcategories = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3001/api/category/getAll",
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
          setCategories(result.data || []); // Adjust according to your API response structure
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch category.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchcategories();
  }, [setCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleClickToCategoryCreate = () => {
    router.push("/category/create");
  };

  const handleClickToCategoryId = (id: string) => {
    router.push(`/category/${id}`);
  };

  const itemsPerPage = 10;
  const displayedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center mt-10">Loading...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-md mt-10">
            <table className="min-w-full text-center">
              <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
                <tr>
                  <th className="px-6 py-3 font-semibold">No</th>
                  <th className="px-6 py-3 font-semibold text-[18px]">
                    Category Name
                  </th>
                  <th className="px-6 py-3 font-semibold text-[18px]">
                    Description
                  </th>
                  <th className="px-6 py-3 font-semibold text-[18px]">
                    Create At
                  </th>
                  <th className="px-6 py-3 font-semibold text-[18px]">
                    Update At
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#2B5190]">
                {displayedCategories.length > 0 ? (
                  displayedCategories.map((category: any, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                      onClick={() => handleClickToCategoryId(category.id)}
                    >
                      <td className="px-5 py-3 text-[16px]">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-5 py-3 text-[16px]">
                        {category.category_name}
                      </td>
                      <td className="px-5 py-3 text-[16px]">
                        {category.description}
                      </td>
                      <td className="px-5 py-3 text-[16px]">
                        {new Date(category.created_at).toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-[16px]">
                        {new Date(category.updated_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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
