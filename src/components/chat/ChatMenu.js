import React, { useState } from "react";
import { chatData } from "utils/stateData/chatData";
import { Badge, Input } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { updateCurrentMessageId } from "redux/actions/Message";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
//removed usehistory

const ChatMenu = ({ currentMessageId, updateCurrentMessageId }) => {
  const [list, setList] = useState(chatData.message);

  const openChat = (id) => {
    console.log(id);
    // const data = list.map((elm) => {
    //   if (elm.id === id) {
    //     elm.unread = 0;
    //   }
    //   return elm;
    // });
    // setList(data);
    // updateCurrentMessageId(id)
  };

  const searchOnChange = (e) => {
    const query = e.target.value;
    const data = ChatData.filter((item) => {
      return query === "" ? item : item.userName.toLowerCase().includes(query);
    });
    setList(data);
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
            key={`chat-item-${item.uidNo}`}
            onClick={() => openChat(item.uidNo)}
            className={`chat-menu-list-item ${
              i === list.length - 1 ? "last" : ""
            } 
            `} //${item.uidNo === uidNo ? "selected" : ""}
          >
            <AvatarStatus
              text={item.userName.charAt(0).toUpperCase()}
              name={item.userName}
              subTitle={
                item.message.length > 1
                  ? item.message[item.message.length - 1].content
                  : item.message[0].content
              }
            />
            <div className="text-right">
              <div className="chat-menu-list-item-time">{23452345}</div>
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
