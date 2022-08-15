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
            console.log(id, snapshot.val());
            let value = snapshot.val()[id];
            console.log(value);
            const requestStatus = Object.values(value.requestStatus)?.reduce(
              (a, b) => (a.appliedOnTimeStamp > b.appliedOnTimeStamp ? a : b)
            );
            console.log(requestStatus);
            if (!requestStatus.verified && !requestStatus.notAppropriate) {
              arr.push({
                ...snapshot.val()[id],
                userId: id,
                requestStatus: requestStatus, //converted to single requestStatus(latest)
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
