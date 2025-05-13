"use client";
import Image from "next/image";
import logo from "../app/images/logo.png";
import { Mail, Key } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  console.log(email, password);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        // Save token and user role (if needed)
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
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
        <form onSubmit={handleSignIn} className="w-full flex flex-col items-center">
        {/* Email Input */}
        <div className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] mb-4 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 p-3 pr-12 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Mail size={20} />
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] mb-6 relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 p-3 pr-12 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Key size={20} />
          </div>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Sign In Button */}
        <button className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] bg-[#2B5190] text-white p-3 rounded flex items-center justify-center cursor-pointer
        disabled={loading}
        ">
          {loading ? "Signing In..." : "SIGN IN"}
        </button>
        </form>
      </div>
    </div>
  );
}
