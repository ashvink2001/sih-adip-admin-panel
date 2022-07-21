import React from "react";
import RegisterForm from "components/signup/RegisterForm";
import { Card, Row, Col } from "antd";
import Link from "next/link";
import Image from "next/image";

import LOGO from "images/logo.png";
import BG from "images/bg.jpg";

const backgroundStyle = {
  backgroundImage: `url(${BG.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Register = (props) => {
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-2">
                <div className="text-center">
                  <Image
                    style={{ marginBottom: "2rem" }}
                    className="img-fluid"
                    src={LOGO}
                    alt=""
                    width="130rem"
                    height="60rem"
                  />
                  <p className="text-muted">
                    Back to Login : <Link href="/auth/login"> Sign in ?</Link>
                  </p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <RegisterForm {...props} />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;
