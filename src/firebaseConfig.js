// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
let app;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

// Initialize Firebase services
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

// Google provider setup
export const googleProvider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Function to sign in anonymously
export const signInAnonymouslyHandler = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error;
  }
};

// Function to sign up with email and password
export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing up with email:", error);
    throw error;
  }
};

// Function to log in with email and password
export const logInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error logging in with email:", error);
    throw error;
  }
};

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
