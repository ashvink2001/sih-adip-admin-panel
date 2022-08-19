import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  authenticated,
} from "redux/actions/Auth";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "firebaseConfig/config";
import { AUTH_TOKEN, EXPIRY_DATE } from "redux/constants/Auth";
import { onValue, ref } from "firebase/database";

export const LoginForm = (props) => {
  const router = useRouter();

  const {
    showForgetPassword,
    hideAuthMessage,
    onForgetPasswordClick,
    showLoading,
    token,
    loading,
    redirect,
    showMessage,
    authenticated,
    showAuthMessage,
    message,
  } = props;

  const onLogin = (values) => {
    showLoading();

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        onValue(ref(database, "admin/" + res.user.uid), (snapshot) => {
          const value = snapshot.val();
          if (!value.isApproved) {
            showAuthMessage("Admin Need to Verify You Try later");
          } else if (!value.permission) {
            showAuthMessage("Need Permission To allow you contact admin");
          } else {
            if (typeof window != "undefined") {
              localStorage.setItem(AUTH_TOKEN, res.user.uid);

              //expiryDate
              var date = new Date();
              date.setDate(date.getDate() + 1); // add a day
              localStorage.setItem(EXPIRY_DATE, date);
            }

            authenticated(res.user.uid, value.access);
          }
        });
      })
      .catch((err) => {
        showAuthMessage(err.code);
      });
  };

  useEffect(() => {
    if (token !== null && redirect === "/dashboard") {
      router.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  return (
    <>
      <div
        style={
          showMessage
            ? { opacity: 1, marginBottom: 20 }
            : { opacity: 0, marginBottom: 0 }
        }
      >
        <Alert type="error" showIcon message={message}></Alert>
      </div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`${
                showForgetPassword
                  ? "d-flex justify-content-between w-100 align-items-center"
                  : ""
              }`}
            >
              <span>Password</span>
              {showForgetPassword && (
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
                  Forget Password?
                </span>
              )}
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  showForgetPassword: PropTypes.bool,
};

LoginForm.defaultProps = {
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  authenticated,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
