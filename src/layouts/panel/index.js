import { Button, Layout, Menu } from "antd";
import Image from "next/image";
import React, { useState } from "react";

import { signOutSuccess } from "redux/actions/Auth";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";

//local
const { Header, Content, Footer, Sider } = Layout;

import Logo from "images/logo.png";
import { fetchAdminMenu } from "./data";
import Home from "modules/dashboard/home";
import News from "modules/dashboard/news";
import VerifyByPlace from "modules/dashboard/verifyByPlace";
import VerifyById from "modules/dashboard/verifyById";
import SupportChat from "modules/dashboard/supportChat";
import Ngo from "modules/dashboard/ngo";
import Admin from "modules/dashboard/admin";
import MonitorAid from "components/MonitorAid";
import MonitorAidIssued from "modules/dashboard/ManageAidReceived";

const Panel = ({ signOutSuccess }) => {
  const { access } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const router = useRouter();

  const handleSignOut = () => {
    signOutSuccess();
    router.push("/login");
  };

  const renderContent = (tab) => {
    if (tab === "3") {
      return <VerifyByPlace verificationType={"documentVerification"} />;
    } else if (tab === "4") {
      return <VerifyById verificationType={"documentVerification"} />;
    } else if (tab === "5") {
      return <News />;
    } else if (tab === "6") {
      return <SupportChat />;
    } else if (tab === "7") {
      return <Ngo />;
    } else if (tab === "8") {
      return <Admin />;
    } else if (tab === "13") {
      return <VerifyByPlace verificationType={"doctorVerification"} />;
    } else if (tab === "14") {
      return <VerifyById verificationType={"doctorVerification"} />;
    } else if (tab === "15") {
      return <MonitorAid />;
    } else if (tab === "16") {
      return <MonitorAidIssued />;
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
          items={fetchAdminMenu(access)}
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
          ADIP Dashboard for SIH
        </Footer>
      </Layout>
    </Layout>
  );
};

export default connect(null, { signOutSuccess })(Panel);
