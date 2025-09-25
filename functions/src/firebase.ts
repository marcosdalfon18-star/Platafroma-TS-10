// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getfirestore } from "firebase/firebase";


const firebaseConfig = {
  apiKey: "AIzaSyCfyNXGXUX0ip0icCSuDlKasX2PN4GIKiY",
  authDomain: "studio-6568907544-ca1d2.firebaseapp.com",
  projectId: "studio-6568907544-ca1d2",
  storageBucket: "studio-6568907544-ca1d2.firebasestorage.app",
  messagingSenderId: "95313933174",
  appId: "1:95313933174:web:04ac254b7c65fdbdbfc057"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth para usarlo en login.tsx
export const auth = getAuth(app);