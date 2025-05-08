"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react"
import BackButton from "@/app/components/backButton";
export default function AllUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const router = useRouter();

  const allUser = Array(10).fill({
    user_name: "Sopheak",
    email: "example@gmail.com",
    role: "Officer",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // delete button
  const handleDelete = (index: number) => {
    const updatedUsers = [...allUser];
    updatedUsers.splice(index, 1);
    console.log("Deleted user at index:", index);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        <BackButton />

        {/* Search Bar */}
        <div className="mb-4 w-full sm:w-[50%] mt-4">
          <SearchBar />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            All User
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px] min-w-full ">
              <tr>
                <th className="px-24 py-3 font-semibold text-[18px]">
                  User Name
                </th>
                <th className="px-18 py-3 font-semibold text-[18px]">Email</th>
                <th className="px-36 py-3 font-semibold text-[18px]">Role</th>
                <th className="px-4 py-3 font-semibold text-[18px]">Action</th> 
              </tr>
            </thead>

            <tbody className="text-[#2D579A]">
              {allUser.map((alluser, index) => (
                <tr key={index} className="hover:bg-[#F3F3F3] h-[55px]">
                  <td className="px-24 py-3 text-[16px]">{alluser.user_name}</td>
                  <td className="px-2 py-3 text-[16px]">
                    <a href={`mailto:${alluser.email}`}className="text-[#2D579A] underline">{alluser.email}</a>
                  </td>
                  <td className="px-36 py-3 text-[16px]">{alluser.role}</td>
                  <td className="px-4 py-3 text-[16px]">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-[#EF2B2E] text-white px-4 py-1 rounded-md hover:bg-[#FB6365] text-[10px] cursor-pointer"
                    >
                      Delete
                    </button>
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
