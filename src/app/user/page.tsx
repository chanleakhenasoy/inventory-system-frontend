"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import { useParams, useRouter } from "next/navigation";
import BackButton from "@/app/components/backButton";

interface User {
  user_name: string;
  email: string;
  role: string;
}

export default function AllUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUser, setAllUser] = useState<User[]>([]);
  const totalPages = 10;
  const router = useRouter();
  const id = useParams();

  console.log(allUser);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/getAll`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
            },
            }
      );
      if (!response.ok) throw new Error("Failed to fetch users");

      const result = await response.json();
      setAllUser(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (index: number) => {
    if (!window.confirm("Are you sure you want to dissable this user?")) return;
    const updatedUsers = [...allUser];
    updatedUsers.splice(index, 1);
    setAllUser(updatedUsers);
    console.log("Deleted user at index:", index);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/auth/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Deleted user with id: ${id}`);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const itemsPerPage = 10;
  const displayedUsers = Array.isArray(allUser)
    ? allUser.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 w-full sm:w-[50%] mt-4">
          <SearchBar />
        </div>

        <div className="flex items-center mb-4">
          <div className="mt-4.5 mr-4">
            <BackButton />
          </div>
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            All User
          </h1>
        </div>

        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
              <th className="px-24 py-3 font-semibold text-[18px]">
                  No
                </th>
                <th className="px-24 py-3 font-semibold text-[18px]">
                  User Name
                </th>
                <th className="px-18 py-3 font-semibold text-[18px]">Email</th>
                <th className="px-36 py-3 font-semibold text-[18px]">Role</th>
                <th className="px-4 py-3 font-semibold text-[18px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#2D579A]">
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-[#F3F3F3] h-[55px]">
                    <td className="px-24 py-3 text-[16px]">  {(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-24 py-3 text-[16px]">{user.user_name}</td>
                    <td className="px-2 py-3 text-[16px]">
                      <a
                        href={`mailto:${user.email}`}
                        className="text-[#2D579A] underline"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="px-36 py-3 text-[16px]">{user.role}</td>
                    <td className="px-4 py-3 text-[16px]">
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-[#EF2B2E] text-white px-4 py-1 rounded-md hover:bg-[#FB6365] text-[10px]"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
