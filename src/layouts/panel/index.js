import { Layout, Menu } from "antd";
import Image from "next/image";
import React, { useState } from "react";

//local
const { Header, Content, Footer, Sider } = Layout;

import Logo from "images/logo.png";
import { navData } from "./data";
import Home from "modules/dashboard/home";
import News from "modules/dashboard/news";
import VerifyByPlace from "modules/dashboard/verifyByPlace";
import VerifyById from "modules/dashboard/verifyById";
import SupportChat from "modules/dashboard/supportChat";

const Panel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");

  const renderContent = (tab) => {
    if (tab === "3") {
      return <VerifyByPlace />;
    } else if (tab === "4") {
      return <VerifyById />;
    } else if (tab === "5") {
      return <News />;
    } else if (tab === "6") {
      return <SupportChat />;
    } else {
      return <Home />;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div>
          <Image src={Logo} width="100%" height="80%" alt="logo" />
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={navData}
          onSelect={(e) => setCurrentTab(e.key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: "black",
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {renderContent(currentTab)}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          E-help ©2022 Created by Ajay
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Panel;
