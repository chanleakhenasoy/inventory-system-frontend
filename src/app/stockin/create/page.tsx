"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Calendar, Plus } from "lucide-react";
import Button from "@/app/components/button";
import BackButton from "@/app/components/backButton";

interface Supplier {
  id: string;
  supplier_name: string;
}
interface Product {
  id: string;
  name_en: string;
}

export default function AddNewStock() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState<
  Array<{
      product: string;
      quantity: string;
      expireDate: string;
      totalPrice: string;
    }>
  >([]);
  const [formData, setFormData] = useState({
    purchaseDate: "",
    supplier: "",
    referenceNumber: "",
    dueDate: "",
    selectedItems: "",
    quantity: "",
    unitPrice: "",
    expireDate: "",
  });

  console.log(suppliers)
  console.log(products)
  console.log(items);


  useEffect(() => {
    const fetchSuppliers = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/supplier/getAll`,
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
          setSuppliers(result.data); // Adjust according to your API response structure
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

    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/getAll`,
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
          setProducts(result.data); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch product.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  fetchSuppliers();
  }, []);

  

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  function handleSave(): void {
    throw new Error("Function not implemented.");
  }
  const handleAddItem = (): void => {
    if (formData.selectedItems && formData.quantity) {
      const totalPrice = Number(formData.quantity) * Number(formData.unitPrice || 0);

      const newItems = [
        ...items,
        {
          product: formData.selectedItems,
          quantity: formData.quantity,
          expireDate: formData.expireDate,
          totalPrice: totalPrice.toFixed(2),
        },
      ];

      setItems(newItems);
      console.log(newItems);
    }
  };
  

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="mt-4.5 mr-4">
          <BackButton />
        </div>
        <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
          Add New Stock
        </h1>
      </div>

      <div className="bg-white  rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Purchase Date */}
          <div className="relative">
            <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Invoice</p>
            <label className="block text-[#2D579A] mb-2">Purchase Date</label>

            <div className="relative">
              {/* Main date input */}
              <input
                type="Date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0"
              />

              {/* Custom calendar icon */}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Transparent clickable input to trigger calendar, bound to same state */}
              <input
                type="Date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Supplier */}
          <div className="relative mt-11.5">
            <label className="block text-[#2D579A] mb-2">Supplier</label>

            <select
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
             
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.supplier_name} >
                  {supplier.supplier_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 mt-8 flex items-center">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

          </div>

          {/* Reference number */}
          <div>
            <label className="block text-[#2D579A] mb-2">
              Reference Number
            </label>
            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Due Date */}
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Due Date</label>

            <div className="relative">
              {/* Main date input */}
              <input
                type="Date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0"
              />

              {/* Custom calendar icon */}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Transparent clickable input to trigger calendar, bound to same state */}
              <input
                type="Date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Select Items */}
          <div className="relative mt-8">
            <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Product</p>
            <label className="block text-[#2D579A] mb-2">Select Product</label>

            <select
          name="selectedItems"
          value={formData.selectedItems}
          onChange={handleChange}
          className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
        >
          
          {products.map((product) => (
            <option key={product.id} value={product.name_en}>
              {product.name_en}
            </option>
          ))}
        </select>

            {/* Custom dropdown icon */}
            <div className="pointer-events-none absolute inset-y-0 right-3 mt-19 flex items-center">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-19.5">
            <label className="block text-[#2D579A] mb-2">Quantity</label>
            <input
              type="number"
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
              placeholder="$"
              value={formData.unitPrice}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Expire Date */}
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Expire Date</label>

            <div className="relative">
              {/* Main date input */}
              <input
                type="Date"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0"
              />

              {/* Custom calendar icon */}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Transparent clickable input to trigger calendar, bound to same state */}
              <input
                type="Date"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
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
        <div className="bg-white rounded-lg p-6">
        <table className="w-full text-black border border-gray-300 rounded-lg mb-6 mt-16">
          <thead className="bg-gray-50 text-[#2D579A]">
            <tr>
              <th className="p-3 border-b border-gray-300">Product</th>
              <th className="p-3 border-b border-gray-300">Quantity</th>
              <th className="p-3 border-b border-gray-300">Expire Date</th>
              <th className="p-3 border-b border-gray-300">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.product}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.expireDate}</td>
                  <td className="p-3">{item.totalPrice}$</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">No items added yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

          {/* {items.length === 0 && (
            <div className="p-3 text-gray-500 text-center">
              No items added yet
            </div>
          )}
        </div> */}

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} label="Create" variant="create" />
        </div>
      </div>
    </div>
  );
}
