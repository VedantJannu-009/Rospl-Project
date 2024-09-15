import { useEffect } from "react";
import Chat from "./Components/chat/Chat";
import Detail from "./Components/detail/Detail";
import List from "./Components/list/List";
import Login from "./Components/Login/login";
import Notification from "./Components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useChatStore } from "../lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in, fetch user info
        console.log("User authenticated:", user); // Log authenticated user
        fetchUserInfo(user?.uid);
      } else {
        // If no user is signed in, reset user state
        console.log("No user is signed in.");
        fetchUserInfo(null); // Call with null to reset the state
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  // console.log("Current User:", currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
