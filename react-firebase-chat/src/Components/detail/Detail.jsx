import React, { useState, useEffect } from "react";
import { auth } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";
import { updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { doc, arrayRemove, arrayUnion } from "firebase/firestore";
import "./detail.css";

const Detail = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  // State to control the visibility of each section
  const [isChatSettingsOpen, setChatSettingsOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [isPhotosOpen, setPhotosOpen] = useState(false);
  const [isFilesOpen, setFilesOpen] = useState(false);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>{user?.about || "Lorem ipsum dolor sit amet."}</p>
      </div>

      <div className="info">
        <div className="option">
          <div
            className="title"
            onClick={() => setChatSettingsOpen(!isChatSettingsOpen)}
          >
            <span>Chat Settings</span>
            <img
              src={isChatSettingsOpen ? "./arrowDown.png" : "./arrowUp.png"}
              alt=""
            />
          </div>
          {isChatSettingsOpen && (
            <div className="content">Chat Settings Content</div>
          )}
        </div>

        <div className="option">
          <div className="title" onClick={() => setPrivacyOpen(!isPrivacyOpen)}>
            <span>Privacy & Help</span>
            <img
              src={isPrivacyOpen ? "./arrowDown.png" : "./arrowUp.png"}
              alt=""
            />
          </div>
          {isPrivacyOpen && (
            <div className="content">Privacy & Help Content</div>
          )}
        </div>

        <div className="option">
          <div className="title" onClick={() => setPhotosOpen(!isPhotosOpen)}>
            <span>Shared Photos</span>
            <img
              src={isPhotosOpen ? "./arrowDown.png" : "./arrowUp.png"}
              alt=""
            />
          </div>
          {isPhotosOpen && (
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
            </div>
          )}
        </div>

        <div className="option">
          <div className="title" onClick={() => setFilesOpen(!isFilesOpen)}>
            <span>Shared Files</span>
            <img
              src={isFilesOpen ? "./arrowDown.png" : "./arrowUp.png"}
              alt=""
            />
          </div>
          {isFilesOpen && <div className="content">
          <a
href="/path-to-your-pdf-file/1T01237-w24.pdf"
download="Sem-VII"
className="download-link"
>
Download Sem-VII PDF
</a>
          </div>}
        </div>
      </div>

      <div className="detail_actions">
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block user"}
        </button>

        <button className="Logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
