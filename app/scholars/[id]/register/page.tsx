"use client";

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { doc, getDoc, getFirestore } from "firebase/firestore"; // Firebase Firestore
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

type FormData = {
  nama: string;
  nim: string;
  email: string;
  program_studi: string;
  semester: string;
  alasan?: string; // Opsional
  dokumen: File | null;
};

export default function ScholarshipRegistrationForm({
  params: asyncParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(asyncParams); // Unwrap params
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    nim: "",
    email: "",
    program_studi: "",
    semester: "",
    alasan: "",
    dokumen: null,
  });

  const [scholarshipTitle, setScholarshipTitle] = useState<string>("");
  const db = getFirestore();

  useEffect(() => {
    // Ambil data dari Firestore berdasarkan uid pengguna
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Ambil data pengguna dari Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setFormData((prevData) => ({
              ...prevData,
              nama: userData.fullName || "", // Isi otomatis nama dari Firestore
              email: userData.email || "", // Isi otomatis email dari Firestore
            }));
          } else {
            console.warn("No user document found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    // Tunggu params selesai di-unwrap
    (async () => {
      const { id } = await params;

      // Judul halaman diisi sesuai ID (misalnya dari data lokal atau API)
      setScholarshipTitle(`Scholarship ${id}`);
    })();
  }, [params]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("The uploaded file size exceeds 2 MB.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setFormData((prevData) => ({ ...prevData, dokumen: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nama ||
      !formData.nim ||
      !formData.email ||
      !formData.program_studi ||
      !formData.semester ||
      !formData.dokumen
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    console.log("Form Data:", formData);

    toast.success(
      "Registration submitted successfully. Please wait for confirmation.",
      {
        position: "top-center",
        autoClose: 2000,
      }
    );

    // Wait for 3 seconds before navigating
    setTimeout(() => {
      window.location.href = `/status`;
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <Head>
        <title>{scholarshipTitle} - Registration</title>
      </Head>
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Register for {scholarshipTitle}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label
            htmlFor="nama"
            className="block font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            readOnly
          />
        </div>

        {/* NIM */}
        <div>
          <label htmlFor="nim" className="block font-medium text-gray-700 mb-1">
            Student ID (NIM)
          </label>
          <input
            type="text"
            id="nim"
            name="nim"
            value={formData.nim}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            readOnly
          />
        </div>

        {/* Program Studi */}
        <div>
          <label
            htmlFor="program_studi"
            className="block font-medium text-gray-700 mb-1"
          >
            Program Studi
          </label>
          <input
            type="text"
            id="program_studi"
            name="program_studi"
            value={formData.program_studi}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your program of study"
            required
          />
        </div>

        {/* Semester */}
        <div>
          <label
            htmlFor="semester"
            className="block font-medium text-gray-700 mb-1"
          >
            Semester
          </label>
          <input
            type="number"
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            min={1}
            max={14}
            required
          />
        </div>

        {/* Alasan */}
        <div>
          <label
            htmlFor="alasan"
            className="block font-medium text-gray-700 mb-1"
          >
            Reason for Applying (Optional)
          </label>
          <textarea
            id="alasan"
            name="alasan"
            value={formData.alasan}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            rows={4}
          ></textarea>
        </div>

        {/* Dokumen */}
        <div>
          <label
            htmlFor="dokumen"
            className="block font-medium text-gray-700 mb-1"
          >
            Upload Supporting Documents
          </label>
          <input
            type="file"
            id="dokumen"
            name="dokumen"
            onChange={handleFileChange}
            className="w-full"
            required
          />
          <p className="text-sm text-gray-500">Max file size: 2 MB.</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
