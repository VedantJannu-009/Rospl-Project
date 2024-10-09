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
    <div className="h-[7rem] w-[15rem] fixed bottom-5 right-12 z-50 flex gap-6 items-center justify-evenly p-1 text-white border-2 py-2 bg-inherit rounded-2xl">
      <div>
        <img
          src={incomingVideoCall?.avatar || "./avatar.png"}
          alt="avatar"
          width={70}
          height={70}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
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
