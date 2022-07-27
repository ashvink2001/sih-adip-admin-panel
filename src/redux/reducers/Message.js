import { REMOVE_MESSAGE_ID, UPDATE_MESSAGE_ID } from "../constants/Message";

const initState = {
  currentMessageId: "",
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE_ID:
      return {
        ...state,
        currentMessageId: action.messageId,
      };
    case REMOVE_MESSAGE_ID:
      return {
        ...state,
        currentMessageId: "",
      };
    default:
      return state;
  }
};

export default auth;
