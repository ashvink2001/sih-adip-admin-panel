import { Col, Row } from "antd";
import Banner from "components/Banner";
import ModalList from "components/createList";
import StaticsWidget from "components/StaticitsWidget";
import React from "react";

const Home = () => {
  return (
    <>
      <Row gutter={16} style={{ marginTop: "1rem" }}>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={14}>
          <Banner />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
          <StaticsWidget />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={14}>
          <ModalList />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}></Col>
      </Row>
    </>
  );
};

export default Home;
