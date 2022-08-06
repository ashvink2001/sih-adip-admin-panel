import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";

import StateHeader from "components/StateHeader";
import VerifyTable from "components/verifyTable";
import { database } from "firebaseConfig/config";

const VerifyByPlace = () => {
  const [verifyList, setVerifyList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const onSearchSubmit = async (state, district) => {
    setLoadingData(true);
    var userIdList = [];
    await onValue(
      ref(database, "verificationApplied/" + state + "/" + district + "/"),
      (snapshot) => {
        let value = snapshot.val();
        if (value) {
          userIdList = Object.keys(snapshot.val());
        }
      }
    );
    if (userIdList.length > 0) {
      await onValue(
        ref(database, "USERS/" + state + "/" + district + "/"),
        (snapshot) => {
          const arr = [];
          userIdList.map((id) => {
            let value = snapshot.val()[id];
            console.log(value);
            if (
              !value.requestStatus.verified &&
              !value.requestStatus.notAppropriate
            ) {
              arr.push({
                ...snapshot.val()[id],
                userId: id,
                campLocation: fetchCampLocation(value.state, value.district),
              });
            }
          });
          setVerifyList(arr);
          setLoadingData(false);
        }
      );
    } else {
      setLoadingData(false);
    }
  };

  const fetchCampLocation = (state, district) => {
    let campLocation;
    onValue(
      ref(database, "campingLocations/" + state + "/" + district + "/"),
      (snapshot) => {
        if (snapshot.val() !== null) {
          let location = Object.values(snapshot.val());
          if (location.length > 0) {
            campLocation = location[0];
          } else {
            campLocation = { lat: "2.0", lng: "2.0", placeName: "Not found" };
          }
        } else {
          campLocation = { lat: "2.0", lng: "2.0", placeName: "Not found" };
        }
      }
    );
    return campLocation;
  };

  return (
    <div>
      <Card
        title="Need To Verify"
        style={{ height: "90%", width: "100%", marginTop: "2rem" }}
      >
        <div style={{ margin: "3rem 0rem 4rem 0rem" }}>
          <StateHeader onSearchSubmit={onSearchSubmit} />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <VerifyTable list={verifyList} loadingStatus={loadingData} />
        </div>
      </Card>
    </div>
  );
};

export default VerifyByPlace;
