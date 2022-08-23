import { Card, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import React from "react";

const ManageAdmin = ({ adminData }) => {
  const tableColumns = [
    {
      title: "Member Name",
      dataIndex: "name",
      width: 150,
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
      width: 300,
      key: "userId",
      render: (data) => <div className="d-flex align-items-center">{data}</div>,
    },

    {
      title: "Email",
      dataIndex: "email",
      width: 150,
      key: "email",
      render: (data) => <div className="d-flex align-items-center">{data}</div>,
    },
    {
      title: "Given Access",
      dataIndex: "access",
      width: 200,
      key: "access",
      render: (data) => (
        <div className="d-flex align-items-center">{data.join(" - ")}</div>
      ),
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      width: 100,
      render: (data) => (
        <div className="d-flex align-items-center">
          {data ? "Allowed" : "Not Allowed"}
        </div>
      ),
    },
  ];

  return (
    <>
      <Card title="Admin List" style={{ height: "30rem" }}>
        <Table
          className="no-border-last"
          columns={tableColumns}
          dataSource={adminData}
          rowKey="userId"
          pagination={true}
          scroll={{
            x: 1000,
            y: 300,
          }}
        />
      </Card>
    </>
  );
};

export default ManageAdmin;
