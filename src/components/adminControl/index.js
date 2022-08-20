import { Button, Card, Col, Modal, Row, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import React, { useEffect } from "react";

import {
  UserAddOutlined,
  ExclamationCircleOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { onValue, ref, remove, update } from "firebase/database";
import { database } from "firebaseConfig/config";
import AddNgoModal from "components/AddNgoModal";
import ManageAdmin from "components/manageAdmins";

const AdminControl = () => {
  const [adminDetails, setAdminDetails] = useState([]);

  const [verifyList, setVerifyList] = useState([]);

  const { confirm } = Modal;

  useEffect(() => {
    onValue(ref(database, "admin/"), (snapshot) => {
      let adminList = Object.values(snapshot.val());
      setAdminDetails(adminList);

      onValue(ref(database, "verifyAdmin/"), (snapshot) => {
        if (snapshot.val()) {
          const values = Object.values(snapshot.val());
          let temp = [];
          values.map((id) => {
            temp.push(adminList.find((detail) => detail.userId === id));
          });
          setVerifyList(temp);
        }
      });
    });
  }, []);

  const removeAdminId = (id) => {
    remove(ref(database, "verifyAdmin/" + id)).catch((err) => console.log(err));
  };

  const approveRequest = (id) => {
    update(ref(database, "admin/" + id), {
      isApproved: true,
      permission: true,
    })
      .then(() => removeAdminId(id))
      .catch((err) => console.log(err));
  };

  const rejectRequest = (id) => {
    remove(ref(database, "admin/" + id))
      .then(() => removeAdminId(id))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Row gutter={16} style={{ marginTop: "1rem" }}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card
            title="New Admin Request"
            style={{ height: "30rem", overflowY: "scroll" }}
          >
            <div className="mt-3">
              {verifyList.map((elm, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <AvatarStatus
                    id={i}
                    text={elm?.name.charAt(0)}
                    name={elm?.name}
                    subTitle={elm?.access.join(" - ")}
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
                            approveRequest(elm.userId);
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
                            rejectRequest(elm.userId);
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
          <ManageAdmin adminData={adminDetails} />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={8}>
          <AddNgoModal />
        </Col>
      </Row>
    </div>
  );
};

export default AdminControl;
