"use client";

import React, { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import Login from "@/components/login";
import Signup from "@/components/signup";
import ConsultorDashboard from "@/components/dashboards/ConsultorDashboard";
import EmpresarioDashboard from "@/components/dashboards/EmpresarioDashboard";
import EmpleadoDashboard from "@/components/dashboards/EmpleadoDashboard";
import GestorDashboard from "@/components/dashboards/GestorDashboard";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
            console.error("Error fetching user role: ", error);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderDashboard = () => {
    switch (userRole) {
      case "consultor":
        return <ConsultorDashboard />;
      case "empresario":
        return <EmpresarioDashboard />;
      case "empleado":
        return <EmpleadoDashboard />;
      case "gestor":
        return <GestorDashboard />;
      default:
        return <div className="flex items-center justify-center h-screen"><p>Cargando dashboard...</p></div>;
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      {user && userRole ? (
        renderDashboard()
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
