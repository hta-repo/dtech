// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD_tl4K89zZCDVv2lscOTrF4oZsL_5isyg",
  authDomain: "dtec-d4db9.firebaseapp.com",
  projectId: "dtec-d4db9",
  storageBucket: "dtec-d4db9.appspot.com",
  messagingSenderId: "150602484697",
  appId: "1:150602484697:web:ec2b9d7ef3c0bbe3c1a7c8",
  measurementId: "G-7GQQ9EB12D"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  // Send the payload to the main application
  const channel = new BroadcastChannel('background-messages');
  channel.postMessage(payload);
});
