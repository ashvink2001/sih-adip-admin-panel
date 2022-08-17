import { Button, Modal, Table } from "antd";
import AvatarStatus from "components/AvatarStatus";
import { UserAddOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import VerificationForm from "components/VerificationForm";
import { database, storage } from "firebaseConfig/config";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import { useSelector } from "react-redux";
import {
  getBlob,
  getDownloadURL,
  getMetadata,
  ref as sRef,
} from "firebase/storage";

const VerifyTable = ({ list, loadingStatus }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const { token } = useSelector((state) => state.auth);

  const handleApproved = async (values) => {
    const { state, district, userId, udidNo, fcmToken, key } = selectedUser;
    //verify,message,add nog list
    let obj = {};
    Object.values(values.ngo).map(
      (value) =>
        (obj[Math.floor(100000 + Math.random() * 900000)] = {
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
        verified: true,
        notAppropriate: false,
        message: "verified Success soon equipment dispatch",
        verifierId: token,
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
        console.log(snapshot.val());
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

  // function blobToBase64(blob) {
  //   return new Promise((resolve, _) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.readAsDataURL(blob);
  //   });
  // }

  useEffect(() => {
    // const storageRef = sRef(storage, "UDID-1.jpg");
    //fetch(
    //"https://firebasestorage.googleapis.com/v0/b/adip-78b9c.appspot.com/o/UDID-1.jpg?alt=media&token=bc29d1b4-2eb4-44ad-846d-b72a876bd17e",
    //{
    //Authorization: "AIzaSyDa1FrqVA3CBHBmNZhA07VwHd_3Rol3-rk",
    //mode: "no-cors",
    //}
    //).then((res) => {
    // console.log(res.blob().then((res) => console.log(res)));
    // blobToBase64(res.blob()).then((res) => {
    //   console.log(res);
    // });
    //});
    // getMetadata(storageRef)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // getBlob(storageRef)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // let body = JSON.stringify({
    //   requests: [
    //     {
    //       features: [
    //         { type: "TEXT_DETECTION", maxResults: 5 },
    //         { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
    //       ],
    //       image: {
    //         source: {
    //           imageUri: base64ToBuffer,
    //         },
    //       },
    //     },
    //   ],
    // });
    // let response = fetch(
    //   "https://vision.googleapis.com/v1/images:annotate?key=" +
    //     "AIzaSyAdVrNSjHGuPLeADPOJwOoohEXZIC3nhos",
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: body,
    //   }
    // );
    // console.log(response);
  }, []);

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
