import DataDisplayWidget from "components/DataDisplayWidget";
import React, { useState } from "react";

import { UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { push, ref, set, update } from "firebase/database";
import { database } from "firebaseConfig/config";
import { detail } from "utils/stateData/data";

const { Option } = Select;
const { TextArea } = Input;

const AddNgoModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    set(
      push(ref(database, "CAMPING/"), {
        campId: "",
        campingName: value.campName,
        password: value.password,
        emailId: value.emailId,
        state: value.state,
        district: value.district,
        mobileNo: value.mobileNumber,
        address: value.address,
      })
        .then((value) => {
          alert("New NGO Acc Added");
          setIsModalVisible(false);
          form.resetFields();
          setSelectedState("");
          //update key
          update(ref(database, "CAMPING/" + value.key + "/"), {
            campId: value.key,
          });
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  return (
    <div>
      <DataDisplayWidget
        icon={<UsergroupAddOutlined />}
        value="Add  Agency Account"
        color="red"
        vertical={true}
        avatarSize={55}
      >
        <Button onClick={() => setIsModalVisible(true)}>Add Account ?</Button>
        <Modal
          title="Add New Agency"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item
              label="Camp Name"
              name="campName"
              rules={[{ required: true, message: "Please input camp name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email Id"
              name="emailId"
              rules={[
                {
                  required: true,
                  message: "Please input your email address",
                },
                {
                  type: "email",
                  message: "Please enter a validate email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
                {
                  min: 6,
                  message: "minimum 6 character required",
                },
                {
                  max: 16,
                  message: "maximum 16 character allowed",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Select State"
              name="state"
              rules={[{ required: true, message: "Please Select State!" }]}
            >
              <Select
                size="large"
                name="state"
                style={{ width: "20rem" }}
                showSearch
                onChange={(value) => setSelectedState(value)}
                placeholder="Select The State"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {detail.states.map((state) => (
                  <Option key={state.state} value={state.state}>
                    {state.state}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Select District"
              name="district"
              rules={[{ required: true, message: "Please Select District!" }]}
            >
              <Select
                size="large"
                style={{ width: "20rem" }}
                showSearch
                placeholder="Please Select State to Search District"
                disabled={selectedState === ""}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {detail.states
                  .find((state) => state.state === selectedState)
                  ?.districts.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ph Number"
              name="mobileNumber"
              rules={[
                { required: true, message: "Please input mobile number!" },
                { len: 10 },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input address" }]}
            >
              <TextArea />
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
                  onClick={() => {
                    form.resetFields();
                    setIsModalVisible(false);
                  }}
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

export default AddNgoModal;
