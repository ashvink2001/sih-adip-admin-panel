import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import Bg from "images/chatBg.png";

const ConversationEmpty = () => (
  <div className="chat-content-empty">
    <div className="text-center">
      <Image src={Bg} alt="Start a Conversation" height="100%" width="100%" />
      <h1 className="font-weight-light">Start a conversation</h1>
    </div>
  </div>
);

const ChatContent = () => {
  const { currentMessageId } = useSelector((state) => state.message);
  return currentMessageId ? (
    <Conversation messageId={currentMessageId} />
  ) : (
    <ConversationEmpty />
  );
};

export default ChatContent;
