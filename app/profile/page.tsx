"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";

export default function ProfilePage() {
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loading
  const router = useRouter();

  const fetchProfileData = async () => {
    setIsLoading(true); // Mulai loading
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("No user logged in");
        router.push("/auth/sign-in");
        return;
      }

      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFullName(data.fullName);
        setEmail(data.email);
      } else {
        console.error("No such document!");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true); // Mulai loading
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("No user logged in");
        return;
      }

      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, { fullName: newFullName });
      setFullName(newFullName);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    setIsLoading(true); // Mulai loading
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("No user logged in");
        return;
      }

      const userDoc = doc(db, "users", user.uid);
      await deleteDoc(userDoc);
      await user.delete();
      alert("Account deleted successfully!");
      router.push("/auth/sign-in");
    } catch (error: any) {
      console.error("Error deleting account:", error.message);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-lg border border-gray-300">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Profile
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : isEditing ? (
          <>
            {/* Form Edit */}
            <div className="mb-4">
              <label
                htmlFor="newFullName"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="newFullName"
                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-3xl shadow-md hover:bg-green-600 transition"
              >
                <FiSave />
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-3xl shadow-md hover:bg-gray-400 transition"
              >
                <FiX />
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Profile View */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">Full Name:</p>
              <p className="text-lg font-medium text-gray-800">
                {fullName || "Loading..."}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600">Email:</p>
              <p className="text-lg font-medium text-gray-800">
                {email || "Loading..."}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setNewFullName(fullName || "");
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-3xl shadow-md hover:bg-blue-600 transition"
              >
                <FiEdit />
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-3xl shadow-md hover:bg-red-600 transition"
              >
                <FiTrash2 />
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
