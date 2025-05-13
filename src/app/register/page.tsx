"use client";

import { User, Mail, Users, Key, LogIn } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  console.log(username, email, role, password);

  const handleClickToUser = () => {
    router.push("/user");
  };

  const validateForm = (): boolean => {
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (role !== "admin" && role !== "user") {
      setError("Role must be either 'admin' or 'user'.");
      return false;
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          role,
          password,
        }),
      });

      if (response.ok) {
        setSuccess("User registered successfully.");
        setUsername("");
        setEmail("");
        setRole("");
        setPassword("");

        console.log(response)

        setTimeout(() => {
          router.push("/user");
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to register user.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-[30px] font-bold text-[#2D579A]">Create New User</h1>
        <button
          className="px-6 py-1.5 bg-[#2D579A] text-white rounded-lg hover:bg-[#6499EF] transition cursor-pointer"
          onClick={handleClickToUser}
        >
          See all
        </button>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleRegister}>
        {/* Error Message */}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        {/* Username Field */}
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <User size={20} />
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Mail size={20} />
          </div>
        </div>

        {/* Role Field */}
        <div className="relative">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (admin/user)"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Users size={20} />
          </div>
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border text-black border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Key size={20} />
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#2D579A] hover:bg-[#6499EF] text-white p-3 rounded-lg flex items-center justify-center font-medium transition-colors duration-300 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Registering..." : <><LogIn size={18} strokeWidth={3} /> <span className="ml-2 font-bold">REGISTER</span></>}
        </button>
      </form>
    </div>
  );
}
