
"use client";

import { useState, useEffect, useCallback } from "react";
import { app } from "@/firebase";

// This hook is designed to work with Next.js and Server-Side Rendering (SSR).
// Firebase Messaging is a client-side only library. To prevent it from being
// bundled on the server (which causes hydration errors), we use dynamic imports.

export const usePushNotifications = () => {
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
    const [fcmToken, setFcmToken] = useState<string | null>(null);

    // A function to safely initialize Firebase messaging and its listeners.
    const initializeMessaging = useCallback(async () => {
        // We only proceed if we are in a browser environment.
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            try {
                // Dynamically import the Firebase messaging functions.
                const { getMessaging, getToken, onMessage } = await import("firebase/messaging");

                const messaging = getMessaging(app);

                // Set up the listener for messages received while the app is in the foreground.
                onMessage(messaging, (payload) => {
                    console.log("Foreground message received: ", payload);
                    const notificationTitle = payload.notification?.title || "New Notification";
                    const notificationOptions = {
                        body: payload.notification?.body || "",
                        icon: payload.notification?.icon || "/firebase-logo.png",
                    };
                    new Notification(notificationTitle, notificationOptions);
                });

                // Get the registration token if permission is already granted.
                if (Notification.permission === 'granted') {
                    const VAPID_KEY = "BHr_aTAVZApr4QIFN9ZXvlGAR79o8vA9n-b0xXFm_kPpt2xPzPjdn-UvBv16aAYQc52Y95amSMeL8lc-GkYJ8oI";
                    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
                    if (currentToken) {
                        setFcmToken(currentToken);
                        console.log("FCM Token:", currentToken);
                    } else {
                        console.log("Could not get registration token.");
                    }
                }
            } catch (error) {
                console.error("Error initializing Firebase Messaging:", error);
            }
        }
    }, []);

    useEffect(() => {
        // Set the initial permission status on mount.
        if ("Notification" in window) {
            setPermissionStatus(Notification.permission);
        }
        // Initialize messaging service.
        initializeMessaging();
    }, [initializeMessaging]);

    const requestPermission = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications.");
            return;
        }

        const status = await Notification.requestPermission();
        setPermissionStatus(status);

        if (status === 'granted') {
            // Re-initialize to get the token after permission is granted.
            await initializeMessaging();
        }
    };
    
    const sendTestNotification = (title: string, body: string) => {
        if (permissionStatus === 'granted') {
             new Notification(title, { body });
        } else {
            console.warn("Cannot send test notification, permission not granted.");
        }
    };

    return {
        permissionStatus,
        fcmToken, // You can use this token to send notifications from your backend.
        requestPermission,
        sendTestNotification
    };
};
