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
import EmptyChat from "./Components/chat/EmptyChat";
import EmptyDetails from "./Components/detail/EmptyDetails";
import { StateProvider, useStateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import MainContainer from "./MainContainer";

const App = () => {
  

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <MainContainer />
    </StateProvider>
  );
};

export default App;
