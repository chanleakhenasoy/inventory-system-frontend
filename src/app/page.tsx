import Image from "next/image";
import logo from "../app/images/logo.png";
import { Mail, Key } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src={logo}
            alt="PSE Pour Un Sourire D'Enfant"
            width={400}
            height={120}
            priority
          />
        </div>

        {/* Sign In Text */}
        <div className="mb-8 text-gray-800">SIGN IN</div>

        {/* Email Input */}
        <div className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] mb-4 relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-400 p-3 pr-12 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Mail size={20} />
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] mb-6 relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 p-3 pr-12 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Key size={20} />
          </div>
        </div>

        {/* Sign In Button */}
        <button className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] bg-[#2B5190] text-white p-3 rounded flex items-center justify-center cursor-pointer">
          <span className="mr-2 font-bold">SIGN IN</span>
        </button>
      </div>
    </div>
  );
}
