"use client"

import Button from "@/app/components/button"
import type React from "react"

import { useState } from "react"


export default function CategoryDetail() {
  const [formData, setFormData] = useState({
    supplierName: "",
    phoneNumber: "",
    address: "",
    companyName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = () => {
    console.log("Updating category:", formData)
    // Here you would typically send the data to your backend
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      console.log("Deleting category:", formData)
      // Here you would typically send a delete request to your backend
    }
  }

    function handleSave(): void {
        throw new Error("Function not implemented.")
    }

  return (
    
      <div className="p-6">
        <h1 className="text-[30px] font-bold text-[#2D579A] mb-12">Create New Supplier</h1>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            {/* Category Name */}
            <div>
              <label className="block text-[#2D579A] mb-2">Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#2D579A] mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
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
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 cursor-pointer">
            <Button onClick={handleSave} label="Save" variant="save" />
             
            </div>
          </div>
        </div>
      </div>
  
  )
}
