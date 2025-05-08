"use client"

import Button from "@/app/components/button"
import type React from "react"

import { useState } from "react"


export default function ProductDetail() {
  const [formData, setFormData] = useState({
    productCode: "Mararika",
    nameEn: "Mararika",
    nameKh: "Mararika",
    imgUrl: "Mararika",
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

  return (
    
      <div className="p-6">
        <h1 className="text-[30px] font-bold text-[#2D579A] mb-12">Product Detail</h1>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            {/* Category Name */}
            <div>
              <label className="block text-[#2D579A] mb-2">Product Code</label>
              <input
                type="text"
                name="supplierName"
                value={formData.productCode}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#2D579A] mb-2">Name En</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.nameEn}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[#2D579A] mb-2">Name Kh</label>
              <input
                type="text"
                name="address"
                value={formData.nameKh}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[#2D579A] mb-2">Image Url</label>
              <input
                type="text"
                name="companyName"
                value={formData.imgUrl}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
                <Button onClick={handleDelete} label="Delete" variant="delete" />
                <Button onClick={handleUpdate} label="Update" variant="update" />
              </div>
          </div>
        </div>
      </div>
  
  )
}
