import { Button } from "antd";
import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig/config";
import React from "react";
import { useEffect } from "react";

const AutoNgo = () => {
  function executeData() {
    onValue(ref(database, "CAMPING/"), (snapshot) => {
      console.log(snapshot.val());
      //manipulateData();
    });
  }

  useEffect(() => {
    executeData();
  }, []);

  function manipulateData(nearCampList) {
    //Below lat lng data is assumed to be our camp
    let lat = 10.3712745;
    let long = 77.9828858;

    //This will store camp-id and the distance from current lat , lng
    // let hashMap = HashMap<String?, Double>()

    for (camp of nearCampList) {
      hashMap.put(
        camp.campId,
        distance(lat, long, camp.location.lat, camp.location.lng)
      );
    }

    //hashMap-> will have campid - distance in meters extract from them
  }

  function distance(lat1, lon1, lat2, lon2) {
    // haversine great circle distance approximation, returns meters
    let theta = lon1 - lon2;
    var dist =
      Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60; // 60 nautical miles per degree of seperation
    dist = dist * 1852; // 1852 meters per nautical mile
    return dist; //Return in meters
  }

  function deg2rad(deg) {
    return (deg * Math.PI) / 180.0;
  }

  function rad2deg(rad) {
    return (rad * 180.0) / Math.PI;
  }

  return (
    <div>
      <Button>Generate Agent</Button>
    </div>
  );
};

export default AutoNgo;
