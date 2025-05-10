// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Function to validate booking data before saving
const validateBookingData = (bookingData) => {
  const { firstName, lastName, email, mobile, date, time, message } = bookingData;

  if (!firstName || typeof firstName !== "string") {
    throw new Error("Invalid or missing 'firstName'.");
  }
  if (!lastName || typeof lastName !== "string") {
    throw new Error("Invalid or missing 'lastName'.");
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new Error("Invalid or missing 'email'.");
  }
  if (mobile && (typeof mobile !== "string" || mobile.length < 10)) {
    throw new Error("Invalid 'mobile'.");
  }
  if (!date || typeof date !== "string") {
    throw new Error("Invalid or missing 'date'.");
  }
  if (!time || typeof time !== "string") {
    throw new Error("Invalid or missing 'time'.");
  }
  if (message && typeof message !== "string") {
    throw new Error("Invalid 'message'.");
  }
};

// Updated function to save booking details to Firestore
export const saveBookingDetails = async (bookingData) => {
  try {
    validateBookingData(bookingData);

    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (e) {
    console.error("Error adding booking: ", e);
    console.log("Booking data that caused the error:", bookingData);
    throw e;
  }
};
