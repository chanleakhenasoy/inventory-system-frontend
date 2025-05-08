"use client"

import Button from "@/app/components/button"
import type React from "react"

import { useState } from "react"


export default function CategoryDetail() {
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

  

    function handleSave(): void {
        throw new Error("Function not implemented.")
    }

  return (
    
      <div className="p-6">
        <h1 className="text-[30px] font-bold text-[#2D579A] mb-6">Create New Product</h1>

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
            <Button onClick={handleSave} label="Save" variant="save" />
             
            </div>
          </div>
        </div>
      </div>
  
  )
}
