import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWi8W5XwN-mSGPYbF2G7_NqZwaCybRle4",
  authDomain: "ecocommunity-a62a5.firebaseapp.com",
  projectId: "ecocommunity-a62a5",
  storageBucket: "ecocommunity-a62a5.appspot.com",
  messagingSenderId: "29201019536",
  appId: "1:29201019536:web:e70b8f68426833f6d09e15",
  measurementId: "G-ZTK2F2CW44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optionally use analytics (only works in production and if enabled)
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, provider, db };
