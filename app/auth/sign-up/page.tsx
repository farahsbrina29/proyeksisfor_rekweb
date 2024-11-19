"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import ikon untuk visible/invisible
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const [fullName, setFullName] = useState(""); // State untuk Full Name
  const [email, setEmail] = useState(""); // State untuk Email
  const [password, setPassword] = useState(""); // State untuk Password
  const [confirmPassword, setConfirmPassword] = useState(""); // State untuk Confirm Password
  const [showPassword, setShowPassword] = useState(false); // State untuk visibility password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk visibility confirm password
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Buat akun pengguna di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Dapatkan UID pengguna
      const userId = userCredential.user.uid;

      // Log untuk memeriksa nilai
      console.log("Full Name:", fullName);
      console.log("Email:", email);

      // Simpan data pengguna ke Firestore
      await setDoc(doc(db, "users", userId), {
        fullName: fullName,
        email: email,
        createdAt: new Date(),
      });

      console.log("Data berhasil disimpan di Firestore!");
      alert("Account created successfully!");
      router.push("/"); // Redirect ke halaman Sign In setelah berhasil
    } catch (err: any) {
      console.error("Error creating account:", err.message);
      alert("Error creating account: " + err.message);
    }
  };

  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/signup.jpg')" }}
    >
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-6xl font-bold text-white">Create Your Account!</h1>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-black bg-opacity-50">
        <form className="w-full max-w-md space-y-6" onSubmit={handleSignUp}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter Your Full Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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
            {/* Tombol untuk toggle visibility */}
            <button
              type="button"
              className="absolute top-1/2 bottom-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"} // Tipe input berdasarkan visibility
              id="confirmPassword"
              placeholder="Confirm Your Password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* Tombol untuk toggle visibility */}
            <button
              type="button"
              className="absolute top-1/2 bottom-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
            >
              {showConfirmPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#143F6B] rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>

          <div className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a
              href="/auth/sign-in"
              className="font-medium text-blue-400 hover:underline"
            >
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
