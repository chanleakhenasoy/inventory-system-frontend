'use client';

export default function Notification() {
  return (
    <div className="flex flex-col p-6 mt-25">
      {/* Title */}
      <h1 className="text-[30px] font-bold text-[#2D579A] mb-4 mt-6">Notification</h1>

      {/* Notification Cards */}
      <div className="flex flex-col gap-4 mt-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-start cursor-pointer"
          >
            <div>
              <h2 className="text-[#2D579A] text-xl font-bold">Bikecycle</h2>
              <p className="text-[#EF2B2E] mt-1">Low stock</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600">2 hours ago</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6499EF]"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
