"use client"

import Button from "@/app/components/button"
import type React from "react"
import BackButton from "@/app/components/backButton"
import { useState } from "react"
import router from "next/router"


export default function CategoryDetail() {
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  })

   const [loading, setLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSave = async () => {
      setLoading(true);
  
      try {
        const response = await fetch("http://localhost:3001/api/category/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Supplier created successfully!");
          router.push("/suppliers"); // Redirect to the supplier list
        } else {
          const errorData = await response.json();
          alert(`Failed to create supplier: ${errorData.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error creating supplier:", error);
        alert("An error occurred while creating the supplier.");
      } finally {
        setLoading(false);
      }
    };
  return (
    
      <div className="p-6">
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
            {/* Category Name */}
            <div>
              <label className="block text-[#2D579A] mb-2">Category Name</label>
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleSave} label="Save" variant="save" />
             
            </div>
          </div>
        </div>
      </div>
  
  )
}
