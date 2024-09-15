import { useEffect, useState } from "react";
import "./chatList.css";
import Adduser from "./addUser/addUser";
import { useUserStore } from "../../../../../../../ROSLP/Rospl-Project/react-firebase-chat/lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../../ROSLP/Rospl-Project/react-firebase-chat/lib/firebase";
import { useChatStore } from "../../../../../../../ROSLP/Rospl-Project/react-firebase-chat/lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  // Use Zustand hook with selector to get currentUser
  const currentUser = useUserStore((state) => state.currentUser);
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser) return; // If no user, exit early

    // Subscribe to user's chat changes
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const item = res.data().chats;

        const promises = item.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {/* Display chats */}
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
          >
            <img src="./avatar.png" alt="" />
            <div className="text">
              <span>{chat.user.username || "Unknown"}</span>
              <p>{chat.lastMessage || "No messages yet"}</p>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}

      {addMode && <Adduser />}
    </div>
  );
};

export default ChatList;
