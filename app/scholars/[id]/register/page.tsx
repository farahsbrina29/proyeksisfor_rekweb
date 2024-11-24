"use client";

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

type FormData = {
  nama: string;
  nim: string;
  email: string;
  program_studi: string;
  semester: string;
  alasan?: string;
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
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setFormData((prevData) => ({
              ...prevData,
              nama: userData.fullName || "",
              email: userData.email || "",
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
    (async () => {
      const { id } = await params;
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
      toast.error("File size exceeds 2 MB.", { position: "top-center" });
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
      });
      return;
    }

    toast.success(
      "Registration submitted successfully. Please wait for confirmation.",
      { position: "top-center" }
    );

    setTimeout(() => {
      window.location.href = `/status`;
    }, 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <Head>
        <title>{scholarshipTitle} - Registration</title>
      </Head>
      <ToastContainer />
      <h1 className="text-4xl font-bold text-left text-black-700 mb-8">
        Register for {scholarshipTitle}
      </h1>
      <p className="mb-4 text-gray-500">Fields marked with an * are required</p>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Nama */}
        <div>
          <label htmlFor="nama" className="block text-lg font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-300 focus:ring focus:outline-none"
            readOnly
          />
        </div>

        {/* NIM */}
        <div>
          <label htmlFor="nim" className="block text-lg font-semibold mb-2">
            Student ID (NIM)
          </label>
          <input
            type="text"
            id="nim"
            name="nim"
            value={formData.nim}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-300 focus:ring focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-300 focus:ring focus:outline-none"
            readOnly
          />
        </div>

        {/* Program Studi */}
        <div>
          <label
            htmlFor="program_studi"
            className="block text-lg font-semibold mb-2"
          >
            Program Studi
          </label>
          <input
            type="text"
            id="program_studi"
            name="program_studi"
            value={formData.program_studi}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-300 focus:ring focus:outline-none"
            placeholder="Enter your program of study"
            required
          />
        </div>

        {/* Semester */}
        <div>
          <label htmlFor="semester" className="block text-lg font-semibold mb-2">
            Semester
          </label>
          <input
            type="number"
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-300 focus:ring focus:outline-none"
            min={1}
            max={14}
            required
          />
        </div>

        {/* Alasan */}
        <div>
          <label htmlFor="alasan" className="block text-lg font-semibold mb-2">
            Reason for Applying
          </label>
          <textarea
            id="alasan"
            name="alasan"
            value={formData.alasan}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-300 focus:ring focus:outline-none"
            rows={4}
          ></textarea>
        </div>

        {/* Dokumen */}
        <div>
          <label htmlFor="dokumen" className="block text-lg font-semibold mb-2">
            Upload Supporting Documents
          </label>
          <input
            type="file"
            id="dokumen"
            name="dokumen"
            onChange={handleFileChange}
            className="w-full px-4 py-2"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Max file size: 2 MB.</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
