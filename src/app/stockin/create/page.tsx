"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Plus } from "lucide-react"
import Button from "@/app/components/button"


export default function AddNewStock() {
  const [items, setItems] = useState<
    Array<{
      product: string
      quantity: string
      expireDate: string
      totalPrice: string
    }>
  >([])

  const [formData, setFormData] = useState({
    purchaseDate: "",
    supplier: "",
    selectedItems: "",
    quantity: "",
    unitPrice: "",
    expireDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddItem = () => {
    if (formData.selectedItems && formData.quantity) {
      const totalPrice = Number.parseFloat(formData.quantity) * (Number.parseFloat(formData.unitPrice) || 0)

      setItems([
        ...items,
        {
          product: formData.selectedItems,
          quantity: formData.quantity,
          expireDate: formData.expireDate,
          totalPrice: totalPrice.toFixed(2),
        },
      ])

      // Reset form fields except purchase date and supplier
      setFormData((prev) => ({
        ...prev,
        selectedItems: "",
        quantity: "",
        unitPrice: "",
        expireDate: "",
      }))
    }
  }

  function handleSave(): void {
    throw new Error("Function not implemented.")
  }

  return (
    
      <div className="p-6">
        <h1 className="text-[30px] font-bold text-[#2D579A] mb-12">Add New Stock</h1>

        <div className="bg-white  rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Purchase Date */}
            <div>
              <label className="block text-[#2D579A] mb-2">Purchase Date</label>
              <div className="relative">
                <input
                  type="text"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>

            {/* Supplier */}
            <div>
              <label className="block text-[#2D579A] mb-2">Supplier</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Select Items */}
            <div>
              <label className="block text-[#2D579A] mb-2">select Items</label>
              <input
                type="text"
                name="selectedItems"
                value={formData.selectedItems}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-[#2D579A] mb-2">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Unit Price */}
            <div className="">
              <label className="block text-[#2D579A] mb-2">Unit Price</label>
              <input
                type="text"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Expire Date */}
            <div>
              <label className="block text-[#2D579A] mb-2">Expire Date</label>
              <input
                type="text"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Add Button */}
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={handleAddItem}
              className="px-15 py-1.5 text-[15px] bg-[#2D579A] text-white rounded-lg hover:bg-[#6499EF] transition-colors flex items-center"
            >
              <Plus size={18} className="mr-1" /> Add
            </button>
          </div>

          {/* Items Table */}
          <div className="text-black border-gray-300 border rounded-lg mb-6 overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 p-3 border-b border-gray-300 text-[#2D579A]">
              <div className="font-medium">Product</div>
              <div className="font-medium">Quantity</div>
              <div className="font-medium">Expire Date</div>
              <div className="font-medium">Total Price</div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 p-3 border-b">
                <div>{item.product}</div>
                <div>{item.quantity}</div>
                <div>{item.expireDate}</div>
                <div>{item.totalPrice}</div>
              </div>
            ))}

            {items.length === 0 && <div className="p-3 text-gray-500 text-center">No items added yet</div>}
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
          <Button onClick={handleSave} label="Save" variant="save" />
          </div>
        </div>
      </div>
   
  )
}
