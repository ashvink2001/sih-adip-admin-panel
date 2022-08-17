import React, { useEffect, useState } from "react";
import { Input, Form, Button, Menu } from "antd";
import { SendOutlined, DeleteOutlined } from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import EllipsisDropdown from "components/EllipsisDropdown";
import AvatarStatus from "components/AvatarStatus";
import { onValue, push, ref } from "firebase/database";
import { database } from "firebaseConfig/config";

const menu = () => (
  <Menu>
    <Menu.Item key="3">
      <DeleteOutlined />
      <span>Delete Chat</span>
    </Menu.Item>
  </Menu>
);

const ChatConversation = ({ messageId, adminId }) => {
  const [form] = Form.useForm();
  const chatBodyRef = React.createRef();

  const [userDetail, setUserDetail] = useState({});

  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    fetchData(messageId);
  }, [messageId]);

  const fetchData = (currentId) => {
    onValue(ref(database, "supportChat/" + currentId), (snapshot) => {
      const value = snapshot.val();
      setUserDetail({
        userId: value.userId,
        udidNo: value.udidNo,
        userName: value.userName,
        profileImageUrl: value.profileImageUrl,
      });
      setMessageList(Object.values(value?.message));
    });
  };

  const scrollToBottom = () => {
    chatBodyRef.current.scrollToBottom();
  };

  const onSend = (value) => {
    if (value.newMsg) {
      let newMess = {
        content: value.newMsg,
        messagerId: adminId,
        messagerName: "support Staff",
        timestamp: Date.now(),
      };

      push(ref(database, "supportChat/" + messageId + "/message/"), newMess)
        .then(() => {
          form.resetFields();
          scrollToBottom();
        })
        .catch((err) => console.log(err));
    }
  };

  const chatContentHeader = (name) => (
    <div className="chat-content-header">
      <h4 className="mb-0">{name ? name : ""}</h4>
      <div>
        <EllipsisDropdown menu={menu} />
      </div>
    </div>
  );

  const chatContentBody = (props, id) => (
    <div className="chat-content-body">
      <Scrollbars ref={chatBodyRef} autoHide>
        {props.map((elm, i) => (
          <div
            key={`msg-${id}-${i}`}
            className={`msg  ${
              elm.messagerId === id ? "msg-sent" : "msg-recipient"
            }`}
          >
            {elm.messagerId !== id && (
              <div
                className="mr-2"
                style={{ display: "flex", alignItems: "end" }}
              >
                <AvatarStatus text={elm.messagerName.charAt(0).toUpperCase()} />
              </div>
            )}

            <div className={`bubble`}>
              <div
                className="bubble-wrapper"
                style={
                  elm.messagerId === id
                    ? {
                        borderBottomRightRadius: "0rem",
                      }
                    : { borderBottomLeftRadius: "0rem" }
                }
              >
                {elm.messagerId !== id && (
                  <div
                    style={{
                      fontSize: ".6rem",
                      margin: "-.4rem 0rem .3rem -.3rem",
                    }}
                  >
                    {`~ ${elm.messagerName}`}
                  </div>
                )}
                {elm.content}
                <div
                  style={{
                    fontSize: ".6rem",
                    margin: ".3rem 0rem -0.4rem 0rem",
                    textAlign: "end",
                  }}
                >
                  {new Date(elm.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
            {elm.messagerId === id && (
              <div
                className="ml-2"
                style={{
                  display: "flex",
                  alignItems: "end",
                  marginLeft: "8px",
                }}
              >
                <AvatarStatus text={elm.messagerName.charAt(0).toUpperCase()} />
              </div>
            )}
          </div>
        ))}
      </Scrollbars>
    </div>
  );

  const chatContentFooter = () => (
    <div className="chat-content-footer">
      <Form form={form} onFinish={onSend} className="w-100">
        <Form.Item name="newMsg" className="mb-0">
          <Input
            autoComplete="off"
            placeholder="Type a message..."
            suffix={
              <div className="d-flex align-items-center">
                <Button
                  shape="circle"
                  type="primary"
                  size="small"
                  htmlType="submit"
                  icon={<SendOutlined />}
                />
              </div>
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
  return (
    <div className="chat-content">
      {chatContentHeader(userDetail?.userName)}
      {chatContentBody(messageList, adminId)}
      {chatContentFooter()}
    </div>
  );
};

export default ChatConversation;
