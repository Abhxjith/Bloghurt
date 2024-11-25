import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVQQ1NrQ8fhToOWgb9bcDsSmIUzDUo5nU",
  authDomain: "bloghurt.firebaseapp.com",
  projectId: "bloghurt",
  storageBucket: "bloghurt.firebasestorage.app",
  messagingSenderId: "529385974024",
  appId: "1:529385974024:web:d543855b7a8ebc635424bd",
  measurementId: "G-FZE1JFZFK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication, Firestore, and Storage
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);  // Initialize Firebase Storage

// Google Auth provider setup
export const provider = new GoogleAuthProvider();

// Google Sign-In function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;  // Return the authenticated user
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};

// Sign Out function
export const signOutUser = async () => {
  try {
    await signOut(auth);  // Sign out the user
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
};


