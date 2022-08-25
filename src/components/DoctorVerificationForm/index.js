import {
  Avatar,
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Tag,
} from "antd";
import React, { useState } from "react";
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig/config";
import { distanceFind } from "components/autoNgo";

const { Option } = Select;
const { TextArea } = Input;

const prevIcons = {
  rotateLeft: (
    <RotateLeftOutlined style={{ color: "#ffff", fontSize: "1.6rem" }} />
  ),
  rotateRight: (
    <RotateRightOutlined style={{ color: "#ffff", fontSize: "1.6rem" }} />
  ),
  zoomIn: <ZoomInOutlined style={{ color: "#ffff", fontSize: "1.6rem" }} />,
  zoomOut: <ZoomOutOutlined style={{ color: "#ffff", fontSize: "1.6rem" }} />,
  close: <CloseOutlined style={{ color: "#ffff", fontSize: "1.6rem" }} />,
  left: <LeftOutlined style={{ color: "#ffff", fontSize: "1.6rem" }} />,
  right: <RightOutlined style={{ color: "#ffff", fontSize: "1.6rem" }} />,
};

const DoctorVerificationForm = ({
  userData,
  setModalVisible,
  handleApproved,
  handleNotApproved,
}) => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState(userData.requestStatus?.message || "");
  const [campList, setCampList] = useState();

  const { disabilityCertificateURL } = userData.requestStatus.aidsDocs;

  const generatedNgo = (ngoValues) => {
    let finalCamp = { ngo: [] };
    ngoValues.map((ngo) => {
      finalCamp.ngo.push({
        ngoId: ngo.camp.campId,
        aidsReceived: false,
        aidsList: [ngo.name],
      });
    });
    handleApproved(finalCamp);
  };

  function generateAgency(values) {
    let tempCampList = [];

    onValue(ref(database, "CAMPING/"), (snapshot) => {
      for (let camp of Object.values(snapshot.val()))
        if (
          camp.location !== undefined &&
          // camp.state === userData.state &&
          camp.aidsData !== undefined
        ) {
          tempCampList.push({
            campId: camp.campId,
            location: camp.location,
            state: camp.state,
            district: camp.district,
            aidsData: camp.aidsData,
          });
        }
      setCampList(tempCampList);
      // nearCamp = tempCampList.find(
      //   (camp) => camp.district === userData.district
      // );
      manipulateData(userData.location, values);
    });
  }

  function manipulateData(userLocation, aidsList) {
    //Below lat lng data is assumed to be our camp
    let lat = parseInt(userLocation.lat);
    let long = parseInt(userLocation.lng);
    //This will store camp-id and the distance from current lat , lng
    let tempArr = [];
    let aidArr = [];
    if (campList === undefined) {
      campList = [];
    }
    for (let camp of campList) {
      tempArr.push(
        distanceFind(lat, long, camp.location.lat, camp.location.lng, camp)
      );
    }

    tempArr.sort((a, b) => a.distance - b.distance);
    aidsList.aidsList?.forEach((userAid) => {
      campSort: for (let camp of tempArr) {
        let tempAid;
        for (let campAid of Object.keys(camp.aidsData)) {
          if (campAid === userAid) {
            aidArr.push({ name: userAid, camp });
            tempAid = userAid;
            break campSort;
          }
        }
      }
    });
    if (aidArr.length > 0) {
      generatedNgo(aidArr);
    }
  }

  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ fontSize: "1.4rem", marginBottom: "2rem" }}>
        Bio Details
      </div>
      <Row align="middle" justify="space-around">
        <Col>
          <Col style={{ marginBottom: "1.5rem" }}>
            <Avatar
              size={150}
              src={
                <Image
                  preview={false}
                  src={userData.profileImageUrl}
                  alt="user profile"
                  fallback="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                />
              }
            />
          </Col>
          <Col style={{ textAlign: "center" }}>Name : {userData.name}</Col>
        </Col>
        <Col style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <Col>Date Of Birth : {userData.dateOfBirth}</Col>
          <Col>
            Applied On :{" "}
            {new Date(userData.requestStatus.appliedOnTimeStamp).toDateString()}
          </Col>
          <Col>Phone No : {userData.mobileNo}</Col>
          <Col>UD-ID No : {userData.udidNo}</Col>
        </Col>
        <Col style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <Col>
            AidsReceived :{" "}
            {userData.requestStatus.aidsReceived
              ? "Received"
              : "Not Yet Received"}
          </Col>
          <Col>
            Document Verified :{" "}
            {userData.requestStatus.documentVerified
              ? "Verified"
              : "Not Yet Verified"}
          </Col>
          <Col>
            Not Appropriate :{" "}
            {userData.requestStatus.notAppropriate ? "Yes" : "No"}
          </Col>
        </Col>
      </Row>
      <div style={{ fontSize: "1.4rem", margin: "3rem 0rem 2.5rem 0rem" }}>
        User Disability Category
      </div>
      <Row>
        <Tag color="success" style={{ margin: ".4rem" }}>
          {" "}
          {userData.disabilityCategory}
        </Tag>
      </Row>
      <div style={{ fontSize: "1.4rem", margin: "4rem 0rem 2rem 0rem" }}>
        Document Details
      </div>
      <Row
        align="middle"
        justify="space-around"
        style={{ marginBottom: "2.5rem" }}
      >
        <Col>
          <Col style={{ textAlign: "center" }}>User Disability Proof</Col>
          <Col style={{ marginTop: "1.5rem" }}>
            <Image
              width={250}
              height={250}
              src={disabilityCertificateURL}
              alt="IncomeTax proof"
              preview={{
                icons: prevIcons,
              }}
            />
          </Col>
        </Col>
      </Row>

      <div style={{ fontSize: "1.4rem", margin: "2rem 0rem 2rem 0rem" }}>
        Change The status
      </div>
      <label>Select Status : </label>
      <Select
        onChange={(e) => setStatus(e)}
        style={{ width: "50%", marginBottom: "3rem" }}
        placeholder="Select The Verification Status"
      >
        <Option value="approved">Verified and add Aid</Option>
        <Option value="notApproved">Inappropriate Data & Not Approved</Option>
      </Select>
      {status === "notApproved" ? (
        <>
          <div
            style={{
              display: "flex",
              margin: "0rem 0rem 3rem 0rem",
              alignItems: "center",
            }}
          >
            <label style={{ marginRight: ".6rem" }}>Select Status : </label>
            <TextArea
              style={{ width: "80%" }}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter Remarks"
              rows={4}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "25%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                key="submit"
                type="primary"
                onClick={() => handleNotApproved(remark)}
              >
                Submit
              </Button>
              <Button
                key="cancel"
                onClick={() => setModalVisible(false)}
                danger
                type="primary"
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      ) : (
        status === "approved" && (
          <Form
            name="dynamic_form_nest_item"
            onFinish={generateAgency}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Select Aid List"
              name={"aidsList"}
              style={{ width: "60%" }}
              rules={[
                {
                  required: true,
                  message: "Missing Aid List",
                },
              ]}
            >
              <Select placeholder="Select Aid List" mode="multiple" allowClear>
                {userData.requestStatus.aidsList?.map((aid) => (
                  <Option key={aid} value={aid}>
                    {aid.split("_").join(" ")}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "35%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button key="submit" type="primary" htmlType="submit">
                    Verified & Allocate
                  </Button>
                  <Button
                    key="cancel"
                    onClick={() => {
                      form.resetFields();
                      setModalVisible(false);
                    }}
                    danger
                    type="primary"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form>
        )
      )}
    </div>
  );
};

export default DoctorVerificationForm;
