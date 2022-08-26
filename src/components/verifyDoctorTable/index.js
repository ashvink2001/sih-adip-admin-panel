import { Button, Modal, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { UserAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { database } from "firebaseConfig/config";
import { onValue, ref, set, update } from "firebase/database";
import { useSelector } from "react-redux";
import DoctorVerificationForm from "components/DoctorVerificationForm";

const VerifyDoctorTable = ({ list, loadingStatus }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const { token } = useSelector((state) => state.auth);

  const handleApproved = async (values) => {
    const { state, district, userId, udidNo, fcmToken, key } = selectedUser;
    //verify,message,add nog list
    let obj = {};
    Object.values(values.ngo).map(
      (value) =>
        (obj[key] = {
          ...value,
          aidsReceived: false,
        })
    );
    await update(
      ref(
        database,
        "USERS/" +
          state +
          "/" +
          district +
          "/" +
          userId +
          "/requestStatus/" +
          key
      ),
      {
        doctorVerification: true,
        notAppropriate: false,
        message: "verified Success soon equipment dispatch",
        doctorId: token,
        ngoList: obj,
      }
    )
      .then(async () => {
        setModalVisible(false);
      })
      .catch((err) => console.log(err));

    //creating verificationCompleted

    for (let ngo of values.ngo) {
      await onValue(ref(database, "CAMPING/" + ngo.ngoId), (snapshot) => {
        let { state: ngoState, district: ngoDistrict } = snapshot.val();
        set(
          ref(
            database,
            "verificationCompleted/" +
              ngoState +
              "/" +
              ngoDistrict +
              "/" +
              userId
          ),
          {
            district: district,
            state: state,
            userId: userId,
            fcmToken: fcmToken,
          }
        );
      });
    }

    // //creating verificationList
    await set(ref(database, "verificationList/" + userId), {
      udid: udidNo,
    });
    //removed from verificationApplied
    // remove(
    //   ref(
    //     database,
    //     "verificationApplied/" + state + "/" + district + "/" + userId
    //   )
    // ).catch((err) => {
    //   console.log(err);
    // });
  };

  const handleNotApproved = async (message) => {
    const { state, district, userId, key } = selectedUser;

    await update(
      ref(
        database,
        "USERS/" +
          state +
          "/" +
          district +
          "/" +
          userId +
          "/requestStatus/" +
          key
      ),
      {
        notAppropriate: true,
        message: message,
      }
    )
      .then(() => {
        setModalVisible(false);
        //aid list remove the aid that are rejected
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
        rowKey="key"
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
        <DoctorVerificationForm
          userData={selectedUser}
          setModalVisible={setModalVisible}
          handleApproved={handleApproved}
          handleNotApproved={handleNotApproved}
        />
      </Modal>
    </div>
  );
};

export default VerifyDoctorTable;
