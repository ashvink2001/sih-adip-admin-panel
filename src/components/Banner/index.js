import { Button, Carousel } from "antd";
import { onValue, ref, remove } from "firebase/database";
import { database } from "firebaseConfig/config";
import React, { useEffect, useState } from "react";

import { DeleteOutlined, LinkOutlined } from "@ant-design/icons";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = () => {
    onValue(ref(database, "updatesBanner"), (snapshot) => {
      let value = snapshot.val();
      if (value) {
        setBannerData(
          Object.keys(value).map(function (key) {
            return { ...value[key], id: key };
          })
        );
      }
    });
  };

  const deleteBanner = (id) => {
    remove(ref(database, "updatesBanner/" + id)).then(() => {
      alert("banner removed");
    });
  };

  return (
    <div
      style={{
        border: "#909090 1px solid",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      {bannerData.length > 0 ? (
        <Carousel autoplay>
          {bannerData.map((data) => (
            <div key={data.id}>
              <div
                style={{
                  backgroundImage: `url("${data.imageUrl}")`,
                  //backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  height: "22rem",
                  backgroundColor: "red",
                }}
              >
                <div className="banner-action">
                  <Button
                    type="primary"
                    href={data.contentUrl}
                    icon={<LinkOutlined />}
                    style={{
                      marginRight: "8rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    target="_blank"
                  />
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteBanner(data.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Banner Found
        </div>
      )}
    </div>
  );
};

export default Banner;
