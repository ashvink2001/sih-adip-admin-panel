import { Card, Col, List, Row } from "antd";
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
      <Row justify="space-between">
        <Col xs={24} sm={24} md={24} lg={8} xl={10} xxl={15}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={24}
            style={{ height: "23rem" }}
          >
            <ManageNgo ngoDetails={nogDetail} />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={24}
            style={{ height: "18rem", width: "100%" }}
          >
            <NgoMap nogDetail={nogDetail.location} />
          </Col>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={7} xxl={8}>
          <Card title="Aids List">
            <List
              style={{ overflowY: "scroll", height: "35rem" }}
              size="small"
              bordered
              dataSource={
                nogDetail.aidsData && Object.entries(nogDetail.aidsData)
              }
              renderItem={(item) => (
                <List.Item>
                  {item[0]} : {item[1]}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Ngo;