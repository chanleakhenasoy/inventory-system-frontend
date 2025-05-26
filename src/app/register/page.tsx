"use client";
import { User, Mail, Users, Key, LogIn, EyeOff, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function CreateUser() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickToUser = () => {
    router.push("/user");
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => setSuccess(""), 5000); // Hide after 5 seconds
      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  }, [success]);

  const validateUsername = (): string => {
    if (!username.trim()) return "Please enter your username.";
    if (username.trim().length < 3)
      return "Username must be at least 3 characters long.";
    return "";
  };

  const validateEmail = (): string => {
    if (!email.trim()) return "Please enter your email.";
    if (!email.trim().includes("@"))
      return "Email must contain '@'.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Please enter a valid email address.";
    // Check if email belongs to pse.ngo or institute.pse.ngo
    const emailDomainRegex = /^[\w.-]+@(institute\.)?pse\.ngo$/;
    if (!emailDomainRegex.test(email.trim()))
      return "Email must belong 'institute.pse.ngo' or 'pse.ngo'";
    return "";
  };

  const validateRole = (): string => {
    if (!role.trim()) return "Please select your role.";
    const normalizedRole = role.trim().toLowerCase();
    if (normalizedRole !== "user" && normalizedRole !== "admin")
      return "Role must be either 'user' or 'admin'.";
    return "";
  };

  const validatePassword = (): string => {
    if (!password.trim()) return "Please enter your password.";
    if (password.trim().length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password.trim()) && !/[#*]/.test(password.trim()))
      return "Password should contain at least one capital letter or special character (# or *).";
    return "";
  };

  const validateForm = (): boolean => {
    const usernameErr = validateUsername();
    const emailErr = validateEmail();
    const roleErr = validateRole();
    const passwordErr = validatePassword();

    setUsernameError(usernameErr);
    setEmailError(emailErr);
    setRoleError(roleErr);
    setPasswordError(passwordErr);

    return !usernameErr && !emailErr && !roleErr && !passwordErr;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setUsernameError("");
    setEmailError("");
    setRoleError("");
    setPasswordError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const payload = {
      user_name: username.trim(),
      email: email.trim(),
      role: role.trim().toLowerCase(),
      password: password.trim(),
    };

    console.log("Request body:", payload);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "User registered successfully!");
        setUsername("");
        setEmail("");
        setRole("");
        setPassword("");
        setTimeout(() => router.push("/user"), 1500);
      } else {
        // Handle server errors and specifically check for email already registered
        if (data.message && data.message.toLowerCase().includes("already registered")) {
          setEmailError("Email already registered.");
        } else if (data.message && data.message.toLowerCase().includes("username")) {
          setUsernameError(data.message);
        } else if (data.message && data.message.toLowerCase().includes("role")) {
          setRoleError(data.message);
        } else if (data.message && data.message.toLowerCase().includes("password")) {
          setPasswordError(data.message);
        } else {
          setEmailError(data.message || "An error occurred. Please try again.");
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      setEmailError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-25">
      {/* Header */}
      {success && (
        <div className="absolute top-0 right-0 w-[500px] max-w-full bg-green-500 text-white text-center py-3 px-6 rounded-tl-lg rounded-bl-lg shadow-lg">
          <p>{success}</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-[30px] font-bold text-[#2D579A]">
          Create New User
        </h1>
        <button
          className="px-6 py-1.5 bg-[#2D579A] text-white rounded-lg hover:bg-[#6499EF] transition cursor-pointer"
          onClick={handleClickToUser}
        >
          See all
        </button>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleRegister} noValidate>
        {/* Username Field */}
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={`w-full border p-3 pr-12 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              usernameError ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="absolute right-3 top-4 -translate-y-0.1 text-gray-500">
            <User size={20} />
          </div>
          <div className="h-6 mt-1">
            {usernameError && (
              <p className="text-sm text-red-500">{usernameError}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full border p-3 pr-12 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div className="absolute right-3 top-4 -translate-y-0.1 text-gray-500">
            <Mail size={20} />
          </div>
          <div className="h-6 mt-1">
            {emailError && (
              <p className="text-sm text-red-500">{emailError}</p>
            )}
          </div>
        </div>

        {/* Role Field */}
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full appearance-none border p-3 pr-12 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              roleError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" className="text-gray-500">
              Select Role
            </option>
            <option value="admin" className="text-gray-500">
              Admin
            </option>
            <option value="admin" className="text-gray-500">
              Manager
            </option>
            <option value="admin" className="text-gray-500">
              Officer
            </option>
          </select>
          <div className="absolute right-2 top-4 -translate-y-0.1 text-gray-500 pointer-events-none">
            <ChevronDown size={25} />
          </div>
          <div className="h-6 mt-1">
            {roleError && (
              <p className="text-sm text-red-500">{roleError}</p>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full border p-3 pr-12 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
          />
          <div
            className="absolute right-3 top-4 -translate-y-0.1 text-gray-500 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
          <div className="h-6 mt-1">
            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-[#2D579A] hover:bg-[#6499EF] text-white p-3 rounded-lg flex items-center justify-center font-medium transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            "Registering..."
          ) : (
            <>
              <LogIn size={18} strokeWidth={3} />
              <span className="ml-2 font-bold">REGISTER</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}