import React, { useEffect, useState } from "react";
import { Badge, Input } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { updateCurrentMessageId } from "redux/actions/Message";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig/config";

const ChatMenu = ({ currentMessageId, updateCurrentMessageId }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const openChat = (id) => {
    updateCurrentMessageId(id);
  };

  const fetchMessageData = () => {
    onValue(ref(database, "supportChat"), (snapshot) => {
      if (snapshot.val()) {
        setList(Object.values(snapshot.val()));
        setFilteredList(Object.values(snapshot.val()));
      }
    });
  };

  useEffect(() => {
    fetchMessageData();
  }, []);

  const searchOnChange = (e) => {
    const query = e.target.value;
    let data = [];
    if (query !== "") {
      data = list.filter((item) => {
        return (
          item.udidNo.toString().includes(query) ||
          item.userName.includes(query)
        );
      });
    } else {
      data = list;
    }
    setFilteredList(data);
  };

  const prevTime = (item) => {
    if (item?.message) {
      const messages = Object.values(item.message);

      let timestamp =
        messages.length > 1
          ? messages[messages.length - 1].timestamp
          : messages[0].timestamp;
      return new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const prevText = (item) => {
    if (item?.message) {
      const messages = Object.values(item.message);

      return messages.length > 1
        ? messages[messages.length - 1].content
        : messages[0].content;
    }
  };

  return (
    <div className="chat-menu">
      <div className="chat-menu-toolbar">
        <Input
          placeholder="Search by UDID no or Name"
          onChange={searchOnChange}
          prefix={<SearchOutlined className="font-size-lg mr-2" />}
        />
      </div>
      <div className="chat-menu-list">
        {filteredList.map((item, i) => (
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
              src={item.profileImageUrl}
              name={item.userName}
              subTitle={prevText(item)}
            />
            <div className="text-right">
              <div className="chat-menu-list-item-time">{prevTime(item)}</div>
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
