import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signUpSuccess,
} from "redux/actions/Auth";
import { useRouter } from "next/router";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "firebaseConfig/config";
import { AUTH_TOKEN, EXPIRY_DATE } from "redux/constants/Auth";

const rules = {
  name: [
    {
      required: true,
      message: "Please input your name",
    },
  ],
  email: [
    {
      required: true,
      message: "Please input your email address",
    },
    {
      type: "email",
      message: "Please enter a validate email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your password",
    },
    {
      min: 6,
      message: "minimum 6 character required",
    },
    {
      max: 16,
      message: "maximum 16 character allowed",
    },
  ],
  confirm: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

export const RegisterForm = (props) => {
  const {
    signUpSuccess,
    showLoading,
    loading,
    redirect,
    message,
    showMessage,
    showAuthMessage,
    hideAuthMessage,
  } = props;
  const [form] = Form.useForm();
  const router = useRouter();

  const addUserData = async (userId, email, name) => {
    await set(ref(database, "admin/" + userId), {
      email,
      name,
      userId: userId,
    })
      .then((res) => {
        signUpSuccess(userId);
      })
      .catch((err) => console.log(err));
  };

  const onSignUp = () => {
    form
      .validateFields()
      .then((values) => {
        const { name, email, password } = values;
        showLoading();
        createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            if (typeof window != "undefined") {
              localStorage.setItem(AUTH_TOKEN, res.user.uid);

              //expiryDate
              var date = new Date();
              date.setDate(date.getDate() + 1); // add a day
              localStorage.setItem(EXPIRY_DATE, date);
            }
            addUserData(res.user.uid, email, name);
          })
          .catch((err) => {
            showAuthMessage(err.code);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  useEffect(() => {
    if (redirect) {
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
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
        <Form.Item name="name" label="Name" rules={rules.name} hasFeedback>
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={rules.email} hasFeedback>
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="ConfirmPassword"
          rules={rules.confirm}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, redirect } = auth;
  return { loading, message, showMessage, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
  signUpSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
