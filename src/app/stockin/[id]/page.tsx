// "use client";

// import { Calendar } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import BackButton from "@/app/components/backButton";
// import Button from "@/app/components/button";

// interface Supplier {
//   id: string;
//   supplier_name: string;
// }

// interface Product {
//   id: string;
//   name_en: string;
//   name_kh: string;
// }

// interface StockInItem {
//   item_id: string;
//   product_id: string;
//   quantity: number;
//   unit_price: number;
//   expire_date: string;
// }

// interface FormData {
//   invoice_id: string;
//   selectedSupplierId: string;
//   supplier_name: string;
//   reference_number: string;
//   purchase_date: string;
//   due_date: string;
//   items: StockInItem[];
//   selectedItem?: {
//     item_id: string;
//     selectedProductId: string;
//     product_name: string;
//     quantity: number;
//     unit_price: number;
//     expire_date: string;
//   };
// }

// export default function StockInDetail() {
//   const router = useRouter();
//   const params = useParams();
//   const invoiceId = typeof params.id === "string" ? params.id : "";
//   const [suppliers, setSuppliers] = useState<Supplier[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [formData, setFormData] = useState<FormData>({
//     invoice_id: "",
//     selectedSupplierId: "",
//     supplier_name: "",
//     reference_number: "",
//     purchase_date: "",
//     due_date: "",
//     items: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchSuppliers = async () => {
//       const token = localStorage.getItem("token");
//       setError("");
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/supplier/getAll`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.ok) {
//           const result = await response.json();
//           setSuppliers(result.data);
//         } else {
//           const errorData = await response.json();
//           setError(errorData.message || "Failed to fetch suppliers.");
//         }
//       } catch (err) {
//         setError("Network error while fetching suppliers.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchProducts = async () => {
//       const token = localStorage.getItem("token");
//       setError("");
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/getAll`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.ok) {
//           const result = await response.json();
//           setProducts(result.data);
//         } else {
//           const errorData = await response.json();
//           setError(errorData.message || "Failed to fetch products.");
//         }
//       } catch (err) {
//         setError("Network error while fetching products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchStockinByInvoiceId = async (invoiceId: string) => {
//       const token = localStorage.getItem("token");
//       setError("");
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${invoiceId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.ok) {
//           const result = await response.json();
//           const data = result.data;
//           const supplier = suppliers.find((s) => s.id === data.supplier_id);
//           setFormData((prev) => ({
//             ...prev,
//             invoice_id: data.invoice_id || "",
//             selectedSupplierId: data.supplier_id || "",
//             supplier_name: supplier ? supplier.supplier_name : "",
//             reference_number: data.reference_number || "",
//             purchase_date: data.purchase_date || "",
//             due_date: data.due_date || "",
//             items: data.items || [],
//           }));
//         } else {
//           const errorData = await response.json();
//           setError(errorData.message || "Failed to fetch invoice.");
//         }
//       } catch (err) {
//         setError("Network error while fetching invoice.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchData = async () => {
//       await Promise.all([fetchSuppliers(), fetchProducts()]);
//       if (invoiceId) {
//         await fetchStockinByInvoiceId(invoiceId);
//       }
//     };

//     fetchData();
//   }, [invoiceId]);

//   const handleClickToStockinId = (itemId: string) => {
//     const item = formData.items.find((i) => i.item_id === itemId);
//     if (item) {
//       const product = products.find((p) => p.id === item.product_id);
//       setFormData((prev) => ({
//         ...prev,
//         selectedItem: {
//           item_id: item.item_id,
//           selectedProductId: item.product_id,
//           product_name: product ? product.name_en : "N/A",
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//           expire_date: item.expire_date || "",
//         },
//       }));
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name === "selectedSupplierId") {
//       const selectedSupplier = suppliers.find((s) => s.id === value);
//       setFormData((prev) => ({
//         ...prev,
//         selectedSupplierId: value,
//         supplier_name: selectedSupplier?.supplier_name || "",
//       }));
//     } else if (
//       name === "selectedProductId" ||
//       name === "quantity" ||
//       name === "unit_price" ||
//       name === "expire_date"
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         selectedItem: {
//           ...prev.selectedItem!,
//           [name]: name === "selectedProductId"
//             ? value
//             : name === "quantity" || name === "unit_price"
//             ? Number(value)
//             : value,
//           product_name:
//             name === "selectedProductId"
//               ? products.find((p) => p.id === value)?.name_en || "N/A"
//               : prev.selectedItem?.product_name || "",
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleUpdateItem = async () => {
//     if (!formData.selectedItem) return;
//     const token = localStorage.getItem("token");
//     setError("");
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${formData.selectedItem.item_id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             product_id: formData.selectedItem.selectedProductId,
//             quantity: formData.selectedItem.quantity,
//             unit_price: formData.selectedItem.unit_price,
//             expire_date: formData.selectedItem.expire_date,
//           }),
//         }
//       );
//       if (response.ok) {
//         alert("Item updated successfully!");
//         // Refresh invoice data to reflect updated item
//         const fetchResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${invoiceId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (fetchResponse.ok) {
//           const result = await fetchResponse.json();
//           const data = result.data;
//           const supplier = suppliers.find((s) => s.id === data.supplier_id);
//           setFormData((prev) => ({
//             ...prev,
//             invoice_id: data.invoice_id || "",
//             selectedSupplierId: data.supplier_id || "",
//             supplier_name: supplier ? supplier.supplier_name : "",
//             reference_number: data.reference_number || "",
//             purchase_date: data.purchase_date || "",
//             due_date: data.due_date || "",
//             items: data.items || [],
//             selectedItem: undefined, // Clear selected item after update
//           }));
//         }
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Failed to update item.");
//       }
//     } catch (err) {
//       setError("Network error while updating item.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelItemEdit = () => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedItem: undefined,
//     }));
//   };

//   return (
//     <div className="flex-1 p-6">
//       <div className="flex items-center mb-4">
//         <div className="mt-4.5 mr-4">
//           <BackButton />
//         </div>
//         <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
//           Stock In Detail
//         </h1>
//       </div>

//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {loading && <div className="text-[#2D579A] mb-4">Loading...</div>}

//       <div className="bg-white rounded-lg p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="relative">
//             <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Invoice</p>
//             <label className="block text-[#2D579A] mb-2">Purchase Date</label>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="purchase_date"
//                 value={formData.purchase_date}
//                 onChange={handleChange}
//                 className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//               />
//               <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
//                 <Calendar className="w-5 h-5 text-gray-500" />
//               </div>
//             </div>
//           </div>

//           <div className="relative mt-11.5">
//             <label className="block text-[#2D579A] mb-2">Supplier</label>
//             <select
//               name="selectedSupplierId"
//               value={formData.selectedSupplierId}
//               onChange={handleChange}
//               className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
//             >
//               <option value="">Select a supplier</option>
//               {suppliers.map((supplier) => (
//                 <option key={supplier.id} value={supplier.id}>
//                   {supplier.supplier_name}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-3 mt-8 flex items-center">
//               <svg
//                 className="w-5 h-5 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   d="M19 9l-7 7-7-7"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div>
//             <label className="block text-[#2D579A] mb-2">Reference Number</label>
//             <input
//               type="text"
//               name="reference_number"
//               value={formData.reference_number}
//               onChange={handleChange}
//               className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-[#2D579A] mb-2">Due Date</label>
//             <div className="relative">
//               <input
//                 type="date"
//                 name="due_date"
//                 value={formData.due_date}
//                 onChange={handleChange}
//                 className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//               />
//               <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
//                 <Calendar className="w-5 h-5 text-gray-500" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="relative mt-8">
//           <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Items</p>
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto text-left border">
//               <thead className="bg-[#EEF1F7] text-[#2D579A]">
//                 <tr>
//                   <th className="px-4 py-2">No</th>
//                   <th className="px-4 py-2">Product Name</th>
//                   <th className="px-4 py-2">Unit Price</th>
//                   <th className="px-4 py-2">Quantity</th>
//                   <th className="px-4 py-2">Expire Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {formData.items.map((item, index) => (
//                   <tr
//                     key={item.item_id}
//                     className={`hover:bg-gray-100 cursor-pointer ${formData.selectedItem?.item_id === item.item_id ? "bg-gray-200" : ""}`}
//                     onClick={() => handleClickToStockinId(item.item_id)}
//                   >
//                     <td className="px-4 py-2">{index + 1}</td>
//                     <td className="px-4 py-2">
//                       {products.find((p) => p.id === item.product_id)?.name_en || "N/A"}
//                     </td>
//                     <td className="px-4 py-2">${item.unit_price}</td>
//                     <td className="px-4 py-2">{item.quantity}</td>
//                     <td className="px-4 py-2">
//                       {item.expire_date ? new Date(item.expire_date).toLocaleDateString() : "N/A"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {formData.selectedItem && (
//           <div className="relative mt-8">
//             <p className="text-[#2D579A] mb-4 font-bold text-[20px]">
//               Edit Item
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-[#2D579A] mb-2">Product</label>
//                <select
//                   name="selectedProductId"
//                   value={formData.selectedItem.selectedProductId}
//                   onChange={handleChange}
//                   className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
//                 >
//                   <option value="">Select a product</option>
//                   {products.map((product) => (
//                     <option key={product.id} value={product.id}>
//                       {product.name_en} {product.name_kh ? `(${product.name_kh}) `: ""}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-3 mt-10 flex items-center">
//                   <svg
//                     className="w-5 h-5 text-gray-500"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M19 9l-7 7-7-7"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-[#2D579A] mb-2">Quantity</label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={formData.selectedItem.quantity}
//                   onChange={handleChange}
//                   className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[#2D579A] mb-2">Unit Price</label>
//                 <input
//                   type="number"
//                   name="unit_price"
//                   value={formData.selectedItem.unit_price}
//                   onChange={handleChange}
//                   className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[#2D579A] mb-2">Expire Date</label>
//                 <div className="relative">
//                   <input
//                     type="date"
//                     name="expire_date"
//                     value={formData.selectedItem.expire_date}
//                     onChange={handleChange}
//                     className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                   />
//                   <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
//                     <Calendar className="w-5 h-5 text-gray-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-4 mt-4">
//               <Button
//                 label="Cancel"
//                 onClick={handleCancelItemEdit}

//               />
//               <Button
//                 label="Update Item"
//                 onClick={handleUpdateItem}
//                 variant="update"
//               />
//             </div>
//           </div>
//         )}

//         {/* <div className="flex justify-end space-x-4 mt-6">
//           <Button label="Delete Invoice" onClick={handleDelete} variant="delete" />
//           <Button label="Update Invoice" onClick={handleUpdate} variant="update" />
//         </div> */}
//       </div>
//     </div>
//   );
// }

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
  total_price: number;
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
    total_price: number;
  };
}

export default function StockInDetail() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = typeof params.id === "string" ? params.id : "";
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [formData, setFormData] = useState<FormData>({
    invoice_id: "",
    selectedSupplierId: "",
    supplier_name: "",
    reference_number: "",
    purchase_date: "",
    due_date: "",
    items: [],
  });

  const [selectedItem, setSelectedItem] = useState<
    | {
        invoice_stockin_id: any;
        supplier_id: any;
        reference_number: any;
        due_date: any;
        purchase_date: any;
        item_id: string;
        selectedProductId: string;
        product_name: string;
        quantity: number;
        unit_price: number;
        expire_date: string;
        total_price: number;
      }
    | undefined
  >(undefined);

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
          // Sanitize items to ensure unit_price and quantity are numbers
          const sanitizedItems = (data.items || []).map((item: any) => ({
            ...item,
            unit_price: Number(item.unit_price) || 0,
            quantity: Number(item.quantity) || 0,
            total_price:
              Number(item.total_price) ||
              Number(item.quantity) * Number(item.unit_price) ||
              0,
          }));
          setFormData((prev) => ({
            ...prev,
            invoice_id: data.invoice_id || "",
            selectedSupplierId: data.supplier_id || "",
            supplier_name: supplier ? supplier.supplier_name : "",
            reference_number: data.reference_number || "",
            purchase_date: data.purchase_date || "",
            due_date: data.due_date || "",
            items: sanitizedItems,
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
      setSelectedItem({
        item_id: item.item_id,
        selectedProductId: item.product_id,
        product_name: product?.name_en || "N/A",
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        total_price: Number(item.quantity) * Number(item.unit_price),
        expire_date: item.expire_date,
        purchase_date: formData.purchase_date,
        due_date: formData.due_date,
        reference_number: formData.reference_number,
        supplier_id: formData.selectedSupplierId,
        invoice_stockin_id: formData.invoice_id,
      });
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
          [name]:
            name === "selectedProductId"
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

  const handleSelectedItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!selectedItem) return;

    const updatedValue =
      name === "quantity" || name === "unit_price" || name === "total_price"
        ? Number(value) || 0
        : value;
    const updatedItem = {
      ...selectedItem,
      [name]: updatedValue,
      product_name:
        name === "selectedProductId"
          ? products.find((p) => p.id === value)?.name_en || "N/A"
          : selectedItem.product_name,
      total_price:
        name === "quantity" || name === "unit_price"
          ? (name === "quantity" ? Number(value) : selectedItem.quantity) *
            (name === "unit_price" ? Number(value) : selectedItem.unit_price)
          : selectedItem.total_price,
    };

    setSelectedItem(updatedItem);
  };

  //   setSelectedItem({
  //     ...selectedItem,
  //     [name]: updatedValue,
  //     product_name:
  //       name === "selectedProductId"
  //         ? products.find((p) => p.id === value)?.name_en || "N/A"
  //         : selectedItem.product_name,
  //   });
  // };

  const handleCancelItemEdit = () => setSelectedItem(undefined);

  const handleUpdateItem = async () => {
    if (
      !selectedItem ||
      !selectedItem.purchase_date ||
      !selectedItem.due_date ||
      !selectedItem.reference_number
    ) {
      setError("Please fill purchase date, due date, and reference number.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const updateData = {
        purchase_date: selectedItem.purchase_date,
        due_date: selectedItem.due_date,
        reference_number: selectedItem.reference_number,
        supplier_id: selectedItem.supplier_id,
        product_id: selectedItem.selectedProductId,
        quantity: Number(selectedItem.quantity),
        unit_price: Number(selectedItem.unit_price),
        total_price: Number(selectedItem.total_price),
        expire_date: selectedItem.expire_date,
      };

      // Update invoice + item in DB
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${formData.invoice_id}/${selectedItem.item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      const updatedRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${invoiceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = await updatedRes.json();

      setFormData((prev) => ({
        ...prev,
        ...updatedData.data,
      }));

      // setSelectedItem(undefined);
    } catch (err) {
      setError("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/${formData.invoice_id}/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete item");

      // Refresh the UI by removing the deleted item from state
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.item_id !== itemId),
      }));
    } catch (err) {
      setError("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-end mb-4 h-40">
        <div className="mt-4.5 mr-4 mb-1">
          <BackButton />
        </div>
        <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
          Stock In Detail
        </h1>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {/* {loading && <div className="text-[#2D579A] mb-4">Loading...</div>} */}

      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Invoice</p>

            {/* Purchase Date */}
            <div className="relative">
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
            {/* Due Date */}
            <label className="block text-[#2D579A] mb-2">Due Date</label>
            <div className="relative">
              {/* Main date input */}
              <input
                type="Date"
                name="due_date"
                value={formData.due_date}
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
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <p className="text-[#2D579A] mb-4 font-bold text-[20px]">Items</p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-center border">
            <thead className="bg-[#EEF1F7] text-[#2D579A]">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Unit Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Expire Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map((item, index) => (
                <tr
                  key={item.item_id}
                  className={`hover:bg-gray-100 cursor-pointer text-[#2D579A] text-center${
                    formData.selectedItem?.item_id === item.item_id
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => handleClickToStockinId(item.item_id)}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {products.find((p) => p.id === item.product_id)?.name_en ||
                      "N/A"}
                  </td>
                  <td className="px-4 py-2">${item.unit_price}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.total_price}</td>
                  <td className="px-4 py-2">
                    {item.expire_date
                      ? new Date(item.expire_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      className="w-[70px] h-[25px] bg-red-600 rounded-md text-white text-[10px] font-bold cursor-pointer"
                      onClick={() => handleDeleteItem(item.item_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Item Section */}
      {selectedItem && (
        <div className="mt-10">
          <p className="text-[#2D579A] font-bold text-[20px] mb-4">Edit Item</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-[#2D579A]">Product</label>
              <select
                name="selectedProductId"
                value={selectedItem.selectedProductId}
                onChange={handleSelectedItemChange}
                className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name_en}{" "}
                    {product.name_kh ? `(${product.name_kh}) ` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-[#2D579A]">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={selectedItem.quantity}
                onChange={handleSelectedItemChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-[#2D579A]">Unit Price</label>
              <input
                type="number"
                name="unit_price"
                value={selectedItem.unit_price}
                onChange={handleSelectedItemChange}
                className="w-full p-2 text-black border-gray-300 border focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg"
              />
            </div>

            <div>
              <label className="text-[#2D579A] relative">Expire Date</label>
              <div className="relative">
              <input
                type="Date"
                name="expire_date"
                value={selectedItem.expire_date}
                onChange={handleSelectedItemChange}
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
                value={selectedItem.expire_date}
                onChange={handleSelectedItemChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
              
            </div>
            </div>
            <div>
              <label className="block mb-2 text-[#2D579A]">Total Price</label>
              <input
                type="text"
                name="total_price"
                value={selectedItem.total_price}
                onChange={handleSelectedItemChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-4 mt-8 h-7">
            <Button label="Cancel" onClick={handleCancelItemEdit} />
            <Button
              label="Update"
              onClick={handleUpdateItem}
              variant="update"
            />
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
