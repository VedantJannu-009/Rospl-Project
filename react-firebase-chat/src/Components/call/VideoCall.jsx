import React, { lazy, Suspense, useEffect } from "react";
import { useStateProvider } from "../../../context/StateContext";

const Container = lazy(() => import("./Container.jsx"));

function VideoCall() {
  const [{ videoCall, socket, userInformation }] = useStateProvider();
  useEffect(() => {
    if (videoCall.type === "out-going") {
      socket.current.emit("out-going-video-call", {
        to: videoCall.id,
        from: {
          id: userInformation.id,
          avatar: userInformation.avatar,
          name: userInformation.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container data={videoCall} />
    </Suspense>
  );
}
export default VideoCall;
