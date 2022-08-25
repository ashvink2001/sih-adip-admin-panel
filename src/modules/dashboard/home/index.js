import { Col, Row } from "antd";
import Banner from "components/Banner";
import ModalList from "components/createList";
import StaticsWidget from "components/StaticitsWidget";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { access } = useSelector((state) => state.auth);
  return (
    <>
      <Row gutter={16} style={{ marginTop: "1rem" }}>
        <Col xs={24} sm={24} md={24} lg={10} xl={14} xxl={14}>
          <Banner />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={10} xxl={10}>
          <StaticsWidget />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8} xl={15} xxl={14}>
          {access.includes("admin") && <ModalList />}
        </Col>
      </Row>
    </>
  );
};

export default Home;
