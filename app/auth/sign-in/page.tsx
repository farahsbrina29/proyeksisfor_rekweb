"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignIn() {
  const [email, setEmail] = useState(""); // Ubah state menjadi email
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State untuk efek loading
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Mulai loading
    try {
      await signInWithEmailAndPassword(auth, email, password); // Proses sign-in
      alert("Login berhasil!");
      router.push("/"); // Redirect ke halaman utama
    } catch (err: any) {
      console.error("Login gagal:", err.message);
      alert("Error signing in: " + err.message);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/signin.jpg')" }}
    >
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-6xl font-bold text-white">Welcome!</h1>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-black bg-opacity-50">
        <form className="w-full max-w-md space-y-6" onSubmit={handleSignIn}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Tipe input berdasarkan visibility
              id="password"
              placeholder="Enter Your Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 bottom-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-blue focus:ring-blue-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-white"
            >
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#143F6B] hover:bg-blue-700"
              }`}
              disabled={isLoading} // Nonaktifkan tombol saat loading
            >
              {isLoading ? "Processing..." : "Sign In"}
            </button>
          </div>

          <div className="text-sm text-center text-white mt-4">
            Don’t have an account?{" "}
            <a
              href="/auth/sign-up"
              className="font-medium text-blue-400 hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
