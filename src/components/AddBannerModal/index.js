import DataDisplayWidget from "components/DataDisplayWidget";
import React, { useState } from "react";

import { VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { push, ref, set } from "firebase/database";
import { database } from "firebaseConfig/config";

const AddBannerModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    console.log(value);
    set(
      push(ref(database, "updatesBanner/"), {
        contentUrl: value.redirectUrl,
        imageUrl: value.imageUrl,
      })
        .then(() => {
          setIsModalVisible(false);
          form.resetFields();
          alert("Banner Added");
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  return (
    <div>
      <DataDisplayWidget
        icon={<VideoCameraAddOutlined />}
        value="Add  New Banner"
        color="gold"
        vertical={true}
        avatarSize={55}
      >
        <Button onClick={() => setIsModalVisible(true)}>Add Banner ?</Button>
        <Modal
          title="Add New Banner"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item
              label="Redirect Url"
              name="redirectUrl"
              rules={[{ required: true, message: "Please input url!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Banner Image Url"
              name="imageUrl"
              rules={[{ required: true, message: "Please input url!" }]}
            >
              <Input />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: "25%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: "2rem" }}
                >
                  Submit
                </Button>
                <Button
                  key="cancel"
                  onClick={() => setIsModalVisible(false)}
                  danger
                  type="primary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </Modal>
      </DataDisplayWidget>
    </div>
  );
};

export default AddBannerModal;
