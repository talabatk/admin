// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.16.0/firebase-app-compat.js"
);
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB2nLVFWO3u6SaOd4BioHPdxvckUXdqd7Y",
  authDomain: "talabatek-4bea7.firebaseapp.com",
  projectId: "talabatek-4bea7",
  storageBucket: "talabatek-4bea7.firebasestorage.app",
  messagingSenderId: "119008136494",
  appId: "1:119008136494:web:ec83935ba695c71095bebf",
  measurementId: "G-7YZRYF3M21",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title || "new";
  const notificationOptions = {
    body: payload.notification.body || "You have a new message.",
    icon: "logo.png",
  };

  // eslint-disable-next-line no-restricted-globals
  // self.registration.showNotification(notificationTitle, notificationOptions);
});
