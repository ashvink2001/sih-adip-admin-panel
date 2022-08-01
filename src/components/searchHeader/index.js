import { Button, Form, Input, Select, Tooltip } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchHeader = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Form
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "3rem 0rem 4rem 0rem",
      }}
    >
      <Input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="enter UDID"
        style={{ width: "60rem", marginRight: "2rem" }}
        size="large"
      />

      <Tooltip title={searchTerm === "" ? "Enter Id to Search" : ""}>
        <Button
          disabled={searchTerm == ""}
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => onSearchSubmit(searchTerm)}
        >
          Search
        </Button>
      </Tooltip>
    </Form>
  );
};

export default SearchHeader;
