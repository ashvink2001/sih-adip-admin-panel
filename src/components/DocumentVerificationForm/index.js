import {
  Avatar,
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
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
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

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

const DocumentVerificationForm = ({
  userData,
  setModalVisible,
  handleApproved,
  handleNotApproved,
}) => {
  const { incomeTaxCertificate, identityProofUrl, disabilityCertificateURL } =
    userData.requestStatus.aidsDocs;
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState(userData.requestStatus?.message || "");

  const handleSubmit = () => {
    if (status) {
      handleApproved();
    } else {
      handleNotApproved(remark);
    }
  };

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
            Verified :{" "}
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
          <Col style={{ textAlign: "center" }}>Identity Proof</Col>
          <Col style={{ marginTop: "1.5rem" }}>
            <Image
              width={250}
              height={250}
              src={identityProofUrl}
              alt="address proof"
              preview={{
                icons: prevIcons,
              }}
            />
          </Col>
        </Col>
        <Col>
          <Col style={{ textAlign: "center" }}>DisabilityCertificate Proof</Col>
          <Col style={{ marginTop: "1.5rem" }}>
            <Image
              width={250}
              height={250}
              src={disabilityCertificateURL}
              alt="address proof"
              preview={{
                icons: prevIcons,
              }}
            />
          </Col>
        </Col>
      </Row>
      <Row
        align="middle"
        justify="space-around"
        style={{ marginBottom: "2.5rem" }}
      >
        <Col>
          <Col style={{ textAlign: "center" }}>IncomeTax Proof</Col>
          <Col style={{ marginTop: "1.5rem" }}>
            <Image
              width={250}
              height={250}
              src={incomeTaxCertificate}
              alt="address proof"
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
        <Option value="approved">Verified & Give Approved</Option>
        <Option value="notApproved">Inappropriate Data & Not Approved</Option>
      </Select>
      {status === "notApproved" && (
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
        </>
      )}
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
            type="primary"
            onClick={() => setModalVisible(false)}
            danger
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerificationForm;
