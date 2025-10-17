// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
const firebaseConfig = {
    apiKey: "AIzaSyCfyNXGXUX0ip0icCSuDlKasX2PN4GIKiY",
    authDomain: "studio-6568907544-ca1d2.firebaseapp.com",
    projectId: "studio-6568907544-ca1d2",
    storageBucket: "studio-6568907544-ca1d2.appspot.com",
    messagingSenderId: "95313933174",
    appId: "1:95313933174:web:04ac254b7c65fdbdbfc057"
};

firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
