import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";

import { database } from "firebaseConfig/config";
import SearchHeader from "components/searchHeader";
import VerifyDocumentTable from "components/verifyDocumentTable";
import VerifyDoctorTable from "components/verifyDoctorTable";

const VerifyById = ({ verificationType }) => {
  const [verifyList, setVerifyList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const onSearchSubmit = async (searchId) => {
    setLoadingData(true);
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
        setLoadingData(false);
      }
    });
    if (
      placeDetail.district !== "" &&
      placeDetail.state !== "" &&
      placeDetail.userId !== ""
    ) {
      await onValue(
        ref(
          database,
          "USERS/" + placeDetail.state + "/" + placeDetail.district + "/"
        ),
        (snapshot) => {
          let value = snapshot.val()[placeDetail.userId];
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
            setVerifyList([
              {
                ...snapshot.val()[placeDetail.userId],
                userId: placeDetail.userId,
                key: requestStatus.appliedOnTimeStamp,
                requestStatus: requestStatus, //converted to single requestStatus(latest)
              },
            ]);
          });
          // if (
          //   value !== undefined &&
          //   !requestStatus.verified &&
          //   !requestStatus.notAppropriate
          // ) {
          //   setVerifyList([
          //     {
          //       ...value,
          //       userId: placeDetail.userId,
          //       requestStatus: requestStatus, //converted to single requestStatus(latest)
          //     },
          //   ]);
          // }
          setLoadingData(false);
        }
      );
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Card
        title={
          verificationType === "doctorVerification"
            ? "Doctor Verification"
            : "Document Verification"
        }
        style={{ height: "90%", width: "100%" }}
      >
        <SearchHeader onSearchSubmit={onSearchSubmit} />
        {verificationType === "doctorVerification" ? (
          <VerifyDoctorTable list={verifyList} loadingStatus={loadingData} />
        ) : (
          <VerifyDocumentTable list={verifyList} loadingStatus={loadingData} />
        )}
      </Card>
    </div>
  );
};

export default VerifyById;
