// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCfyNXGXUX0ip0icCSuDlKasX2PN4GIKiY",
  authDomain: "studio-6568907544-ca1d2.firebaseapp.com",
  projectId: "studio-6568907544-ca1d2",
  storageBucket: "studio-6568907544-ca1d2.appspot.com",
  messagingSenderId: "95313933174",
  appId: "1:95313933174:web:04ac254b7c65fdbdbfc057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth for use in other components
export const auth = getAuth(app);
export const db = getFirestore(app);
