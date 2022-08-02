import React, { useState } from "react";
import { chatData } from "utils/stateData/chatData";
import { Badge, Input } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { updateCurrentMessageId } from "redux/actions/Message";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
//removed usehistory

const ChatMenu = ({ currentMessageId, updateCurrentMessageId }) => {
  const [list, setList] = useState(Object.values(chatData.supportChat));

  const openChat = (id) => {
    //console.log(id);
    // const data = list.map((elm) => {  unread message feature
    //   if (elm.id === id) {
    //     elm.unread = 0;
    //   }
    //   return elm;
    // });
    // setList(data);
    updateCurrentMessageId(id);
  };

  const searchOnChange = (e) => {
    const query = e.target.value;

    // const data = list.filter((item) => {
    //   if (query != "") {
    //     console.log(
    //       item.userName.toLowerCase().search(query).length > 0 ||
    //         item.udidNo.toString().includes(query)
    //     );
    //     return (
    //       item.userName.toLowerCase().includes(query) ||
    //       item.udidNo.toString().includes(query)
    //     );
    //   }
    // });
    // setList(data);
  };

  const prevTime = (item) => {
    const messages = Object.values(item.message);

    return messages.length > 1
      ? messages[messages.length - 1].timestamp
      : messages[0].timestamp;
  };

  const prevText = (item) => {
    const messages = Object.values(item.message);

    return messages.length > 1
      ? messages[messages.length - 1].content
      : messages[0].content;
  };

  return (
    <div className="chat-menu">
      <div className="chat-menu-toolbar">
        <Input
          placeholder="Search"
          onChange={searchOnChange}
          prefix={<SearchOutlined className="font-size-lg mr-2" />}
        />
      </div>
      <div className="chat-menu-list">
        {list.map((item, i) => (
          <div
            key={`chat-item-${item.userId}`}
            onClick={() => openChat(item.userId)}
            className={`chat-menu-list-item ${
              i === list.length - 1 ? "last" : ""
            } 
            ${item.userId === currentMessageId ? "selected" : ""}
            `}
          >
            <AvatarStatus
              text={item.userName.charAt(0).toUpperCase()}
              name={item.userName}
              subTitle={prevText(item)}
            />
            <div className="text-right">
              <div className="chat-menu-list-item-time">{prevTime(item)}</div>
              {/* {item.unread === 0 ? (
                <span></span>
              ) : (
                <Badge
                  count={item.unread}
                  style={{ backgroundColor:" #3e82f7" }}
                />
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ message }) => {
  const { currentMessageId } = message;
  return { currentMessageId };
};

const mapDispatchToProps = {
  updateCurrentMessageId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMenu);
