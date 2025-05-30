"use client";

import { useState, useEffect } from "react";
import Pagination from "@/app/components/pagination";
import { useParams, useRouter } from "next/navigation";
import BackButton from "@/app/components/backButton";

interface User {
  user_name: string;
  email: string;
  role: string;
  id?: string;
}

export default function AllUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]); 
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(""); 
  const router = useRouter();
  const { id } = useParams();

  const itemsPerPage = 10;
  useEffect(() => {
    fetchUsers(currentPage, appliedSearchTerm);
  }, [currentPage, appliedSearchTerm]);

  const fetchUsers = async (page: number, search: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/auth/getAll?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        const newUsers = result.data || [];
        setAllUsers((prev) => (page === 1 ? newUsers : [...prev, ...newUsers])); 
        setFilteredUsers(newUsers); 
        setTotalPages(Math.ceil((result.total || result.data.length) / itemsPerPage));
      } else {
        setError(result.message || "Failed to fetch users.");
        setAllUsers([]);
        setFilteredUsers([]);
        setTotalPages(1);
      }
    } catch (error) {
      setError("Network error. Please try again.");
      setAllUsers([]);
      setFilteredUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = allUsers.filter((user) =>
      user.user_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    setAppliedSearchTerm(searchTerm); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (index: number, userId?: string) => {
    if (!userId) return; 
    if (!window.confirm("Are you sure you want to disable this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/auth/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setAllUsers((prev) => prev.filter((user) => user.id !== userId));
        setFilteredUsers((prev) => prev.filter((user) => user.id !== userId));
      } else {
        const result = await response.json();
        setError(result.message || "Failed to delete user.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

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
                  xmlns="http://www.w3.org/2000/svg"
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
                placeholder="Search by Username..."
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
        <div className="flex items-center mb-4">
          <div className="mt-4.5 mr-4">
            <BackButton />
          </div>
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            All Users
          </h1>
        </div>

        {loading && <p className="text-center mt-10">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-center">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold text-[18px]">No</th>
                <th className="px-24 py-3 font-semibold text-[18px]">User Name</th>
                <th className="px-4 py-3 font-semibold text-[18px]">Email</th>
                <th className="px-30 py-3 font-semibold text-[18px]">Role</th>
                <th className="px-4 py-3 font-semibold text-[18px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#2D579A]">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id ?? index} className="hover:bg-[#F3F3F3] h-[55px]">
                    <td className="px-6 py-3 text-[16px]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-3 text-[16px]">{user.user_name}</td>
                    <td className="px-6 py-3 text-[16px]">
                      <a
                        href={`mailto:${user.email}`}
                        className="text-[#2D579A] underline"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="px-6 py-3 text-[16px]">{user.role}</td>
                    <td className="px-4 py-3 text-[16px]">
                      <button
                        onClick={() => handleDelete(index, user.id)}
                        className="bg-[#EF2B2E] text-white px-4 py-1 rounded-md hover:bg-[#FB6365] text-[10px] cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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