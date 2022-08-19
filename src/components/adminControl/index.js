import { Button, Card, Col, Row, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import React from "react";

import {
  UserAddOutlined,
  ExclamationCircleOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

const AdminControl = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card
            title="New Join Member"
            extra={cardDropdown(newJoinMemberOption)}
          >
            <div className="mt-3">
              {newMembersData.map((elm, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <AvatarStatus
                    id={i}
                    text={utils.getNameInitial(elm.name)}
                    name={elm.name}
                    subTitle={elm.role}
                  />
                  <div>
                    <Button
                      icon={<UserAddOutlined />}
                      onClick={() =>
                        confirm({
                          title: "Do you Want to Accept this Member ?",
                          icon: <ExclamationCircleOutlined />,
                          content:
                            "Please check his name and role before accept him",
                          onOk() {
                            manageUser("approveUser", elm.userId, "true").then(
                              (res) => {
                                if (res === "success") {
                                  updateApprovalList();
                                }
                              }
                            );
                          },
                          onCancel() {},
                        })
                      }
                      type="default"
                      size="small"
                      style={{ marginRight: ".8rem" }}
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() =>
                        confirm({
                          title: "Do you Want to Reject this Member ?",
                          icon: <ExclamationCircleOutlined />,
                          content: "All data related this member will removed",
                          onOk() {
                            removeUser(elm.userId).then((data) => {
                              if (data === "success") {
                                updateUsersData();
                              }
                            });
                          },
                          onCancel() {},
                        })
                      }
                      icon={<UserDeleteOutlined />}
                      type="default"
                      size="small"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card
            title="Member Control"
            extra={cardDropdown(latestTransactionOption)}
          >
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={userData}
              rowKey="_id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminControl;
