import { UPDATE_MESSAGE_ID, REMOVE_MESSAGE_ID } from "../constants/Message";

export const updateCurrentMessageId = (id) => {
  return {
    type: UPDATE_MESSAGE_ID,
    messageId: id,
  };
};
export const removeCurrentMessageId = () => {
  return {
    type: REMOVE_MESSAGE_ID,
  };
};
