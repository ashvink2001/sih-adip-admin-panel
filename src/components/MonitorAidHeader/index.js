import { Button, Form, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { detail } from "utils/stateData/data";
import { SearchOutlined } from "@ant-design/icons";
import { AgencyData } from "utils/stateData/agencyData";

const { Option } = Select;

const MonitorAidHeader = ({ onSearchSubmit }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedAid, setSelectedAid] = useState("");

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

      <Select
        size="large"
        style={{ width: "20rem" }}
        showSearch
        placeholder="Please Select the aid"
        optionFilterProp="children"
        onChange={(value) => setSelectedAid(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {AgencyData.map((aid) => (
          <Option key={aid} value={aid}>
            {aid}
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
          disabled={selectedAid == ""}
          type="primary"
          icon={<SearchOutlined />}
          onClick={() =>
            onSearchSubmit(selectedState, selectedDistrict, selectedAid)
          }
        >
          Search
        </Button>
      </Tooltip>
      <Button
        onClick={() => {
          setSelectedAid(" ");
          setSelectedDistrict(" ");
          setSelectedState(" ");
        }}
      >
        Clear
      </Button>
    </Form>
  );
};

export default MonitorAidHeader;
