import { Button, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { UserAddOutlined } from "@ant-design/icons";
import React from "react";

const tableColumns = [
  {
    title: "Member",
    dataIndex: "userData",
    key: "name",
    render: (data, record) => (
      <div className="d-flex align-items-center">
        <AvatarStatus
          id={record._id}
          text={utils.getNameInitial(data.name)}
          name={data.name}
          subTitle={record.role}
          src={data.avatarUrl ? data.avatarUrl : ""}
        />
      </div>
    ),
  },
  {
    title: "Role",
    key: "date",
    render: (data) => <div className="d-flex align-items-center">{data}</div>,
  },
  {
    title: "Ban",
    key: "amount",
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
        >
          Ban
        </Button>
      </div>
    ),
  },
];

const VerifyTable = ({ list }) => {
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
    </div>
  );
};

export default VerifyTable;
