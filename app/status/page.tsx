"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import Head from "next/head";

type RegistrationData = {
  id: string;
  nama: string;
  nim: string;
  email: string;
  program_studi: string;
  semester: number;
  nama_beasiswa: string;
  tanggal_pendaftaran: string;
  status: string;
  catatan_admin: string;
};

export default function StatusPage() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const db = getFirestore();

  // Fetch user data
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        setUserEmail(user.email); // Update email pengguna
      } else {
        setUserEmail(null); // Reset jika pengguna logout
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch registrations from Firestore
  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!userEmail) return; // Jika email tidak ada, hentikan eksekusi

      setIsLoading(true);
      const registrationsList: RegistrationData[] = [];
      try {
        const scholarshipsRef = collection(db, "scholarship");
        const snapshot = await getDocs(scholarshipsRef);

        // Loop through scholarships to fetch subcollection data
        for (const doc of snapshot.docs) {
          const subcollectionRef = collection(
            db,
            "scholarship",
            doc.id,
            "pendaftaran_beasiswa"
          );

          const registrationsQuery = query(
            subcollectionRef,
            where("email", "==", userEmail)
          );
          const registrationsSnapshot = await getDocs(registrationsQuery);

          registrationsSnapshot.forEach((regDoc) => {
            const data = regDoc.data() as RegistrationData;
            registrationsList.push({ ...data, id: `${regDoc.id}` });
          });
        }
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setRegistrations(registrationsList);
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, [userEmail, db]);

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <Head>
        <title>My Submitted Scholarships</title>
      </Head>

      <h1 className="text-4xl font-bold text-left text-black mb-8">
        My Submitted Scholarships
      </h1>

      {isLoading ? (
        <p className="text-lg text-center">Loading...</p>
      ) : registrations.length === 0 ? (
        <p className="text-lg text-center text-gray-500">
          You have not registered for any scholarships yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrations.map((registration, index) => (
            <div
              key={`${registration.id}-${index}`} // Pastikan key unik dengan menambahkan indeks
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-blue-900">
                {registration.nama_beasiswa}
              </h2>
              <p className="text-sm text-gray-700">
                Registered on: {registration.tanggal_pendaftaran}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    registration.status === "approved"
                      ? "text-green-600"
                      : registration.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {registration.status}
                </span>
              </p>
              {registration.catatan_admin && (
                <p className="text-sm text-gray-600 mt-2">
                  Admin Note: {registration.catatan_admin}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
