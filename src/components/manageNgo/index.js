import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
} from "antd";
import DataDisplayWidget from "components/DataDisplayWidget";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ref, remove, update } from "firebase/database";
import { database } from "firebaseConfig/config";
import { CopyOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";

const { confirm } = Modal;

const ManageNgo = ({ ngoDetails }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (ngoDetails) {
      form.setFieldsValue({
        campName: ngoDetails.campingName,
        emailId: ngoDetails.emailId,
        password: ngoDetails.password,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ngoDetails]);

  const onFinish = (values) => {
    update(ref(database, "CAMPING/" + ngoDetails.campId), {
      campingName: values.campName,
      emailId: values.emailId,
      password: values.password,
    })
      .then(() => alert("updated successfully please refresh"))
      .catch((err) => console.log(err));
  };

  const handleDeleteNgo = (details) => {
    remove(ref(database, "CAMPING/" + details.campId))
      .then(() => {
        remove(
          ref(
            database,
            "campingLocations/" +
              details.state +
              "/" +
              details.district +
              "/" +
              details.campId
          )
        ).then(() => alert("Ngo Removed please refresh"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Col xs={24} sm={24} md={24} lg={13} xl={24} xxl={24}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Ngo Details</div>
            <div>
              Id: {ngoDetails?.campId}
              <CopyToClipboard
                text={ngoDetails?.campId}
                onCopy={() => message.success("Agent Id Copied")}
              >
                <Button
                  icon={<CopyOutlined />}
                  style={{ marginLeft: ".7rem" }}
                  size="small"
                />
              </CopyToClipboard>
            </div>
          </div>
        }
      >
        <Row gutter={15}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
            className="mt-3 mr-4"
          >
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Camp Name"
                name="campName"
                rules={[
                  {
                    required: true,
                    message: "Please input your GroupName!",
                  },
                ]}
              >
                <Input disabled={!isEdit} />
              </Form.Item>
              <Form.Item
                label="Email Id"
                name="emailId"
                rules={[
                  {
                    required: true,
                    message: "Please input your description!",
                  },
                ]}
              >
                <Input disabled={!isEdit} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please select Members",
                  },
                ]}
              >
                <Input disabled={!isEdit} />
              </Form.Item>
              {ngoDetails.campId && (
                <Form.Item wrapperCol={{ offset: 8, span: 24 }}>
                  {!isEdit ? (
                    <Button
                      type="primary"
                      onClick={() => setIsEdit(true)}
                      style={{ width: "90%" }}
                    >
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        onClick={() => {
                          //updateFieldValues(groupDetail);
                          setIsEdit(false);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "1rem" }}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </Form.Item>
              )}
            </Form>
          </Col>
          <Divider type="vertical" style={{ height: "17rem" }} />
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={16}
            xl={10}
            xxl={10}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "2rem",
            }}
          >
            <DataDisplayWidget
              icon={<DeleteOutlined />}
              value="Delete Group"
              title=""
              color="volcano"
              vertical={true}
              avatarSize={55}
            >
              <Button
                type="primary"
                disabled={ngoDetails.campId ? false : true}
                danger
                onClick={() => {
                  confirm({
                    title: "Do you Want to delete this group?",
                    icon: <ExclamationCircleOutlined />,
                    content:
                      "Please doubt check, The Group data permanently deleted",
                    onOk() {
                      handleDeleteNgo(ngoDetails);
                    },
                    onCancel() {},
                  });
                }}
              >
                {ngoDetails.campId
                  ? "Are You Sure ?"
                  : "Please Select Ngo Camp"}
              </Button>
            </DataDisplayWidget>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ManageNgo;
