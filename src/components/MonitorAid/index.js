import { Card, Table } from "antd";
import React, { useState } from "react";
import { database } from "firebaseConfig/config";
import { onValue, ref } from "firebase/database";
import MonitorAidHeader from "components/MonitorAidHeader";

const MonitorAid = () => {
  const [filteredAid, setFilteredAid] = useState([]);
  const [selectedCampAid, setSelectedCampAid] = useState("");
  const [aidCount, setAidCount] = useState(0);
  const searchClear = () => {
    setFilteredAid([]);
    setSelectedCampAid("");
  };

  const onSearchSubmit = (selectedState, selectedDistrict, selectedAid) => {
    onValue(ref(database, "CAMPING/"), (snapshot) => {
      let tempArr = [];
      let tempCount = 0;
      setSelectedCampAid(selectedAid);
      if (snapshot.val()) {
        tempArr = Object.values(snapshot.val());
      }
      if (tempArr.length > 0) {
        if (selectedDistrict.length > 0) {
          tempArr = tempArr.filter(
            (val) =>
              val.district === selectedDistrict &&
              val.aidsData &&
              val.aidsData[selectedAid] > 0
          );
        } else if (selectedState.length > 0) {
          tempArr = tempArr.filter(
            (val) =>
              val.state === selectedState &&
              val.aidsData &&
              val.aidsData[selectedAid] > 0
          );
        } else {
          tempArr = tempArr.filter(
            (val) => val.aidsData && val.aidsData[selectedAid]
          );
        }
      }
      tempArr.map((arr) => {
        tempCount += arr.aidsData[selectedAid];
      });
      setFilteredAid(tempArr);
      setAidCount(tempCount);
    });
  };

  const tableColumns = [
    {
      title: "Agency ID",
      key: "agencyId",
      render: (data) => (
        <div className="d-flex align-items-center">{data.campId}</div>
      ),
    },
    {
      title: "Agency Name",
      key: "agencyName",
      render: (data) => (
        <div className="d-flex align-items-center">{data.campingName}</div>
      ),
    },
    {
      title: "District",
      key: "district",
      render: (data) => (
        <div className="d-flex align-items-center">{data.district}</div>
      ),
    },
    {
      title: "Count",
      key: "count",
      render: (data) => {
        return (
          <div className="d-flex align-items-center">
            {data.aidsData && data.aidsData[selectedCampAid]}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ marginTop: "1rem" }}>
        <Card title={"Aids Monitor"} style={{ height: "90%", width: "100%" }}>
          <MonitorAidHeader
            onSearchSubmit={onSearchSubmit}
            searchClear={searchClear}
          />
        </Card>
      </div>
      <Card>
        {"Result Found: " + filteredAid?.length || 0}{" "}
        {"Total Count: " + aidCount}
      </Card>
      <Table
        className="no-border-last"
        columns={tableColumns}
        dataSource={filteredAid}
        rowKey="key"
        pagination={true}
        style={{ height: "20rem" }}
      />
    </div>
  );
};

export default MonitorAid;
