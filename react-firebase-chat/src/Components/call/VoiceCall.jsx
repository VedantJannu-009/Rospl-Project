import React, { lazy, Suspense, useEffect } from "react";
import { useStateProvider } from "../../../context/StateContext";

const Container = lazy(() => import("./Container.jsx"));

function VoiceCall() {
  const [{ voiceCall, socket, userInformation }] = useStateProvider();
  useEffect(() => {
    if (voiceCall.type === "out-going") {
      socket.current.emit("out-going-voice-call", {
        to: voiceCall.id,
        from: {
          id: userInformation.id,
          avatar: userInformation.avatar,
          name: userInformation.name,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container data={VoiceCall} />
    </Suspense>
  );
}
export default VoiceCall;
