import React from "react";
import InnerAppLayout from "../inner-app-layout";
import ChatContent from "./ChatContent";
import ChatMenu from "./ChatMenu";

const Chat = (props) => {
  return (
    <div className="chat">
      <InnerAppLayout
        sideContent={<ChatMenu {...props} />}
        mainContent={<ChatContent {...props} />}
        sideContentWidth={450}
        sideContentGutter={false}
        border
      />
    </div>
  );
};

export default Chat;
