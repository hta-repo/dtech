
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_tl4K89zZCDVv2lscOTrF4oZsL_5isyg",
    authDomain: "dtec-d4db9.firebaseapp.com",
    projectId: "dtec-d4db9",
    storageBucket: "dtec-d4db9.appspot.com",
    messagingSenderId: "150602484697",
    appId: "1:150602484697:web:ec2b9d7ef3c0bbe3c1a7c8",
    measurementId: "G-7GQQ9EB12D"
};

// Initialize Firebase and get a messaging instance
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Function to request and retrieve a registration token
export const requestToken = async (setFirebaseToken) => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'BNj8CQjuubD9irtDkISXdV_GIJZfuBK00-RSN8CfAjboHeuPrt88_OcYowkQ5c9SNu-HmQiH7BW6mVkE2Ph7NSo' });
        if (currentToken) {
            // console.log('Current token for client:', currentToken);
            setFirebaseToken(currentToken);
        } else {
            setFirebaseToken(null);
        }
    } catch (err) {
        setFirebaseToken(null);
        console.error('An error occurred while retrieving token.', err);
    }
};

// Function to listen for incoming messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
            console.error("Service Worker registration failed:", error);
        });
}