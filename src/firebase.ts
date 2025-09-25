// src/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfyNXGXUX0ip0icCSuDlKasX2PN4GIKiY",
  authDomain: "studio-6568907544-ca1d2.firebaseapp.com",
  projectId: "studio-6568907544-ca1d2",
  storageBucket: "studio-6568907544-ca1d2.appspot.com",
  messagingSenderId: "95313933174",
  appId: "1:95313933174:web:04ac254b7c65fdbdbfc057"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export auth for use in other components
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = (typeof window !== 'undefined') ? getMessaging(app) : null;

export { app };
