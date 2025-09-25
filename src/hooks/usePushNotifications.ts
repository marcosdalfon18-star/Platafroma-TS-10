
"use client";

import { useState, useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "@/firebase"; 

export const usePushNotifications = () => {
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
    
    useEffect(() => {
        // Establecer el estado inicial del permiso
        if ("Notification" in window) {
            setPermissionStatus(Notification.permission);
        }

        // Configurar listener para mensajes en primer plano
        const setupOnMessageListener = async () => {
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                try {
                    const messaging = getMessaging(app);
                    onMessage(messaging, (payload) => {
                        console.log("Mensaje recibido en primer plano: ", payload);
                        const notificationTitle = payload.notification?.title || "Nueva Notificación";
                        const notificationOptions = {
                            body: payload.notification?.body || "",
                            icon: payload.notification?.icon || "/firebase-logo.png",
                        };
                        new Notification(notificationTitle, notificationOptions);
                    });
                } catch (error) {
                    console.error("Error al configurar onMessage listener:", error);
                }
            }
        };

        setupOnMessageListener();

    }, []);

    const requestPermission = async () => {
        if (!("Notification" in window)) {
            alert("Este navegador no soporta notificaciones de escritorio");
            return;
        }

        const status = await Notification.requestPermission();
        setPermissionStatus(status);

        if (status === 'granted') {
            await getAndLogToken();
        }
    };

    const getAndLogToken = async () => {
        try {
            const messaging = getMessaging(app);
            const VAPID_KEY = "BHr_aTAVZApr4QIFN9ZXvlGAR79o8vA9n-b0xXFm_kPpt2xPzPjdn-UvBv16aAYQc52Y95amSMeL8lc-GkYJ8oI"; // Clave pública VAPID de tu proyecto de Firebase
            
            const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
            
            if (currentToken) {
                console.log("FCM Token:", currentToken);
                // Aquí podrías enviar el token a tu backend para guardarlo
            } else {
                console.log("No se pudo obtener el token de registro. Se necesita solicitar permiso.");
            }
        } catch (error) {
            console.error("Ocurrió un error al obtener el token.", error);
        }
    };
    
    const sendTestNotification = (title: string, body: string) => {
        if (permissionStatus === 'granted') {
             new Notification(title, { body });
        } else {
            console.warn("No se pueden enviar notificaciones de prueba, el permiso no está concedido.");
        }
    };


    return {
        permissionStatus,
        requestPermission,
        sendTestNotification
    };
};
