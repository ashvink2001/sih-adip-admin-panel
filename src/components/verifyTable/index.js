import { Button, Modal, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { UserAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const VerifyTable = ({ list }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const tableColumns = [
    {
      title: "Name",
      key: "name",
      render: (data) => (
        <div className="d-flex align-items-center">
          <AvatarStatus
            id={data.udidNo}
            name={data.name}
            src={data.profileImageUrl ? data.profileImageUrl : ""}
          />
        </div>
      ),
    },
    {
      title: "UDID No",
      key: "udidNo",
      render: (data) => (
        <div className="d-flex align-items-center">{data.udidNo}</div>
      ),
    },
    {
      title: "Date Of Birth",
      key: "dob",
      render: (data) => (
        <div className="d-flex align-items-center">{data.dateOfBirth}</div>
      ),
    },
    {
      title: "Phone Number",
      key: "phnumber",
      render: (data) => (
        <div className="d-flex align-items-center">{data.mobileNo}</div>
      ),
    },
    {
      title: "Action",
      key: "check",
      render: (data) => (
        <div className="d-flex align-items-center">
          <Button
            icon={<UserAddOutlined />}
            type="default"
            size="small"
            style={{
              marginRight: ".8rem",
              color: "#f0e130",
              borderColor: "#f0e130",
            }}
            onClick={() => setModalVisible((prevState) => !prevState)}
          >
            Verify
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        className="no-border-last"
        columns={tableColumns}
        dataSource={list}
        rowKey="_id"
        pagination={true}
        style={{ height: "20rem" }}
      />
      <Modal
        title="Verify the Document"
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};

export default VerifyTable;
