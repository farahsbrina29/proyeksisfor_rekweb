"use client";

// Import modul Firebase yang dibutuhkan
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCJUO7Bdpnv2X2mlDOHO3C4lPgOiat392k",
  authDomain: "scholarhub-b8170.firebaseapp.com",
  projectId: "scholarhub-b8170",
  storageBucket: "scholarhub-b8170.firebasestorage.app",
  messagingSenderId: "193426535644",
  appId: "1:193426535644:web:a8f8b6f1dc73c3ffebf019",
  measurementId: "G-VZTVL5FR26",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Modul Firebase yang sering digunakan
const auth = getAuth(app);
const db = getFirestore(app);

// Inisialisasi analytics hanya jika didukung
let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Analytics initialized");
    } else {
      console.log("Analytics not supported in this environment");
    }
  });
}

export { app, auth, db, analytics };
