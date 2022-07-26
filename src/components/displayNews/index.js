import { Button, Image, List } from "antd";
import Card from "antd/lib/card/Card";
import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig/config";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

const DisplayNews = () => {
  const [newsList, setNewsList] = useState([]);

  const fetchNews = () => {
    onValue(ref(database, "news/"), (snapshot) => {
      let value = snapshot.val();
      if (value) {
        setNewsList(
          Object.keys(value).map(function (key) {
            return value[key];
          })
        );
      }
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Top News</div>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => fetchNews()}
            >
              Refresh
            </Button>
          </div>
        }
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={newsList}
          style={{ height: "35rem", overflowY: "auto" }}
          footer={<div>The End ....</div>}
          renderItem={(item) => (
            <List.Item
              key={item.headLines}
              extra={
                <Image
                  width={100}
                  height={100}
                  alt="preview"
                  src={item.imageUrl}
                />
              }
            >
              <List.Item.Meta
                title={item.headLines}
                description={
                  "on " + "  " + new Date(item.timeStamp).toDateString()
                }
              />
              <div style={{ width: "90%" }}>{item.contentDescription}</div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DisplayNews;
