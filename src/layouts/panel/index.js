import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import React, { useState } from "react";

import { signOutSuccess } from "redux/actions/Auth";

//local
const { Header, Content, Footer, Sider } = Layout;

import Logo from "images/logo.png";
import { navData } from "./data";
import Home from "modules/dashboard/home";
import News from "modules/dashboard/news";
import VerifyByPlace from "modules/dashboard/verifyByPlace";
import VerifyById from "modules/dashboard/verifyById";
import SupportChat from "modules/dashboard/supportChat";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Ngo from "modules/dashboard/ngo";

const Panel = ({ signOutSuccess }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const router = useRouter();

  const handleSignOut = () => {
    signOutSuccess();
    router.push("/login");
  };

  const renderContent = (tab) => {
    if (tab === "3") {
      return <VerifyByPlace />;
    } else if (tab === "4") {
      return <VerifyById />;
    } else if (tab === "5") {
      return <News />;
    } else if (tab === "6") {
      return <SupportChat />;
    } else if (tab === "7") {
      return <Ngo />;
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
        style={{ boxShadow: "10px -3px 47px -13px rgba(0,0,0,0.1)" }}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div>
          <Image src={Logo} width="180%" height="80%" alt="logo" />
        </div>

        <Menu
          theme="light"
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
            boxShadow: "10px -3px 47px -13px rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            style={{ marginRight: "2rem" }}
            type="primary"
            onClick={() => handleSignOut()}
          >
            Signout
          </Button>
        </Header>
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
          ADIP Dashboard ©2022
        </Footer>
      </Layout>
    </Layout>
  );
};

export default connect(null, { signOutSuccess })(Panel);
