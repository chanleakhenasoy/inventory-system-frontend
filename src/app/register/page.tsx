"use client";

import { User, Mail, Users, Key, LogIn, Link, Bold, Space } from "lucide-react";
import { useRouter } from 'next/navigation';


export default function CreateUser() {
  const router = useRouter();

  const handleClickToUser = () => {
    router.push('/user'); // Replace with your route
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-[30px] font-bold text-[#2D579A] mb-6">
        Create New User
      </h1>
        <button className="px-6 py-1.5 bg-[#2D579A] text-white rounded-lg hover:bg-[#6499EF] transition cursor-pointer"
        onClick={handleClickToUser}>
        See all
        <h1 className="text-[30px] font-bold text-[#2D579A] mb-6">
          Create New User
        </h1>
        <button className="bg-[#2D579A] text-white px-6 py-1.5 rounded-lg text-sm">
          See All
        </button>
    </div>

      <form className="flex flex-col gap-8">
        {/* Username Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Username"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <User size={20} />
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Mail size={20} />
          </div>
        </div>

        {/* Role Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Role"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Users size={20} />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Key size={20} />
          </div>
        </div>

        {/* Register Button */}
        <button
              type="submit"
              className="w-full bg-[#2D579A] hover:bg-[#6499EF] text-white p-3 rounded-lg flex items-center justify-center font-medium transition-colors duration-300"
            >
              <LogIn size={18} strokeWidth={3} />
              <span className="ml-2 font-bold">REGISTER</span>
            </button>
      </form>
    </div>
  );
}
