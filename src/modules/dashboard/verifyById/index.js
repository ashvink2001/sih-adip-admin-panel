import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";

import VerifyTable from "components/verifyTable";
import { database } from "firebaseConfig/config";
import SearchHeader from "components/searchHeader";

const VerifyById = () => {
  const [verifyList, setVerifyList] = useState([]);

  const onSearchSubmit = (searchTerm) => {
    console.log(searchTerm);
    // onValue(
    //   ref(database, "verificationApplied/" + state + "/" + district + "/"),
    //   (snapshot) => {
    //     console.log(snapshot.val());
    //     setVerifyList(snapshot.val());
    //   }
    // );
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
