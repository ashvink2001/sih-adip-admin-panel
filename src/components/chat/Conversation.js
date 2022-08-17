import React from "react";
import { chatData } from "utils/stateData/chatData";
import { Input, Form, Button, Menu } from "antd";
import {
  SendOutlined,
  AudioMutedOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import EllipsisDropdown from "components/EllipsisDropdown";
import AvatarStatus from "components/AvatarStatus";

const menu = () => (
  <Menu>
    <Menu.Item key="0">
      <UserOutlined />
      <span>User Info</span>
    </Menu.Item>
    <Menu.Item key="1">
      <AudioMutedOutlined />
      <span>Mute Chat</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <DeleteOutlined />
      <span>Delete Chat</span>
    </Menu.Item>
  </Menu>
);

export class Conversation extends React.Component {
  formRef = React.createRef();
  chatBodyRef = React.createRef();

  state = {
    info: {},
    msgList: [],
  };

  componentDidMount() {
    const id = this.props.messageId;
    this.getConversation(id);
  }

  getConversation = (currentId) => {
    const data = chatData.supportChat[currentId];
    console.log(data);
    this.setState({
      info: data,
      msgList: Object.values(data?.message) || [],
    });
  };

  scrollToBottom = () => {
    this.chatBodyRef.current.scrollToBottom();
  };

  onSend = (values) => {
    if (values.newMsg) {
      const newMsgData = {
        avatar: "",
        from: "me",
        msgType: "text",
        text: values.newMsg,
        time: "",
      };
      this.formRef.current.setFieldsValue({
        newMsg: "",
      });
      this.setState({
        msgList: [...this.state.msgList, newMsgData],
      });
    }
  };

  emptyClick = (e) => {
    e.preventDefault();
  };

  chatContentHeader = (name) => (
    <div className="chat-content-header">
      <h4 className="mb-0">{name}</h4>
      <div>
        <EllipsisDropdown menu={menu} />
      </div>
    </div>
  );

  chatContentBody = (props, id) => (
    <div className="chat-content-body">
      <Scrollbars ref={this.chatBodyRef} autoHide>
        {props.map((elm, i) => (
          <div
            key={`msg-${id}-${i}`}
            className={`msg  ${
              elm.messagerID === id ? "msg-sent" : "msg-recipient"
            }`}
          >
            {elm.messagerID !== id && (
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
                  elm.messagerID === id
                    ? {
                        borderBottomRightRadius: "0rem",
                      }
                    : { borderBottomLeftRadius: "0rem" }
                }
              >
                {elm.messagerID !== id && (
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
                  {new Date(elm.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            {elm.messagerID === id && (
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

  chatContentFooter = () => (
    <div className="chat-content-footer">
      <Form
        name="msgInput"
        ref={this.formRef}
        onFinish={this.onSend}
        className="w-100"
      >
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
                  onClick={this.onSend}
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

  render() {
    const id = this.props.messageId;
    const { info, msgList } = this.state;
    return (
      <div className="chat-content">
        {this.chatContentHeader(info.userName)}
        {this.chatContentBody(msgList, id)}
        {this.chatContentFooter()}
      </div>
    );
  }
}

export default Conversation;
