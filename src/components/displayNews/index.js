import { Button, Image, List } from "antd";
import Card from "antd/lib/card/Card";
import { onValue, ref, remove } from "firebase/database";
import { database } from "firebaseConfig/config";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";

const DisplayNews = () => {
  const [newsList, setNewsList] = useState([]);

  const handleDeleteNews = (timeStamp) => {
    let requiredKey = "";

    onValue(ref(database, "news/"), (snapshot) => {
      const objList = snapshot.val();
      const keyList = Object.keys(objList);

      for (let key of keyList) {
        if (objList[key].timeStamp === timeStamp) {
          requiredKey = key;
        }
      }
    });

    //remove news
    remove(ref(database, "news/" + requiredKey)).catch((err) =>
      console.log(err)
    );
  };

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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                    style={{ marginRight: "2rem" }}
                    onClick={() => handleDeleteNews(item.timeStamp)}
                    shape="circle"
                  />
                  <Image
                    width={100}
                    height={100}
                    alt="preview"
                    src={item.imageUrl}
                  />
                </div>
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
