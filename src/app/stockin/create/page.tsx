"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Calendar, Plus, Router } from "lucide-react";
import Button from "@/app/components/button";
import BackButton from "@/app/components/backButton";
import { useRouter } from "next/navigation";

interface Supplier {
  id: string;
  supplier_name: string;
}
interface Product {
  supplier_name: string;
  id: string;
  name_en: string;
}

export default function AddNewStock() {
  const route = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState<
    Array<{
      product: string;
      product_id: string;
      quantity: string;
      expire_date: string;
      total_price: string;
    }>
  >([]);
  const [formData, setFormData] = useState({
    selectedProductId: "",
    purchase_date: "",
    selectedSupplierId: "",
    reference_number: "",
    due_date: "",
    quantity: "",
    unit_price: "",
    expire_date: "",
    name_en: "",
    supplier_name: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/supplier/getAll`,
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
          setSuppliers(result.data);
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/getAll`,
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
  const createStockin = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stockIn/create/${formData.selectedSupplierId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            purchase_date: formData.purchase_date,
            reference_number: formData.reference_number,
            due_date: formData.due_date,
            items: items.map((item) => ({
              product_id: item.product_id,
              quantity: Number(item.quantity),
              unit_price: Number(item.total_price) / Number(item.quantity),
              expire_date: item.expire_date,
              total_price: Number(item.total_price),
            })),
          }),
        }
      );

      if (response.ok) {
        setFormData({
          selectedProductId: "",
          purchase_date: "",
          selectedSupplierId: "",
          reference_number: "",
          due_date: "",
          quantity: "",
          unit_price: "",
          expire_date: "",
          name_en: "",
          supplier_name: "",
        });
        setItems([]);
        route.push("/stockin");
      } else {
        const errData = await response.json();
        setError(errData.message || "Failed to create stock.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleAddItem = (): void => {
    if (formData.selectedProductId && formData.quantity) {
      const totalPrice =
        Number(formData.quantity) * Number(formData.unit_price || 0);

      const newItems = [
        ...items,
        {
          product: formData.name_en,
          product_id: formData.selectedProductId,
          quantity: formData.quantity,
          expire_date: formData.expire_date,
          total_price: totalPrice.toFixed(2),
        },
      ];

      setItems(newItems);
    }

    setFormData((prev) => ({
      ...prev,
      selectedProductId: "",
      quantity: "",
      unit_price: "",
      expire_date: "",
    }));
  };

  return (
    <div className="p-6 mt-25">
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
              <input
                type="Date"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
               [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
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
              <input
                type="Date"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="relative mt-11.5">
            <label className="block text-[#2D579A] mb-2">Supplier</label>

            <select
              name="selectedSupplierId"
              value={formData.selectedSupplierId}
              onChange={(e) => {
                const selectedSupplier = suppliers.find(
                  (s) => s.id === e.target.value
                );
                setFormData((prev) => ({
                  ...prev,
                  supplier_name: selectedSupplier
                    ? selectedSupplier.supplier_name
                    : "",
                  selectedSupplierId: selectedSupplier
                    ? selectedSupplier.id
                    : "",
                }));
              }}
              className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
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
          <div>
            <label className="block text-[#2D579A] mb-2">
              Reference Number
            </label>
            <input
              type="text"
              name="reference_number"
              value={formData.reference_number}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Due Date</label>

            <div className="relative">
              <input
                type="Date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
              />
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
              <input
                type="Date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="relative mt-8">
            <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Item</p>
            <label className="block text-[#2D579A] mb-2">Product</label>

            <select
              name="selectedProductId"
              value={formData.selectedProductId}
              onChange={(e) => {
                const selectedProduct = products.find(
                  (p) => p.id === e.target.value
                );
                setFormData((prev) => ({
                  ...prev,
                  name_en: selectedProduct ? selectedProduct.name_en : "",
                  selectedProductId: selectedProduct ? selectedProduct.id : "",
                }));
              }}
              className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name_en}
                </option>
              ))}
            </select>
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
          <div className="mt-19.5">
            <label className="block text-[#2D579A] mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            />
          </div>
          <div className="">
            <label className="block text-[#2D579A] mb-2">Unit Price</label>
            <input
              type="text"
              name="unit_price"
              placeholder="$"
              value={formData.unit_price}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Expire Date</label>

            <div className="relative">
              <input
                type="Date"
                name="expire_date"
                value={formData.expire_date}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0"
              />

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
              <input
                type="Date"
                name="expire_date"
                value={formData.expire_date}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={handleAddItem}
            className="px-15 py-1.5 text-[15px] bg-[#2D579A] text-white rounded-lg hover:bg-[#6499EF] transition-colors flex items-center cursor-pointer"
          >
            <Plus size={18} className="mr-1" /> Add
          </button>
        </div>
        <div className="bg-white rounded-lg p-6">
          <table className="w-full text-black border border-gray-300 rounded-lg mb-6 mt-16 table-auto">
            <thead className="bg-gray-50 text-[#2D579A]">
              <tr>
                <th className="p-3 border-b border-gray-300 text-center">
                  Product
                </th>
                <th className="p-3 border-b border-gray-300 text-center">
                  Quantity
                </th>
                <th className="p-3 border-b border-gray-300 text-center">
                  Expire Date
                </th>
                <th className="p-3 border-b border-gray-300 text-center">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-3 text-center">{item.product}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-center">{item.expire_date}</td>
                    <td className="p-3 text-center">{item.total_price}$</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-3 text-center text-gray-500">
                    No items added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <Button onClick={createStockin} label="Create" variant="create" />
        </div>
      </div>
    </div>
  );
}
