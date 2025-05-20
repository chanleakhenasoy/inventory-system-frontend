"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import Button from "@/app/components/button";
import BackButton from "@/app/components/backButton";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


interface Supplier {
  id: string;
  supplier_name: string;
}
interface Product {
  supplier_name: string;
  id: string;
  name_en: string;
}

interface Items {
  quantity: string;
  id: string;
  e: string;
}

export default function StockInDetail() {
  const route = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stockins, setStockIn] = useState<Items>()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  console.log('params:', params);
  console.log('stockinssss:', stockins);
  

  const { id } = params;

  const [formData, setFormData] = useState({
    invoice_id: "",
    selectedSupplierId: "",
    supplier_name: "",
    reference_number: "",
    purchase_date: "",
    due_date: "",
    selectedProductId: "",
    name_en: "",
    items: [] as Array<{
      id: string;
      product_id: string;
      quantity: string;
      unit_price: string;
      expire_date: string;
      total_price?: string;
    }>,
  });

  console.log('item:', formData);
  
  

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

    const fetchStockin = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/getAll`,
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
          const data = result.data;
          setStockIn(data);
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
    fetchStockin();
  
  }, []);

 

  useEffect(() => {
    const fetchInvoiceItem = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/items/${id}`,
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
          const data = result.data;
          console.log("=====>", data)
        
  
        setFormData(data);
      }
         else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch product.");
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    
      fetchInvoiceItem();
    
  }, []);
  
  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleUpdate = () => {
    console.log("Update button clicked");
  };

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

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Content */}
       
          <div className="flex items-center mb-4">
            <div className="mt-4.5 mr-4">
              <BackButton />
            </div>
            <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
              Stock In Detail
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
                name="purchase_date"
                value={formData.purchase_date}
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
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Supplier */}
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

          {/* Reference number */}
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

          {/* Due Date */}
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Due Date</label>

            <div className="relative">
              {/* Main date input */}
              <input
                type="Date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
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
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Select Items */}
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
              value={formData.items[0]?.quantity}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* Unit Price */}
          <div className="">
            <label className="block text-[#2D579A] mb-2">Unit Price</label>
            <input
              type="text"
              name="unit_price"
              placeholder="$"
              value={formData.items[0]?.unit_price || ""}
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
                name="expire_date"
                value={formData.items[0]?.expire_date || ""}
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
                name="expire_date"
                value={formData.items[0]?.expire_date || ""}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 h-8.5 mt-9">
                <Button
                  onClick={handleDelete}
                  label="Delete"
                  variant="delete"
                />
                <Button
                  onClick={handleUpdate}
                  label="Update"
                  variant="update"
                />
              </div>
            </div>
          </div>
       
      </div>
  );
}
