import { namedQuery } from "firebase/firestore";
import { reducerCases } from "./constants";

export const initialState = {
  userInformation: undefined,
  currentChatUser: undefined,
  socket: undefined,
  videoCall: undefined,
  voiceCall: undefined,
  incomingVideoCall: undefined,
  incomingVoiceCall: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInformation: action.userInformation,
      };

    case reducerCases.CHANGE_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.user,
      };

    case reducerCases.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };

    case reducerCases.SET_VIDEO_CALL:
      return {
        ...state,
        videoCall: action.videoCall,
      };

    case reducerCases.SET_INCOMING_VIDEO_CALL:
      return {
        ...state,
        incomingVideoCall: action.incomingVideoCall,
      };

    case reducerCases.SET_VOICE_CALL:
      return {
        ...state,
        voiceCall: action.voiceCall,
      };

    case reducerCases.SET_INCOMING_VOICE_CALL:
      return {
        ...state,
        incomingVoiceCall: action.incomingVoiceCall,
      };

    case reducerCases.END_CALL:
      return {
        ...state,
        voiceCall: undefined,
        videoCall: undefined,
        incomingVideoCall: undefined,
        incomingVoiceCall: undefined,
      };

    case reducerCases.default:
      return state;
  }
};

export default reducer;
