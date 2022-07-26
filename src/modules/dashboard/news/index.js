import { Col, Row } from "antd";
import NewsForm from "components/addNews";
import DisplayNews from "components/displayNews";
import React from "react";

const News = () => {
  return (
    <div>
      <Row justify="space-around" style={{ marginTop: "3rem" }}>
        <Col span={10}>
          <NewsForm />
        </Col>
        <Col span={12}>
          <DisplayNews />
        </Col>
      </Row>
    </div>
  );
};

export default News;
