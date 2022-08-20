import { Card, Modal, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import React from "react";

const ManageAdmin = ({ adminData }) => {
  const tableColumns = [
    {
      title: "Member Name",
      dataIndex: "name",
      key: "name",
      render: (data) => (
        <div className="d-flex align-items-center">
          <AvatarStatus text={data.charAt(0).toUpperCase()} name={data} />
        </div>
      ),
    },
    {
      title: "Admin Id",
      dataIndex: "userId",
      key: "userId",
      render: (data) => <div className="d-flex align-items-center">{data}</div>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (data) => <div className="d-flex align-items-center">{data}</div>,
    },
    {
      title: "Given Access",
      dataIndex: "access",
      key: "access",
      render: (data) => (
        <div className="d-flex align-items-center">{data.join(" - ")}</div>
      ),
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      render: (data) => (
        <div className="d-flex align-items-center">
          {data ? "Allowed" : "Not Allowed"}
        </div>
      ),
    },
  ];

  return (
    <>
      <Card title="Member Control" style={{ height: "30rem" }}>
        <Table
          className="no-border-last"
          columns={tableColumns}
          dataSource={adminData}
          rowKey="userId"
          pagination={true}
        />
      </Card>
    </>
  );
};

export default ManageAdmin;
