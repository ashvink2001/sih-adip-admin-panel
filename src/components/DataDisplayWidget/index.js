import React from "react";
import { Card, Avatar, Row } from "antd";
import CustomStatistic from "../CustomStatistic";
import Flex from "components/Flex";

const DataDisplayWidget = (props) => {
  const { size, value, title, icon, color, avatarSize, vertical, children } =
    props;
  const customStatisticProps = { size, value, title };
  return (
    <Card style={{ width: "100%" }}>
      <Flex alignItems="center" flexDirection={vertical ? "column" : "row"}>
        <Avatar
          size={avatarSize}
          shape="square"
          icon={icon}
          className={`ant-avatar-${color}`}
        />
        <div className={vertical ? "mt-3 text-center" : "ml-3"}>
          <CustomStatistic {...customStatisticProps} />
        </div>
        {children && (
          <div style={{ marginTop: "1.5rem", marginBottom: "2rem" }}>
            {children}
          </div>
        )}
      </Flex>
    </Card>
  );
};

DataDisplayWidget.defaultProps = {
  avatarSize: 50,
  vertical: false,
};

export default DataDisplayWidget;
