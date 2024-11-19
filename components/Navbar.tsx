"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebaseConfig"; // Firebase config
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null); // Perbarui tipe di sini
  const router = useRouter();
  const pathname = usePathname(); // Dapatkan path saat ini

  // Cek status autentikasi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Tidak ada error karena tipe sudah benar
    });
    return () => unsubscribe();
  }, []);

  // Fungsi untuk logout
  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      // Konfirmasi sebelum sign out
      try {
        await signOut(auth);
        alert("Successfully signed out!"); // Alert setelah sign out
        router.push("/"); // Redirect ke halaman utama
      } catch (error: any) {
        console.error("Error signing out:", error.message);
        alert("Error signing out: " + error.message); // Alert jika ada error
      }
    }
  };

  return (
    <nav className="bg-[#143F6B] text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold text-left">
          <Link href="/">ScholarHub</Link>
        </div>

        {/* User Section and Navigation Links */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-1 ${
                pathname === "/"
                  ? "text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Home
            </Link>
            <Link
              href="/scholars"
              className={`px-3 py-1 ${
                pathname === "/scholars"
                  ? "text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Scholars
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1 ${
                pathname === "/about"
                  ? "text-white font-bold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              About
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
      </div>
    </nav>
  );
}
