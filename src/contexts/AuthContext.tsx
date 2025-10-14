'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase';

export type UserRole = "consultor" | "empresario" | "empleado" | "gestor" | "ejecutivo";

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  companyId?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || userData.displayName,
            role: userData.role,
            companyId: userData.companyId
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string, role: UserRole) => {
    setLoading(true);
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil
      await updateProfile(firebaseUser, { displayName });
      
      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email,
        displayName,
        role,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (data: Partial<UserData>) => {
    if (!user || !auth.currentUser) {
      throw new Error('No user authenticated');
    }

    // Actualizar en Firebase Auth si hay cambios en displayName
    if (data.displayName && data.displayName !== user.displayName) {
      await updateProfile(auth.currentUser, { displayName: data.displayName });
    }

    // Actualizar en Firestore
    await updateDoc(doc(db, 'users', user.uid), {
      ...data,
      updatedAt: serverTimestamp()
    });

    // Actualizar estado local
    setUser(prevUser => prevUser ? { ...prevUser, ...data } : null);
  };

  const verifyEmail = async () => {
    if (!auth.currentUser) {
      throw new Error('No user authenticated');
    }
    await sendEmailVerification(auth.currentUser);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};