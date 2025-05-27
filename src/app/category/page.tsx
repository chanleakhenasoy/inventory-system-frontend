"use client";

import { useState, useEffect } from "react";
import Pagination from "@/app/components/pagination";
import { useRouter } from "next/navigation";
import Button from "../components/button";

export default function Category() {
  const router = useRouter();
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories(currentPage, appliedSearchTerm);
  }, [currentPage, appliedSearchTerm]);

  const fetchCategories = async (page: number, search = "") => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/category/getAll?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(
          search
        )}`,
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
        const newCategories = result.data || [];
        setAllCategories((prev) =>
          page === 1 ? newCategories : [...prev, ...newCategories]
        ); 
        setFilteredCategories(newCategories);
        setTotalItems(result.total || 0);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch categories.");
        setAllCategories([]);
        setFilteredCategories([]);
        setTotalItems(0);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setAllCategories([]);
      setFilteredCategories([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = allCategories.filter((category) =>
      category.category_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setAppliedSearchTerm(searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickToCategoryCreate = () => {
    router.push("/category/create");
  };

  const handleClickToCategoryId = (id: string) => {
    router.push(`/category/${id}`);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                placeholder="Search by Category Name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
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
            Category
          </h1>
          <Button onClick={handleClickToCategoryCreate} label="Create" />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {loading ? (
          <div className="text-center mt-10">Loading...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-md mt-10">
            <table className="min-w-full text-center">
              <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
                <tr>
                  <th className="px-6 py-3 font-semibold">No</th>
                  <th className="px-12 py-3 font-semibold text-[18px]">
                    Category Name
                  </th>
                  <th className="px-10 py-3 font-semibold text-[18px]">
                    Description
                  </th>
                  <th className="px-10 py-3 font-semibold text-[18px]">
                    Create At
                  </th>
                  <th className="px-10 py-3 font-semibold text-[18px]">
                    Update At
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#2B5190]">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category: any, index) => (
                    <tr
                      key={category.id}
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
