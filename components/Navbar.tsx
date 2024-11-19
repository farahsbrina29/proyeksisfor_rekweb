"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebaseConfig"; // Firebase config
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null); // Perbarui tipe di sini
  const router = useRouter();

  // Cek status autentikasi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Tidak ada error karena tipe sudah benar
    });
    return () => unsubscribe();
  }, []);

  // Fungsi untuk logout
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Successfully signed out!");
      router.push("/"); // Redirect ke halaman utama
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <nav className="bg-[#143F6B] text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-left">
          <Link href="/">ScholarHub</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <Link href="/" className="hover:text-gray-300 font-semibold">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/scholars" className="hover:text-gray-300">
            Scholars
          </Link>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            // Jika user sudah login
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 hover:text-gray-300"
              >
                <FiUser size={20} />
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 border border-white text-white rounded-full hover:bg-red-600 transition"
              >
                <FiLogOut size={20} />
                Sign Out
              </button>
            </>
          ) : (
            // Jika user belum login
            <Link
              href="/auth/sign-in"
              className="px-4 py-2 border border-white text-white rounded-full hover:bg-gray-100 hover:text-blue-900 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
