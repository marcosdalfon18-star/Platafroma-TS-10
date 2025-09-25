"use client";

import React, { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import Login from "@/components/login";
import Dashboard from "@/components/Dashboard";
import Signup from "@/components/signup";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <Dashboard />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <Login />
                <div className="my-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-gray-100 px-2 text-muted-foreground">
                                O regístrate
                            </span>
                        </div>
                    </div>
                </div>
                <Signup />
            </div>
        </div>
      )}
    </div>
  );
}
