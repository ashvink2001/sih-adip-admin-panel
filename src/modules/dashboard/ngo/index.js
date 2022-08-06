import { Card, Col, Row } from "antd";
import AddNgoModal from "components/AddNgoModal";
import NgoSearch from "components/NgoSearch";
import React from "react";

const Ngo = () => {
  const handleSearch = (camp) => {
    console.log(camp);
  };
  return (
    <>
      <Row gutter={16} style={{ margin: "1rem 0rem 0rem 0rem" }}>
        <Card title="Need To Verify" style={{ height: "90%", width: "100%" }}>
          <NgoSearch onSearchSubmit={handleSearch} />
        </Card>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <AddNgoModal />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}></Col>
      </Row>
    </>
  );
};

export default Ngo;
