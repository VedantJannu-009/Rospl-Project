import { useEffect, useState } from "react";
import "./chatList.css";
import Adduser from "./addUser/addUser";
import { useUserStore } from "../../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useChatStore } from "../../../../lib/chatStore";
import { updateDoc } from "firebase/firestore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

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
    const userchats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userchats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    if (chatIndex !== -1) {
      userchats[chatIndex].isSeen = true;

      const userChatRef = doc(db, "userchats", currentUser.id);

      try {
        await updateDoc(userChatRef, {
          chats: userchats,
        });

        changeChat(chat.chatId, chat.user);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Use .includes() to correctly filter chats by username
  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
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
        filteredChats.map((chat) => (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#284ac7",
            }}
          >
            <img src={chat.user.avatar} alt="" />
            <div className="text">
              <span>{chat.user.username || "Unknown"}</span>
              <p>{chat.lastMessage || "No messages yet"}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}

      {addMode && <Adduser />}
    </div>
  );
};

export default ChatList;
