import { Button, Modal, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { UserAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import VerificationForm from "components/VerificationForm";
import { database } from "firebaseConfig/config";
import { ref, set, update } from "firebase/database";

const VerifyTable = ({ list }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleApproved = async () => {
    const { state, district, userId, udidNo, fcmToken } = selectedUser;
    //verify,message,add lat long
    await update(
      ref(database, "USERS/" + state + "/" + district + "/" + userId),
      {
        "requestStatus/verified": true,
        //temp
        "requestStatus/notAppropriate": false,
        "requestStatus/message": "verified Success soon equipment dispatch",
        "requestStatus/latLng/lat": "2.0",
        "requestStatus/latLng/lng": "2.0",
      }
    )
      .then(() => {
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
    //creating verificationCompleted
    await set(
      ref(
        database,
        "verificationCompleted/" + state + "/" + district + "/" + userId
      ),
      {
        district: district,
        state: state,
        userId: userId,
      }
    );
    //creating verificationList
    await set(ref(database, "verificationList/" + userId), {
      udid: udidNo,
    });

    //set notification

    // await getMessage().subscribeToTopic(fcmToken,"Request Verified").then
  };
  const handleNotApproved = async (message) => {
    const { state, district, userId } = selectedUser;

    await update(
      ref(database, "USERS/" + state + "/" + district + "/" + userId),
      {
        "requestStatus/notAppropriate": true,
        "requestStatus/message": message,
      }
    )
      .then(() => {
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

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
      title: "Applied on",
      key: "appliedOn",
      render: (data) => {
        return (
          <div className="d-flex align-items-center">
            {new Date(
              data.requestStatus.appliedOnTimeStamp * 1000
            ).toDateString()}
          </div>
        );
      },
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
            onClick={() => {
              setSelectedUser(data);
              setModalVisible((prevState) => !prevState);
            }}
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
        rowKey="udidNo"
        pagination={true}
        style={{ height: "20rem" }}
      />
      <Modal
        title="Verify the Document"
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={1000}
      >
        <VerificationForm
          userData={selectedUser}
          setModalVisible={setModalVisible}
          handleApproved={handleApproved}
          handleNotApproved={handleNotApproved}
        />
      </Modal>
    </div>
  );
};

export default VerifyTable;
