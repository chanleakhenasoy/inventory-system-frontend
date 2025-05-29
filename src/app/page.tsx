"use client";
import Image from "next/image";
import logo from "../app/images/logo.png";
import { Mail, Key, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoading(true);

    if (!email.trim()) {
      setEmailError("Please enter your email.");
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format.");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://hr-inventory-be.final25.psewmad.org/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setEmailError(errorData.message || "Invalid email or password");
      }
    } catch (err) {
      setEmailError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-6">
          <Image
            src={logo}
            alt="PSE Pour Un Sourire D'Enfant"
            width={400}
            height={120}
            priority
          />
        </div>
        <div className="mb-8 text-gray-800">SIGN IN</div>
        <form
          onSubmit={handleSignIn}
          className="w-full flex flex-col items-center"
          noValidate
        >
          <div className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] mb-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full border p-3 pr-12 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="absolute right-3 top-4 -translate-y-0.1 text-gray-500">
              <Mail size={20} />
            </div>
            <div className="h-6 mt-1">
              {emailError && <p className="text-sm text-red-500">{emailError}</p>}
            </div>
          </div>
          <div className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] mb-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full border p-3 pr-12 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div
              className="absolute right-3 top-4 -translate-y-0.1 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            <div className="h-6 mt-1">
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
          </div>
          <button
             className="w-full sm:w-[95%] md:w-[100%] lg:w-[150%] bg-[#2B5190] text-white p-3 rounded flex items-center justify-center cursor-pointer
         disabled={loading}
         "
           >
             {loading ? "Signing In..." : "SIGN IN"}
           </button>
        </form>
      </div>
    </div>
  );
}