import React from "react";
import { useStateProvider } from "../../../context/StateContext";
import { reducerCases } from "../../../context/constants";

function IncomingVideoCall() {
  const [{ incomingVideoCall, socket }, dispatch] = useStateProvider();

  const acceptCall = () => {
    
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: { ...incomingVideoCall, type: "in-coming" },
    });

    socket.current.emit("accept-incoming-call", { id: incomingVideoCall.id });

    dispatch({
      type: reducerCases.SET_INCOMING_VIDEO_CALL,
      incomingVideoCall: undefined,
    });
  };

  const rejectCall = () => {
    socket.current.emit("reject-video-call", { from: incomingVideoCall.id });
    dispatch({ type: reducerCases.END_CALL });
  };

  return (
    <div
      style={{
        height: "6rem",
        width: "20rem",
        position: "fixed",
        bottom: "2rem",
        marginBottom: 0,
        right: "1.5rem",
        zIndex: 50,
        borderRadius: "0.125rem",
        display: "flex",
        gap: 5,
        alignItems: "center",
        justifyContent: "start",
        padding: "1rem",
        color: "white",
        filter: "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
        border: "2px",
        paddingLeft: "3.5rem",
        paddingRight: "3.5rem",
      }}
    >
      <div>
        <img
          src={incomingVideoCall?.avatar || "./avatar.png"}
          alt="avatar"
          width={70}
          height={70}
          style={{ borderRadius: "9999px" }}
        />
      </div>

      <div>
        <div>{incomingVideoCall.name}</div>
        <div style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
          Incoming Video Calll
        </div>
        <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
          <button
            style={{
              backgroundColor: "red",
              padding: 1,
              paddingLeft: 3,
              paddingRight: 3,
              borderRadius: "9999px",
            }}
            onClick={rejectCall}
          >
            Reject
          </button>

          <button
            style={{
              backgroundColor: "green",
              padding: 1,
              paddingLeft: 3,
              paddingRight: 3,
              borderRadius: "9999px",
            }}
            onClick={acceptCall}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingVideoCall;
