import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import ManageNgo from "components/manageNgo";
import NgoSearch from "components/NgoSearch";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { ref, update } from "firebase/database";
import { database } from "firebaseConfig/config";

const { Option } = Select;

const Ngo = () => {
  const NgoMap = dynamic(() => import("components/ngoMap"), {
    ssr: false,
  });

  const [nogDetail, setNgoDetail] = useState({});
  const [visibleModel, setVisibleModel] = useState(false);

  const handleSearch = (camp) => {
    setNgoDetail(camp);
  };

  const handleSubmit = (value) => {
    console.log(value);
    update(ref(database, `CAMPING/${nogDetail.campId}/aidsData`), {
      [value.aidName]: value.quantity,
    });
  };

  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setNgoDetail((prevState) => ({
      ...prevState,
      aidsData: { ...prevState.aidsData, [name]: 0 },
    }));
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <>
      <Row gutter={16} style={{ margin: "1rem 0rem 0rem 0rem" }}>
        <Card title="NGO Panel" style={{ height: "90%", width: "100%" }}>
          <NgoSearch onSearchSubmit={handleSearch} />
        </Card>
      </Row>
      <Row justify="space-between">
        <Col xs={24} sm={24} md={24} lg={8} xl={16} xxl={15}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={24}
            xxl={24}
            style={{ height: "23rem" }}
          >
            <ManageNgo ngoDetails={nogDetail} />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={24}
            xxl={24}
            style={{ height: "18rem", width: "100%", marginTop: "1.5rem" }}
          >
            <NgoMap nogDetail={nogDetail.location} />
          </Col>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={7} xxl={8}>
          <Card
            title="Aids List"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                disabled={nogDetail.campId ? false : true}
                shape="circle"
                onClick={() => setVisibleModel(!visibleModel)}
              />
            }
          >
            <List
              style={{ overflowY: "scroll", height: "35rem" }}
              size="small"
              bordered
              dataSource={
                nogDetail.aidsData && Object.entries(nogDetail.aidsData)
              }
              renderItem={(item) => (
                <List.Item>
                  <div style={{ wordWrap: "break-word", width: "20rem" }}>
                    {item[0]}:{item[1]}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Please enter crt AID name"
        visible={visibleModel}
        onOk={() => {
          setVisibleModel(false);
        }}
        onCancel={() => {
          setVisibleModel(false);
        }}
      >
        <Form
          style={{ display: "flex", justifyContent: "space-around" }}
          name="aid"
          onFinish={handleSubmit}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "select Aid",
              },
            ]}
            name="aidName"
          >
            <Select
              style={{
                width: 250,
              }}
              placeholder="Enter/Select Aid"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
            >
              {nogDetail?.aidsData &&
                Object.keys(nogDetail.aidsData).map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            rules={[{ required: true, message: "Please Enter Quantity" }]}
          >
            <Input type="number" placeholder="Num" style={{ width: "6rem" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Ngo;
