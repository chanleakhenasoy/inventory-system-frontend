import { useEffect, useState } from "react";

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  pageNum?: number;
}

export default function Pagination({
  totalPages,
  initialPage = 1,
  onPageChange,
  pageNum = 1,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page === currentPage) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        className="p-2 text-[#2D579A] hover:text-[#6499EF] disabled:opacity-50 flex items-center justify-center cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-[#2D579A] font-bold">{currentPage}</span>
      </div>
      <button
        className="p-2 text-[#2D579A] hover:text-[#6499EF] disabled:opacity-50 flex items-center justify-center cursor-pointer"
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
