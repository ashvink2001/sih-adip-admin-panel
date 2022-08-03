import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";

import VerifyTable from "components/verifyTable";
import { database } from "firebaseConfig/config";
import SearchHeader from "components/searchHeader";

const VerifyById = () => {
  const [verifyList, setVerifyList] = useState([]);

  const onSearchSubmit = async (searchId) => {
    var placeDetail = {
      state: "",
      district: "",
    };
    await onValue(ref(database, "udidNoList/"), (snapshot) => {
      let place = snapshot.val()[searchId];
      if (place) {
        placeDetail.state = place.state;
        placeDetail.district = place.district;
        placeDetail.userId = place.userId;
      } else {
        setVerifyList([]);
      }
    });
    if (placeDetail.district !== "" && placeDetail.state !== "") {
      await onValue(
        ref(
          database,
          "USERS/" + placeDetail.state + "/" + placeDetail.district + "/"
        ),
        (snapshot) => {
          let value = snapshot.val()[placeDetail.userId];
          if (
            value !== undefined &&
            !value.requestStatus.verified &&
            !value.requestStatus.notAppropriate
          ) {
            setVerifyList([{ ...value, userId: placeDetail.userId }]);
          }
        }
      );
    }
  };
  return (
    <div style={{ marginTop: "1rem" }}>
      <Card title="Need To Verify" style={{ height: "90%", width: "100%" }}>
        <SearchHeader onSearchSubmit={onSearchSubmit} />
        <VerifyTable list={verifyList} />
      </Card>
    </div>
  );
};

export default VerifyById;
