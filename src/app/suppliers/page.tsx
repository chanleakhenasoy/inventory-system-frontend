// "use client";

// import { useState } from "react";
// import SearchBar from "@/app/components/search";
// import Pagination from "@/app/components/pagination";
// import Button from "../components/button";
// import { useRouter } from "next/navigation";

// export default function Supplier() {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 10;

//   const suppliers = Array(10).fill({
//     id: "001",
//     name: "2437658765",
//     phone: "2437658765",
//     address: "Football",
//     company: "Football",
//     createdAt: "2025-09-23",
//     updatedAt: "2025-09-23",
//   });

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleClickToSupplierCreate = () => {
//     router.push("/suppliers/create"); // Replace with your route
//   };

//   const handleClickToSupplierId = () => {
//     router.push("/suppliers/[id]"); // Replace with your route
//   };

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       <main className="flex-1 overflow-y-auto p-6">
//         {/* Search Bar */}
//         <div className="mb-4 w-full sm:w-[50%]">
//           <SearchBar />
//         </div>

//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Supplier</h1>
//           <Button onClick={handleClickToSupplierCreate} label="Create" />
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded-md mt-10">
//           <table className="min-w-full text-left">
//             <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
//               <tr>
//                 <th className="px-6 py-3 font-semibold">ID</th>
//                 <th className="px-8 py-3 font-semibold text-[18px]">
//                   Supplier Name
//                 </th>
//                 <th className="px-4 py-3 font-semibold text-[18px]">
//                   Phone Number
//                 </th>
//                 <th className="px-10 py-3 font-semibold text-[18px]">
//                     Address
//                     </th>
//                 <th className="px-4 py-3 font-semibold text-[18px]">
//                   Company Name
//                 </th>
//                 <th className="px-10 py-3 font-semibold text-[18px]">
//                   Create At
//                 </th>
//                 <th className="px-2 py-3 font-semibold text-[18px]">
//                   Update At
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-[#2B5190]">
//               {suppliers.map((supplier, index) => (
//                 <tr key={index} className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
//                 onClick={handleClickToSupplierId}>
//                   <td className="px-5 py-3 text-[16px]">{supplier.id}</td>
//                   <td className="px-8 py-3 text-[16px]">{supplier.name}</td>
//                   <td className="px-4 py-3 text-[16px]">{supplier.phone}</td>
//                   <td className="px-10 py-3 text-[16px]">{supplier.address}</td>
//                   <td className="px-4 py-3 text-[16px]">{supplier.company}</td>
//                   <td className="px-10 py-3 cursor-pointer text-[16px]">
//                     {supplier.createdAt}
//                   </td>
//                   <td className="px-3 py-3 text-[16px]">
//                     {supplier.updatedAt}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-end items-center mt-4 space-x-2">
//           <Pagination
//             totalPages={totalPages}
//             initialPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import Button from "../components/button";
import { useRouter } from "next/navigation";

export default function Supplier() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("suppliers", suppliers);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/supplier/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setSuppliers(data.suppliers); // Adjust according to your API response structure
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch suppliers.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSuppliers();
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickToSupplierCreate = () => {
    router.push("/suppliers/create");
  };

  const handleClickToSupplierId = (id: string) => {
    router.push(`/suppliers/${id}`);
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
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Supplier</h1>
          <Button onClick={handleClickToSupplierCreate} label="Create" />
        </div>

        {/* Loading and Error */}
        {loading && <p>Loading suppliers...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-4">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-8 py-3 font-semibold text-[18px]">Supplier Name</th>
                <th className="px-4 py-3 font-semibold text-[18px]">Phone Number</th>
                <th className="px-10 py-3 font-semibold text-[18px]">Address</th>
                <th className="px-4 py-3 font-semibold text-[18px]">Company Name</th>
                <th className="px-10 py-3 font-semibold text-[18px]">Create At</th>
                <th className="px-2 py-3 font-semibold text-[18px]">Update At</th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
  {suppliers && suppliers.length > 0 ? (
    suppliers.map((supplier) => (
      <tr
        key={supplier.id}
        className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
        onClick={() => handleClickToSupplierId(supplier.id)}
      >
        <td className="px-5 py-3 text-[16px]">{supplier.id}</td>
        <td className="px-8 py-3 text-[16px]">{supplier.supplier_name}</td>
        <td className="px-4 py-3 text-[16px]">{supplier.phone_number}</td>
        <td className="px-10 py-3 text-[16px]">{supplier.address}</td>
        <td className="px-4 py-3 text-[16px]">{supplier.company_name}</td>
        <td className="px-10 py-3 text-[16px]">{supplier.created_at}</td>
        <td className="px-3 py-3 text-[16px]">{supplier.updated_at}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="text-center py-4 text-gray-500">
        No suppliers found.
      </td>
    </tr>
  )}
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


