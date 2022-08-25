import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";

import StateHeader from "components/StateHeader";
import { database } from "firebaseConfig/config";
import VerifyDoctorTable from "components/verifyDoctorTable";
import VerifyDocumentTable from "components/verifyDocumentTable";

const VerifyByPlace = ({ verificationType }) => {
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
            let requestList = [];

            if (verificationType === "doctorVerification") {
              requestList = Object.values(value.requestStatus)?.filter(
                (request) =>
                  request.documentVerified &&
                  !request.notAppropriate &&
                  !request.doctorVerification
              );
            } else {
              requestList = Object.values(value.requestStatus)?.filter(
                (request) =>
                  !request.documentVerified &&
                  !request.notAppropriate &&
                  !request.doctorVerification
              );
            }

            requestList.map((requestStatus) => {
              arr.push({
                ...snapshot.val()[id],
                userId: id,
                key: requestStatus.appliedOnTimeStamp,
                requestStatus: requestStatus, //converted to single requestStatus(latest)
              });
            });
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
        title={
          verificationType === "doctorVerification"
            ? "Doctor Verification"
            : "Document Verification"
        }
        style={{ height: "90%", width: "100%", marginTop: "1rem" }}
      >
        <div style={{ margin: "3rem 0rem 4rem 0rem" }}>
          <StateHeader onSearchSubmit={onSearchSubmit} />
        </div>

        <div style={{ marginTop: "2rem" }}>
          {verificationType === "doctorVerification" ? (
            <VerifyDoctorTable list={verifyList} loadingStatus={loadingData} />
          ) : (
            <VerifyDocumentTable
              list={verifyList}
              loadingStatus={loadingData}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default VerifyByPlace;
