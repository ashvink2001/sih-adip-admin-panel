import { Button, Modal, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { UserAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import VerificationForm from "components/VerificationForm";
import { database } from "firebaseConfig/config";
import { push, ref, remove, set, update } from "firebase/database";
import { useSelector } from "react-redux";

const VerifyTable = ({ list, loadingStatus }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const { token } = useSelector((state) => state.auth);

  const handleApproved = async (values) => {
    const { state, district, userId, udidNo, fcmToken } = selectedUser;

    //verify,message,add lat long

    await update(
      ref(database, "USERS/" + state + "/" + district + "/" + userId),
      {
        "requestStatus/verified": true,
        "requestStatus/notAppropriate": false,
        "requestStatus/message": "verified Success soon equipment dispatch",
        "requestStatus/verifierId": token,
      }
    )
      .then(async () => {
        for (let ngo of values.ngo) {
          await push(
            ref(
              database,
              "USERS/" +
                state +
                "/" +
                district +
                "/" +
                userId +
                "/" +
                "requestStatus/ngoList"
            ),
            {
              ngoId: ngo.ngoId,
              aidsList: ngo.aidsList,
              aidsReceived: false,
            }
          );
        }
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
        fcmToken: fcmToken,
      }
    );

    //creating verificationList
    await set(ref(database, "verificationList/" + userId), {
      udid: udidNo,
    });

    //removed from verificationApplied
    remove(
      ref(
        database,
        "verificationApplied/" + state + "/" + district + "/" + userId
      )
    ).catch((err) => {
      console.log(err);
    });
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
            {new Date(data.requestStatus.appliedOnTimeStamp).toDateString()}
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
        loading={loadingStatus}
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
