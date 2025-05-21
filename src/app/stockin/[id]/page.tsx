"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BackButton from "@/app/components/backButton";
import Button from "@/app/components/button";

interface Supplier {
  id: string;
  supplier_name: string;
}

interface Product {
  id: string;
  name_en: string;
  name_kh: string;
}

interface StockInItem {
  item_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  expire_date: string;
}

interface FormData {
  invoice_id: string;
  selectedSupplierId: string;
  supplier_name: string;
  reference_number: string;
  purchase_date: string;
  due_date: string;
  items: StockInItem[];
  selectedItem?: {
    item_id: string;
    selectedProductId: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    expire_date: string;
  };
}

export default function StockInDetail() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = typeof params.id === "string" ? params.id : "";
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormData>({
    invoice_id: "",
    selectedSupplierId: "",
    supplier_name: "",
    reference_number: "",
    purchase_date: "",
    due_date: "",
    items: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        setError("Network error while fetching suppliers.");
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
          setError(errorData.message || "Failed to fetch products.");
        }
      } catch (err) {
        setError("Network error while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    const fetchStockinByInvoiceId = async (invoiceId: string) => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${invoiceId}`,
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
          const supplier = suppliers.find((s) => s.id === data.supplier_id);
          setFormData((prev) => ({
            ...prev,
            invoice_id: data.invoice_id || "",
            selectedSupplierId: data.supplier_id || "",
            supplier_name: supplier ? supplier.supplier_name : "",
            reference_number: data.reference_number || "",
            purchase_date: data.purchase_date || "",
            due_date: data.due_date || "",
            items: data.items || [],
          }));
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch invoice.");
        }
      } catch (err) {
        setError("Network error while fetching invoice.");
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchSuppliers(), fetchProducts()]);
      if (invoiceId) {
        await fetchStockinByInvoiceId(invoiceId);
      }
    };

    fetchData();
  }, [invoiceId]);

  const handleClickToStockinId = (itemId: string) => {
    const item = formData.items.find((i) => i.item_id === itemId);
    if (item) {
      const product = products.find((p) => p.id === item.product_id);
      setFormData((prev) => ({
        ...prev,
        selectedItem: {
          item_id: item.item_id,
          selectedProductId: item.product_id,
          product_name: product ? product.name_en : "N/A",
          quantity: item.quantity,
          unit_price: item.unit_price,
          expire_date: item.expire_date || "",
        },
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "selectedSupplierId") {
      const selectedSupplier = suppliers.find((s) => s.id === value);
      setFormData((prev) => ({
        ...prev,
        selectedSupplierId: value,
        supplier_name: selectedSupplier?.supplier_name || "",
      }));
    } else if (
      name === "selectedProductId" ||
      name === "quantity" ||
      name === "unit_price" ||
      name === "expire_date"
    ) {
      setFormData((prev) => ({
        ...prev,
        selectedItem: {
          ...prev.selectedItem!,
          [name]: name === "selectedProductId"
            ? value
            : name === "quantity" || name === "unit_price"
            ? Number(value)
            : value,
          product_name:
            name === "selectedProductId"
              ? products.find((p) => p.id === value)?.name_en || "N/A"
              : prev.selectedItem?.product_name || "",
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  const handleUpdateItem = async () => {
    if (!formData.selectedItem) return;
    const token = localStorage.getItem("token");
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${formData.selectedItem.item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: formData.selectedItem.selectedProductId,
            quantity: formData.selectedItem.quantity,
            unit_price: formData.selectedItem.unit_price,
            expire_date: formData.selectedItem.expire_date,
          }),
        }
      );
      if (response.ok) {
        alert("Item updated successfully!");
        // Refresh invoice data to reflect updated item
        const fetchResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${invoiceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (fetchResponse.ok) {
          const result = await fetchResponse.json();
          const data = result.data;
          const supplier = suppliers.find((s) => s.id === data.supplier_id);
          setFormData((prev) => ({
            ...prev,
            invoice_id: data.invoice_id || "",
            selectedSupplierId: data.supplier_id || "",
            supplier_name: supplier ? supplier.supplier_name : "",
            reference_number: data.reference_number || "",
            purchase_date: data.purchase_date || "",
            due_date: data.due_date || "",
            items: data.items || [],
            selectedItem: undefined, // Clear selected item after update
          }));
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update item.");
      }
    } catch (err) {
      setError("Network error while updating item.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelItemEdit = () => {
    setFormData((prev) => ({
      ...prev,
      selectedItem: undefined,
    }));
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center mb-4">
        <div className="mt-4.5 mr-4">
          <BackButton />
        </div>
        <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
          Stock In Detail
        </h1>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-[#2D579A] mb-4">Loading...</div>}

      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Invoice</p>
            <label className="block text-[#2D579A] mb-2">Purchase Date</label>
            <div className="relative">
              <input
                type="date"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="relative mt-11.5">
            <label className="block text-[#2D579A] mb-2">Supplier</label>
            <select
              name="selectedSupplierId"
              value={formData.selectedSupplierId}
              onChange={handleChange}
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
            <label className="block text-[#2D579A] mb-2">Reference Number</label>
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
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8">
          <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Items</p>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left border">
              <thead className="bg-[#EEF1F7] text-[#2D579A]">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Expire Date</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr
                    key={item.item_id}
                    className={`hover:bg-gray-100 cursor-pointer ${formData.selectedItem?.item_id === item.item_id ? "bg-gray-200" : ""}`}
                    onClick={() => handleClickToStockinId(item.item_id)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {products.find((p) => p.id === item.product_id)?.name_en || "N/A"}
                    </td>
                    <td className="px-4 py-2">${item.unit_price}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">
                      {item.expire_date ? new Date(item.expire_date).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {formData.selectedItem && (
          <div className="relative mt-8">
            <p className="text-[#2D579A] mb-4 font-bold text-[20px]">
              Edit Item
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#2D579A] mb-2">Product</label>
               <select
                  name="selectedProductId"
                  value={formData.selectedItem.selectedProductId}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name_en} {product.name_kh ? `(${product.name_kh}) `: ""}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 mt-10 flex items-center">
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
                <label className="block text-[#2D579A] mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.selectedItem.quantity}
                  onChange={handleChange}
                  className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[#2D579A] mb-2">Unit Price</label>
                <input
                  type="number"
                  name="unit_price"
                  value={formData.selectedItem.unit_price}
                  onChange={handleChange}
                  className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[#2D579A] mb-2">Expire Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="expire_date"
                    value={formData.selectedItem.expire_date}
                    onChange={handleChange}
                    className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <Button
                label="Cancel"
                onClick={handleCancelItemEdit}
                
              />
              <Button
                label="Update Item"
                onClick={handleUpdateItem}
                variant="update"
              />
            </div>
          </div>
        )}

        {/* <div className="flex justify-end space-x-4 mt-6">
          <Button label="Delete Invoice" onClick={handleDelete} variant="delete" />
          <Button label="Update Invoice" onClick={handleUpdate} variant="update" />
        </div> */}
      </div>
    </div>
  );
}


