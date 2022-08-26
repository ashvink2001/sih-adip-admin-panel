import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Menu,
  Select,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { detail } from "utils/stateData/data";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

const { RangePicker } = DatePicker;

const StateHeader = ({ onSearchSubmit, setFilterOptions, filterOption }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedData, setSelectedDate] = useState([]);

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
                let arr = filterOption;
                setFilterOptions((prevState) => ({
                  ...arr,
                  gender: "male",
                }));
              },
            },
            {
              key: "1-2",
              label: "Female",
              onClick: () => {
                let arr = filterOption;
                setFilterOptions((prevState) => ({
                  ...arr,
                  gender: "female",
                }));
              },
            },
            {
              key: "1-3",
              label: "Other",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  gender: "other",
                }));
              },
            },
            {
              key: "1-4",
              label: "All",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  gender: "all",
                }));
              },
            },
          ],
        },
        {
          key: "2",
          label: "Date of Birth",
          children: [
            {
              key: "2-1",
              label: "Ascending",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  dob: "ascending",
                }));
              },
            },
            {
              key: "2-2",
              label: "Descending",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  dob: "descending",
                }));
              },
            },
            {
              key: "2-3",
              label: "None",
              onClick: () => {
                setFilterOptions((prevState) => ({
                  ...prevState,
                  dob: "none",
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
              label: "SC/BC",
              onClick: () => {
                let arr = filterOption;
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
                let arr = filterOption;
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
                let arr = filterOption;
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
          onClick={() =>
            onSearchSubmit(selectedState, selectedDistrict, selectedData)
          }
        >
          Search
        </Button>
      </Tooltip>
      <RangePicker
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
        onChange={(e) => setSelectedDate([e[0].format("x"), e[1].format("x")])}
      />
      <Dropdown overlay={menu}>
        <Button icon={<FilterOutlined />}></Button>
      </Dropdown>
    </Form>
  );
};

export default StateHeader;
