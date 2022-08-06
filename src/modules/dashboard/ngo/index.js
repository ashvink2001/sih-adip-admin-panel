import { Card, Col, Row } from "antd";
import AddNgoModal from "components/AddNgoModal";
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
        <Card title="Need To Verify" style={{ height: "90%", width: "100%" }}>
          <NgoSearch onSearchSubmit={handleSearch} />
        </Card>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
          <NgoMap nogDetail={nogDetail.location} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <AddNgoModal />
        </Col>
      </Row>
    </>
  );
};

export default Ngo;
