"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SupplierDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? String(params.id) : "";
  const [formData, setFormData] = useState<{
    supplier_name?: string;
    phone_number?: string;
    address?: string;
    company_name?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchSupplierById(id);
    }
  }, [id]);

  const fetchSupplierById = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/supplier/${id}`,
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
        console.log("Fetched supplier data:", result);
        setFormData(result.data);
      } else {
        console.error("Failed to fetch supplier");
      }
    } catch (error) {
      console.error("Error fetching supplier:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/supplier/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Supplier updated successfully!");
        router.push("/suppliers");
      } else {
        alert("Failed to update supplier");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this supplier?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/supplier/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        router.push("/suppliers");
      } else {
        alert("Failed to delete supplier");
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div className="p-6 mt-25">
      <div className="flex items-center mb-4">
        <div className="mt-4.5 mr-4">
          <BackButton />
        </div>
        <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
          Supplier Detail
        </h1>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-[#2D579A] mb-2">Supplier Name</label>
            <input
              type="text"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6 ">
            <Button onClick={handleDelete} label="Delete" variant="delete" />
            <Button onClick={handleUpdate} label="Update" variant="update" />
          </div>
        </div>
      </div>
    </div>
  );
}
