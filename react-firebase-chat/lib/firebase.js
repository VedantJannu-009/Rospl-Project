import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-43f1a.firebaseapp.com",
  projectId: "reactchatapp-43f1a",
  storageBucket: "reactchatapp-43f1a.appspot.com",
  messagingSenderId: "908504973681",
  appId: "1:908504973681:web:5b9684ef5cd4962f9376d0"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);