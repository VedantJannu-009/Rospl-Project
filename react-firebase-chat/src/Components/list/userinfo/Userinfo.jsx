import "./userInfo.css";
import { useUserStore } from "../../../../lib/userStore";
import { useStateProvider } from "../../../../context/StateContext";
import { useEffect, useRef, useState } from "react";
import { reducerCases } from "../../../../context/constants";
import { io } from "socket.io-client";
import { HOST } from "../../../../utils/ApiRoutes";

const Userinfo = () => {
  const socket = useRef();
  const { currentUser, userInformation } = useUserStore();
  const [socketEvent, setSocketEvent] = useState(false);
  const [{}, dispatch] = useStateProvider();

  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h6>{currentUser.username} </h6>
      </div>

      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  );
};

export default Userinfo;
