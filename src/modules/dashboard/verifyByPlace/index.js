import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";

import StateHeader from "components/StateHeader";
import VerifyTable from "components/verifyTable";
import { database } from "firebaseConfig/config";

const VerifyByPlace = () => {
  const [verifyList, setVerifyList] = useState([]);

  const onSearchSubmit = (state, district) => {
    onValue(
      ref(database, "verificationApplied/" + state + "/" + district + "/"),
      (snapshot) => {
        console.log(snapshot.val());
        setVerifyList(snapshot.val());
      }
    );
  };
  return (
    <div>
      <Card title="Need To Verify" style={{ height: "90%", width: "100%" }}>
        <StateHeader onSearchSubmit={onSearchSubmit} />
        <VerifyTable list={verifyList} />
      </Card>
    </div>
  );
};

export default VerifyByPlace;
