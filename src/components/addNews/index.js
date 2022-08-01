import { Button, Form, Input } from "antd";
import Card from "antd/lib/card/Card";
import { push, ref } from "firebase/database";
import { database } from "firebaseConfig/config";
import React from "react";

const { TextArea } = Input;

const NewsForm = () => {
  const [form] = Form.useForm();

  const onSubmitHandle = (values) => {
    push(ref(database, "news/"), {
      headLines: values.headline,
      imageUrl: values.imageUrl,
      contentDescription: values.description,
      timeStamp: new Date().getTime(),
    })
      .then(() => {
        form.resetFields();
        alert("News Added");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Card title="Add News ">
        <Form
          form={form}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
          onFinish={onSubmitHandle}
        >
          <Form.Item
            name="headline"
            label="Enter News Headline"
            rules={[
              {
                required: true,
                message: "Please input your News Headline",
              },
            ]}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "2rem",
            }}
          >
            <Input placeholder="Enter News Title" style={{ width: "70%" }} />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="Enter News Image Url : "
            rules={[
              {
                required: true,
                message: "Please input your Image Url",
              },
            ]}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "2rem",
            }}
          >
            <Input placeholder="Enter here" style={{ width: "70%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label=" Enter News Description : "
            rules={[
              {
                required: true,
                message: "Please input your News Description",
              },
            ]}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "2rem",
            }}
          >
            <TextArea placeholder="Enter News Title" style={{ width: "70%" }} />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Add New News
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default NewsForm;
