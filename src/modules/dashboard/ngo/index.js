import { Card, Col, Row } from "antd";
import AddNgoModal from "components/AddNgoModal";
import ManageNgo from "components/manageNgo";
import NgoSearch from "components/NgoSearch";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Ngo = () => {
  const NgoMap = dynamic(() => import("components/ngoMap"), {
    ssr: false,
  });

  const [nogDetail, setNgoDetail] = useState({});

  const handleSearch = (camp) => {
    setNgoDetail(camp);
  };
  return (
    <>
      <Row gutter={16} style={{ margin: "1rem 0rem 0rem 0rem" }}>
        <Card title="NGO Panel" style={{ height: "90%", width: "100%" }}>
          <NgoSearch onSearchSubmit={handleSearch} />
        </Card>
      </Row>
      <Row gutter={16}>
        <ManageNgo ngoDetails={nogDetail} />
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          xl={9}
          xxl={10}
          style={{ height: "20rem", width: "100%", marginBottom: "2rem" }}
        >
          <NgoMap nogDetail={nogDetail.location} />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
          <AddNgoModal />
        </Col>
      </Row>
    </>
  );
};

export default Ngo;
