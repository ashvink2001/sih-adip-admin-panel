import { Button, Card, Dropdown, Menu, Table } from "antd";
import React, { useEffect, useState } from "react";
import { database } from "firebaseConfig/config";
import { onValue, ref } from "firebase/database";
// import MonitorAidHeader from "components/MonitorAidHeader";
import { FilterOutlined } from "@ant-design/icons";

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

const MonitorAidIssued = () => {
  const [filteredAid, setFilteredAid] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    gender: "all",
    caste: "all",
    deliveredOn: "none",
  });

  const fetchData = () => {
    onValue(ref(database, "aidsReceived/"), (snapshot) => {
      let tempArr = [];
      if (snapshot.val()) {
        tempArr = Object.values(snapshot.val());
      }
      filterSort(tempArr);
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterOptions]);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "Gender",
          children: [
            {
              key: "1-1",
              label: "Male",
              onClick: () => {
                let arr = filterOptions;
                setFilterOptions({
                  ...arr,
                  gender: "male",
                });
              },
            },
            {
              key: "1-2",
              label: "Female",
              onClick: () => {
                let arr = filterOptions;
                setFilterOptions({
                  ...arr,
                  gender: "female",
                });
              },
            },
            {
              key: "1-3",
              label: "Other",
              onClick: () => {
                setFilterOptions({
                  ...filterOptions,
                  gender: "other",
                });
              },
            },
            {
              key: "1-4",
              label: "All",
              onClick: () => {
                setFilterOptions({
                  ...filterOptions,
                  gender: "all",
                });
              },
            },
          ],
        },
        {
          key: "2",
          label: "Delivered On",
          children: [
            {
              key: "2-1",
              label: "Ascending",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  deliveredOn: "ascending",
                }));
              },
            },
            {
              key: "2-2",
              label: "Descending",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  deliveredOn: "descending",
                }));
              },
            },
            {
              key: "2-3",
              label: "None",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  deliveredOn: "none",
                }));
              },
            },
          ],
        },
        {
          key: "3",
          label: "Caste",
          children: [
            {
              key: "3-1",
              label: "SC/ST",
              onClick: () => {
                let arr = filterOptions;
                setFilterOptions({
                  ...arr,
                  caste: "sc/st/other",
                });
              },
            },
            {
              key: "3-2",
              label: "BC",
              onClick: () => {
                let arr = filterOptions;
                setFilterOptions({
                  ...arr,
                  caste: "bc",
                });
              },
            },
            {
              key: "3-3",
              label: "All",
              onClick: () => {
                let arr = filterOptions;
                setFilterOptions({
                  ...arr,
                  caste: "all",
                });
              },
            },
          ],
        },
      ]}
    />
  );

  const filterSort = (data) => {
    let filteredList = [];
    for (let list of data) {
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
    }

    if (filterOptions.deliveredOn === "ascending") {
      data.sort(function (a, b) {
        return new Date(b.dateOfBirth) - new Date(a.dateOfBirth);
      });
    } else if (filterOptions.deliveredOn === "descending") {
      data.sort(function (a, b) {
        return new Date(a.dateOfBirth) - new Date(b.dateOfBirth);
      });
    }
    setFilteredAid(filteredList);
  };

  return (
    <div>
      <div style={{ marginTop: "1rem" }}>
        <Card
          title={"Aids Issued List"}
          style={{ height: "90%", width: "100%" }}
        ></Card>
      </div>
      <Card>
        {"Result Found: " + filteredAid?.length || 0}
        <Dropdown overlay={menu}>
          <Button
            style={{ marginLeft: "4rem" }}
            icon={<FilterOutlined />}
          ></Button>
        </Dropdown>
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

export default MonitorAidIssued;
