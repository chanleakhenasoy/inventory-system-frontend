"use client"

import Button from "@/app/components/button"
import type React from "react"
import BackButton from "@/app/components/backButton"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function CategoryDetail() {
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  })
  console.log(formData)

   const [loading, setLoading] = useState(false);
   const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSave = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          router.push("/category"); 
        } else {
          const errorData = await response.json();
          alert(`Failed to create category: ${errorData.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error creating category:", error);
      } finally {
        setLoading(false);
      }
    };
  return (
    
      <div className="p-6 mt-25">
        <div className="flex items-center mb-4">
                  <div className="mt-4.5 mr-4">
                  <BackButton />
                  </div>
                  <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
                    Create New Category
                  </h1>
                </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-[#2D579A] mb-2">Category Name</label>
              <input
                type="text"
                name="category_name"
                value={formData.category_name}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[#2D579A] mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleSave} label="Create" variant="create" />
            </div>
          </div>
        </div>
      </div>
  
  )
}
