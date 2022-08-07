import { Button, Form, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { detail } from "utils/stateData/data";
import { SearchOutlined } from "@ant-design/icons";
import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig/config";

const { Option } = Select;

const NgoSearch = ({ onSearchSubmit }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCamp, setSelectedCamp] = useState("");
  const [campList, setCampList] = useState([]);

  const fetchCampList = async (state, district) => {
    let campIdList = [];
    let tempList = [];
    await onValue(
      ref(database, "campingLocations/" + state + "/" + district + "/"),
      (snapshot) => {
        if (snapshot.val()) {
          campIdList = Object.keys(snapshot.val());
        }
      }
    );

    if (campIdList.length > 0) {
      for (let campId of campIdList) {
        await onValue(ref(database, "CAMPING/" + campId + "/"), (snapshot) => {
          if (snapshot.val()) tempList.push(snapshot.val());
        });
      }
    }

    if (tempList.length > 0) {
      setCampList(tempList);
    }
  };

  return (
    <Form style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Select
        size="large"
        style={{ width: "20rem" }}
        showSearch
        placeholder="Select The State"
        optionFilterProp="children"
        onChange={(value) => setSelectedState(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {detail.states.map((state) => (
          <Option key={state.state} value={state.state}>
            {state.state}
          </Option>
        ))}
      </Select>

      <Select
        size="large"
        style={{ width: "20rem" }}
        showSearch
        placeholder="Please Select State to Search District"
        disabled={selectedState === ""}
        optionFilterProp="children"
        onChange={(value) => {
          setSelectedDistrict(value);
          fetchCampList(selectedState, value);
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {selectedState &&
          detail.states
            .find((state) => state.state === selectedState)
            ?.districts.map((district) => (
              <Option key={district} value={district}>
                {district}
              </Option>
            ))}
      </Select>

      <Select
        size="large"
        style={{ width: "20rem" }}
        showSearch
        placeholder="Please Select the Ngo Camp"
        disabled={selectedDistrict === ""}
        optionFilterProp="children"
        onChange={(value) => setSelectedCamp(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {selectedDistrict &&
          campList.map((camp) => (
            <Option key={camp.campId} value={camp.campId}>
              {camp.campingName}
            </Option>
          ))}
      </Select>
      <Tooltip
        title={
          selectedDistrict === "" || selectedState === "" || selectedCamp === ""
            ? "Select State and District and Camp to search"
            : ""
        }
      >
        <Button
          disabled={selectedCamp === ""}
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => {
            onSearchSubmit(
              campList.find((camp) => selectedCamp === camp.campId)
            );
          }}
        >
          Search
        </Button>
      </Tooltip>
    </Form>
  );
};

export default NgoSearch;
