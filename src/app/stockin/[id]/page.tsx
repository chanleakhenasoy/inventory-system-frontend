import Image from "next/image"
import { Calendar, Bell, Package, Store, Layers, PackageX, Users } from "lucide-react"

export default function StockInDetail() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
     
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Header */}
    

        {/* Content */}
        <main className="flex-1 p-6">
          <h1 className="text-[30px] font-bold text-[#2D579A] mb-6">Stock In Detail</h1>

          <div className="bg-white rounded-lg p-6">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Reference Name</label>
                    <input
                      type="text"
                      defaultValue="Mararika"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Product</label>
                    <input
                      type="text"
                      defaultValue="Mararika"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Quantity</label>
                    <input
                      type="text"
                      defaultValue="Mararika"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Total Price</label>
                    <input
                      type="text"
                      defaultValue="Mararika"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Supplier</label>
                    <input
                      type="text"
                      defaultValue="Mararika"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Stock In Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="Mararika"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Unit Price</label>
                    <input
                      type="text"
                      defaultValue="Mararika"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Expire Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="Mararika"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-6 py-1.5 text-[15px] bg-[#EF2B2E] text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="px-6 py-1.5 text-[15px] bg-[#26BD5D] text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Update
                </button>
                <button
                  type="submit"
                  className="px-6 py-1.5 text-[15px] bg-[#2D579A] text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}


