import React, { useState, useEffect } from "react";
import { reducerCases } from "../../../context/constants";
import { MdOutlineCallEnd } from "react-icons/md";
import { useStateProvider } from "../../../context/StateContext";
import { GET_CALL_TOKEN } from "../../../utils/ApiRoutes";

import axios from "axios";

const Container = ({ data }) => {
  const [{ socket, userInformation }, dispatch] = useStateProvider();
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(undefined);
  const [zgVar, setZgVar] = useState(undefined);
  const [localStream, setLocalStream] = useState(undefined);
  const [publishStream, setPublishStream] = useState(undefined);

  const appId = EnterYourAppId;
  const serverSecret = "EnterYourServerSecret";
  const roomID = data.roomId.toString();

  useEffect(() => {
    if (data.type === "out-going") {
      socket.current.on("accept-call", () => {
        setCallAccepted(true);
      });
    } else {
      setTimeout(() => {
        setCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { token: returnedToken },
        } = await axios.get(
          `http://localhost:3001/generate-token/${userInformation.id}`
        );
        setToken(returnedToken);
        // console.log(token);
      } catch (error) {
        // console.log("error fetching token: ", error);
        console.error(error);
      }
    };

    getToken();
  }, [callAccepted]);

  useEffect(() => {
    const startCall = async () => {
      import("zego-express-engine-webrtc").then(
        async ({ ZegoExpressEngine }) => {
          const zg = new ZegoExpressEngine(appId, serverSecret);
          setZgVar(zg);

          zg.on(
            "roomStreamUpdate",
            async (roomID, updateType, streamList, extendedData) => {
              if (updateType === "ADD") {
                const rmVideo = document.getElementById("remote-video");
                const vd = document.createElement("video");
                vd.id = streamList[0].streamID;
                vd.className="absolute top-0 right-0 h-10 w-15"
                vd.autoplay = true;
                vd.playsInline = true;
                vd.muted = false;
                if (rmVideo) {
                  rmVideo.appendChild(vd);
                }
                zg.startPlayingStream(streamList[0].streamID, {
                  audio: false,
                  video: true,
                }).then((stream) => (vd.srcObject = stream));
              } else if (
                updateType === "DELETE" &&
                zg &&
                localStream &&
                streamList[0].streamID
              ) {
                zg.destroyStream(localStream);
                zg.stopPublishingStream(streamList[0].streamID);
                zg.logoutRoom(roomID);
              }
            }
          );

          await zg.loginRoom(
            roomID,
            token,
            {
              userID: userInformation.id.toString(),
              userName: userInformation.name,
            },
            { userUpdate: true }
          );

          const localStream = await zg.createStream({
            camera: { audio: false, video: true },
          });
          console.error("videoTraks: ", localStream.getVideoTracks()); // Should show valid video track(s)
          console.error("AudioTracks: ", localStream.getAudioTracks()); // Should show valid audio track(s)

          const localVideo = document.getElementById("local-audio");
          const videoElement = document.createElement("video");
          videoElement.id = "video-local-zego";
          // videoElement.className = "vlz";
          videoElement.className = "absolute top-0 left-0 h-10 w-15"
          videoElement.autoplay = true;
          videoElement.muted = false;
          videoElement.playsInline = true;

          localVideo.appendChild(videoElement);
          const td = document.getElementById("video-local-zego");
          td.srcObject = localStream;
          const streamID = "123" + Date.now();
          setPublishStream(streamID);
          setLocalStream(localStream);
          zg.startPublishingStream(streamID, localStream);
        }
      );
    };
    if (token) {
      startCall();
    }
  }, [token]);

  const endCall = () => {
    const id = data.id;
    if (zgVar && localStream && publishStream) {
      zgVar.destroyStream(localStream);
      zgVar.stopPublishingStream(publishStream);
      zgVar.logoutRoom(data.roomId.toString());
    }
    if (data.callType === "voice") {
      socket.current.emit("reject-voice-call", {
        from: id,
      });
    } else {
      socket.current.emit("reject-video-call", {
        from: id,
      });
    }
    dispatch({
      type: reducerCases.END_CALL,
    });
  };

  return (
    <div className="border-conversation-border border-1 w-full bg-conversatoin-panel-background flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white">
      <div className="flex flex-col gap-3 items-center ">
        <span className="text-5xl">{data.name}</span>
        <span className="text-lg">
          {callAccepted && data.callType !== "video"
            ? "on going call"
            : "Calling"}
        </span>
      </div>
      {(!callAccepted || data.callType === "audio") && (
        <div className="my-24">
          <img
            src={data?.avatar || "./avatar.png"}
            height={300}
            width={300}
            className="rounded-full"
          ></img>
        </div>
      )}

      <div className="my-5 relative" id="remote-video">
        <div  id="local-audio"></div>
      </div>

      <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full">
        <MdOutlineCallEnd
          className="text-3xl cursor-pointer"
          onClick={endCall}
        />
      </div>
    </div>
  );
};

export default Container;
