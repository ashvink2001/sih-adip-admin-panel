import React from "react";
import { chatData } from "utils/stateData/chatData";
import { Avatar, Divider, Input, Form, Button, Menu } from "antd";
import {
  FileOutlined,
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
  AudioMutedOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import Flex from "components/Flex";
import EllipsisDropdown from "components/EllipsisDropdown";
import Image from "next/image";
import Link from "next/link";
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

  // componentDidUpdate(prevProps) {
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     this.getConversation(this.getUserId());
  //   }
  //   this.scrollToBottom();
  // }

  // getUserId() {
  //   const { id } = this.props.match.params;
  //   return parseInt(parseInt(id));
  // }

  getConversation = (currentId) => {
    const data = chatData.supportChat[currentId];
    this.setState({
      info: data,
      msgList: Object.values(data?.message) || [],
    });
  };

  // getMsgType = (obj) => {
  //   switch (obj.msgType) {
  //     case "text":
  //       return <span>{obj.text}</span>;
  //     case "image":
  //       return <Image src={obj.text} alt={obj.text} />;
  //     case "file":
  //       return (
  //         <Flex alignItems="center" className="msg-file">
  //           <FileOutlined className="font-size-md" />
  //           <span className="ml-2 font-weight-semibold text-link pointer">
  //             <u>{obj.text}</u>
  //           </span>
  //         </Flex>
  //       );
  //     default:
  //       return null;
  //   }
  // };

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
              elm.userId === id ? "msg-sent" : "msg-recipient"
            }`} //${elm.msgType === "date" ? "datetime" : ""}
          >
            <div className="mr-2">
              <AvatarStatus name="dd" />
            </div>

            <div className={`bubble ml-5`}>
              {/* ${!elm.avatar ? "ml-5" : ""} */}
              <div className="bubble-wrapper">{elm.content}</div>
            </div>

            {/* {elm.msgType === "date" ? <Divider>{elm.time}</Divider> : null} */}
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
                {/* <Button
                  type="link"
                  size="large"
                  className="text-dark font-size-lg mr-3"
                  onClick={this.emptyClick}
                  icon={<SmileOutlined />}
                /> */}
                {/* 
                <Button
                  type="link"
                  size="large"
                  className="text-dark font-size-lg mr-3"
                  onClick={this.emptyClick}
                  icon={<PaperClipOutlined />}
                /> */}

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
