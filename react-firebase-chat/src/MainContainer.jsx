import { useEffect, useRef, useState } from "react";
import Chat from "./Components/chat/Chat";
import Detail from "./Components/detail/Detail";
import List from "./Components/list/List";
import Login from "./Components/Login/login";
import Notification from "./Components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useChatStore } from "../lib/chatStore";
import EmptyChat from "./Components/chat/EmptyChat";
import EmptyDetails from "./Components/detail/EmptyDetails";
import { StateProvider, useStateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import VideoCall from "./Components/call/VideoCall";
import VoiceCall from "./Components/call/VoiceCall";
import "./App.css";
import { reducerCases } from "../context/constants";
import { io } from "socket.io-client";
import { HOST } from "../utils/ApiRoutes";
import IncomingVideoCall from "./Components/call/IncomingVideoCall";
import IncomingVoiceCall from "./Components/call/IncomingVoiceCall";

const MainContainer = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  const [
    {
      userInformation,
      currentChatUser,
      videoCall,
      voiceCall,
      incomingVideoCall,
      incomingVoiceCall,
    },
    dispatch,
  ] = useStateProvider();

  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);

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

  useEffect(() => {
    if (currentUser) {
      console.log("got currentUser: ", currentUser);
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInformation: {
          id: currentUser.id,
          name: currentUser.username,
          email: currentUser.email,
          avatar: currentUser.avatar,
        },
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (userInformation) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInformation.id);
      dispatch({
        type: reducerCases.SET_SOCKET,
        socket,
      });
    }
  }, [userInformation]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("incoming-voice-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          incomingVoiceCall: { ...from, roomId, callType },
        });
      });

      socket.current.on("incoming-video-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          incomingVideoCall: { ...from, roomId, callType },
        });
      });

      socket.current.on("voice-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL,
        });
      });

      socket.current.on("video-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL,
        });
      });
    }
  }, [socket.current]);

  // console.log("Current User:", currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {incomingVideoCall && <IncomingVideoCall />}
      {incomingVoiceCall && <IncomingVoiceCall />}
      {videoCall && (
        <div className="callContainer">
          <VideoCall />
        </div>
      )}
      {voiceCall && (
        <div className="callContainer">
          <VoiceCall />
        </div>
      )}

      {!videoCall && !voiceCall && (
        <>
          {currentUser ? (
            <>
              <List />
              {chatId ? <Chat /> : <EmptyChat />}
              {chatId ? <Detail /> : <EmptyDetails />}
            </>
          ) : (
            <Login />
          )}
        </>
      )}

      <Notification />
    </div>
  );
};

export default MainContainer;
