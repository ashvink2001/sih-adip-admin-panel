import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Bg from "images/chatBg.png";
import ChatConversation from "./ChatConversation";

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
  const { token } = useSelector((state) => state.auth);
  return currentMessageId ? (
    <ChatConversation messageId={currentMessageId} adminId={token} />
  ) : (
    <ConversationEmpty />
  );
};

export default ChatContent;
