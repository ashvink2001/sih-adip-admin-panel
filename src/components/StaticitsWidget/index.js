import React, { useEffect, useState } from "react";
import DataDisplayWidget from "components/DataDisplayWidget";

import {
  UserSwitchOutlined,
  FileImageOutlined,
  FileDoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig/config";

const StaticsWidget = () => {
  const [staticsData, setStaticsData] = useState({
    userCount: 0,
    ngoCount: 0,
    verifiedApplicationCount: 0,
    newsCount: 0,
  });

  const fetchData = () => {
    let tempData = {
      userCount: 0,
      ngoCount: 0,
      verifiedApplicationCount: 0,
      newsCount: 0,
    };

    //read reg users
    onValue(ref(database, "udidNoList"), (snapshot) => {
      tempData.userCount = Object.keys(snapshot.val()).length;
    });

    //read ngo count
    onValue(ref(database, "CAMPING"), (snapshot) => {
      tempData.ngoCount = Object.keys(snapshot.val()).length;
    });

    //need to get no of applications
    onValue(ref(database, "verificationList"), (snapshot) => {
      tempData.verifiedApplicationCount = Object.keys(snapshot.val()).length;
    });

    //read news count
    onValue(ref(database, "news"), (snapshot) => {
      tempData.newsCount = Object.keys(snapshot.val()).length;
    });
    setStaticsData(tempData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <DataDisplayWidget
          icon={<UserSwitchOutlined />}
          value={staticsData.userCount}
          title="No of Registered users"
          color="gold"
          vertical={true}
          avatarSize={55}
        />
        <DataDisplayWidget
          icon={<FileDoneOutlined />}
          value={staticsData.verifiedApplicationCount}
          title="No of Applications Verified"
          color="cyan"
          vertical={true}
          avatarSize={55}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
        <DataDisplayWidget
          icon={<HomeOutlined />}
          value={staticsData.ngoCount}
          title="No of Registered Ngo"
          color="blue"
          vertical={true}
          avatarSize={55}
        />

        <DataDisplayWidget
          icon={<FileImageOutlined />}
          value={staticsData.newsCount}
          title="No of news added"
          color="volcano"
          vertical={true}
          avatarSize={55}
        />
      </Col>
    </Row>
  );
};

export default StaticsWidget;
