import { Card } from "antd";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

import StateHeader from "components/StateHeader";
import { database } from "firebaseConfig/config";
import VerifyDoctorTable from "components/verifyDoctorTable";
import VerifyDocumentTable from "components/verifyDocumentTable";

const VerifyByPlace = ({ verificationType }) => {
  const [verifyList, setVerifyList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    gender: "all",
    caste: "all",
    dob: "none",
  });
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    filterSort(verifyList, filterOptions);
  }, [filterOptions]);

  const onSearchSubmit = async (state, district, dates) => {
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
          filterSort(arr, dates);
          setLoadingData(false);
        }
      );
    } else {
      setLoadingData(false);
    }
  };

  const rangeSort = (start, end, check) => {
    let timeStamp1 = parseInt(start);
    let timeStamp2 = parseInt(end);
    let timeStamp = check;
    if (timeStamp > timeStamp1 && timeStamp < timeStamp2) {
      return true;
    } else {
      return false;
    }
  };

  const filterSort = (data, dates) => {
    let filteredList = [];
    for (let list of data) {
      // if (
      //   dates.length > 0 &&
      //   rangeSort(dates[0], dates[1], list.requestStatus.appliedOnTimeStamp)
      // ) {
      if (filterOptions.gender === "all") {
        filteredList.push(list);
      } else if (filterOptions.gender === "male" && list.gender === "Male") {
        filteredList.push(list);
      } else if (
        filterOptions.gender === "female" &&
        list.gender === "Female"
      ) {
        filteredList.push(list);
      } else if (
        filterOptions.caste === "sc/st/other" &&
        (list.category === "SC" ||
          ist.category === "ST" ||
          list.category === "other")
      ) {
        filteredList.push(list);
      } else if (filterOptions.caste === "BC" && list.category !== "BC") {
        filteredList.push(list);
      } else if (filterOptions.caste === "all") {
        filteredList.push(list);
      }
      // }
      //  else {
      //   if (filterOptions.gender === "all") {
      //     filteredList.push(list);
      //   } else if (filterOptions.gender === "male" && list.gender === "Male") {
      //     filteredList.push(list);
      //   } else if (
      //     filterOptions.gender === "female" &&
      //     list.gender === "Female"
      //   ) {
      //     filteredList.push(list);
      //   } else if (
      //     filterOptions.caste === "sc/st/other" &&
      //     (list.category === "SC" ||
      //       ist.category === "ST" ||
      //       list.category === "other")
      //   ) {
      //     filteredList.push(list);
      //   } else if (filterOptions.caste === "BC" && list.category !== "BC") {
      //     filteredList.push(list);
      //   } else if (filterOptions.caste === "all") {
      //     filteredList.push(list);
      //   }
      // }
    }

    if (filterOptions.dob === "ascending") {
      list.sort(function (a, b) {
        return new Date(b.dateOfBirth) - new Date(a.dateOfBirth);
      });
    } else if (filterOptions.dob === "descending") {
      list.sort(function (a, b) {
        return new Date(a.dateOfBirth) - new Date(b.dateOfBirth);
      });
    }
    setFilteredList([...filteredList]);
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
          <StateHeader
            onSearchSubmit={onSearchSubmit}
            setFilterOptions={setFilterOptions}
            filterOptions={filterOptions}
          />
        </div>

        <div style={{ marginTop: "2rem" }}>
          {verificationType === "doctorVerification" ? (
            <VerifyDoctorTable
              list={filteredList}
              loadingStatus={loadingData}
            />
          ) : (
            <VerifyDocumentTable
              list={filteredList}
              loadingStatus={loadingData}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default VerifyByPlace;
