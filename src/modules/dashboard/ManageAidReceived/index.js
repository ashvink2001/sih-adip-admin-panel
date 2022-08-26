import { Card, Table } from "antd";
import React, { useEffect, useState } from "react";
import { database } from "firebaseConfig/config";
import { onValue, ref } from "firebase/database";
import MonitorAidHeader from "components/MonitorAidHeader";

const MonitorAidIssued = () => {
  const [filteredAid, setFilteredAid] = useState([]);
  const [selectedCampAid, setSelectedCampAid] = useState("");

  const onSearchSubmit = () => {
    //selectedState, selectedDistrict, selectedAid
    onValue(ref(database, "aidsReceived/"), (snapshot) => {
      let tempArr = [];
      //setSelectedCampAid(selectedAid);
      if (snapshot.val()) {
        tempArr = Object.values(snapshot.val());
      }
      setFilteredAid(tempArr);
    });
  };

  useEffect(() => {
    onSearchSubmit();
  }, []);

  const tableColumns = [
    {
      title: "Udid No",
      key: "udidno",
      render: (data) => (
        <div className="d-flex align-items-center">{data.udidNo}</div>
      ),
    },
    {
      title: "Name",
      key: "name",
      render: (data) => (
        <div className="d-flex align-items-center">{data.name}</div>
      ),
    },
    {
      title: "Category",
      key: "category",
      render: (data) => (
        <div className="d-flex align-items-center">{data.category}</div>
      ),
    },
    {
      title: "Gender",
      key: "gender",
      render: (data) => (
        <div className="d-flex align-items-center">{data.gender}</div>
      ),
    },
    {
      title: "Delivered On",
      key: "deliveredOn",
      render: (data) => (
        <div className="d-flex align-items-center">
          {new Date(data.deliveredOn).toDateString()}
        </div>
      ),
    },
    {
      title: "Aids",
      key: "aid",
      render: (data) => {
        return (
          <div className="d-flex align-items-center">
            {data.aidsList.join(" , ")}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ marginTop: "1rem" }}>
        <Card
          title={"Aids Issued List"}
          style={{ height: "90%", width: "100%" }}
        ></Card>
      </div>
      <Card>{"Result Found: " + filteredAid?.length || 0}</Card>
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

export default MonitorAidIssued;
