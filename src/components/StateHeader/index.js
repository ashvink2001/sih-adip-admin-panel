import { Button, Form, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { detail } from "utils/stateData/data";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const StateHeader = ({ onSearchSubmit }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
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
        onChange={(value) => setSelectedDistrict(value)}
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
      <Tooltip
        title={
          selectedDistrict === "" || selectedState === ""
            ? "Select State and District to search"
            : ""
        }
      >
        <Button
          disabled={selectedDistrict == ""}
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => onSearchSubmit(selectedState, selectedDistrict)}
        >
          Search
        </Button>
      </Tooltip>
    </Form>
  );
};

export default StateHeader;
