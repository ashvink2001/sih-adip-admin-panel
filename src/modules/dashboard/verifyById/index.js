import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useState } from "react";

import VerifyTable from "components/verifyTable";
import { database } from "firebaseConfig/config";
import SearchHeader from "components/searchHeader";

const VerifyById = () => {
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
            setVerifyList([
              {
                ...value,
                userId: placeDetail.userId,
                campLocation: fetchCampLocation(value.state, value.district),
              },
            ]);
          }
          setLoadingData(false);
        }
      );
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
    <div style={{ marginTop: "1rem" }}>
      <Card title="Need To Verify" style={{ height: "90%", width: "100%" }}>
        <SearchHeader onSearchSubmit={onSearchSubmit} />
        <VerifyTable list={verifyList} loadingStatus={loadingData} />
      </Card>
    </div>
  );
};

export default VerifyById;
