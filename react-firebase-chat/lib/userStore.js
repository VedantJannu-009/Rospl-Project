import { getDoc, doc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      // If no UID is provided, stop the loading and set currentUser to null
      console.log("No UID provided for fetching user info.");
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User data fetched:", docSnap.data()); // Log fetched user data
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("No such document found!");
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info:", err); // Improved error logging
      set({ currentUser: null, isLoading: false });
    }
  },
}));
