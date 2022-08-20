import { Col, Row } from "antd";
import AddBannerModal from "components/AddBannerModal";
import AddNgoModal from "components/AddNgoModal";
import React from "react";

const ModalList = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <AddBannerModal />
        </Col>
      </Row>
    </div>
  );
};

export default ModalList;
