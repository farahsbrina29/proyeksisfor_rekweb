// Import modul Firebase yang dibutuhkan
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

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
const storage = getStorage(app);
const analytics = getAnalytics(app);
// Cek apakah window.analytics tersedia sebelum menginisialisasi analytics
if (typeof window !== "undefined" && "analytics" in window) {
  const analytics = getAnalytics(app);
}
// Ekspor modul Firebase
export { app, auth, db, storage, analytics };
