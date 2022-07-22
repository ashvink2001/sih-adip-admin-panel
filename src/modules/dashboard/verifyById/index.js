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
    await onValue(ref(database, "userIdList/"), (snapshot) => {
      let place = snapshot.val()[searchId];
      if (place) {
        placeDetail.state = place.state;
        placeDetail.district = place.district;
      }
    });
    if (placeDetail.district !== "" && placeDetail.state !== "") {
      await onValue(
        ref(
          database,
          "USERS/" + placeDetail.state + "/" + placeDetail.district + "/"
        ),
        (snapshot) => {
          let value = snapshot.val()[searchId];
          if (value !== undefined) {
            setVerifyList([value]);
          }
        }
      );
    }
  };
  return (
    <div>
      <Card title="Need To Verify" style={{ height: "90%", width: "100%" }}>
        <SearchHeader onSearchSubmit={onSearchSubmit} />
        <VerifyTable list={verifyList} />
      </Card>
    </div>
  );
};

export default VerifyById;
