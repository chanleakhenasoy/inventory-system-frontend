"use client";

import { usePathname } from "next/navigation";
import { useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { debounce } from "lodash";


type Props = {
  onResults: (data: any[], total: number) => void;
  perPage?: number;
  page?: number;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

const SearchBar = forwardRef(({ onResults, perPage = 10, page = 1, setLoading, setError }: Props, ref) => {
  const [keyword, setKeyword] = useState("");
  const pathname = usePathname(); 

  const handleSearch = useCallback(async () => {
    setError("");
    setLoading(true);

    const trimmedKeyword = keyword.trim();
  
    let endpoint = "";
    if (pathname === "/products") {
      endpoint = "/product/search";
    } else if (pathname === "/categories") {
      endpoint = "/category/search";
    } else if (pathname === "/stockin") {
      endpoint = "/stockIn/search";
    } else if (pathname === "supplier"){
      endpoint = "/supplier/search"
    }else if (pathname === "user"){
      endpoint = "/user/search"
    }
    else {
      setError("Search is not supported on this page");
      setLoading(false);
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      setError("API configuration error");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return;
    }

    const params = new URLSearchParams({
      search: trimmedKeyword,
      page: page.toString(),
      limit: perPage.toString(),
    });
    const url = `${baseUrl}${endpoint}?${params.toString()}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      if (!result.data) {
        throw new Error("Invalid response format");
      }

      onResults(result.data, result.total || 0);
    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [keyword, perPage, page, pathname, onResults, setLoading, setError]);

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

  useImperativeHandle(ref, () => ({
    triggerSearch: handleSearch,
  }));

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex gap-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            debouncedSearch();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              debouncedSearch.cancel();
              handleSearch();
            }
          }}
          placeholder="Category Name..."
          className="bg-white border border-gray-300 text-gray-600 text-sm rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#2D579A] focus:border-[#2D579A] block w-full pl-10 p-2.5 transition-colors"
          aria-label="Search categories"
          aria-busy={false} 
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </div>
  );
});

export default SearchBar;