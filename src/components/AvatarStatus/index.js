import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";

const renderAvatar = (props) => {
  return (
    <Avatar
      {...props}
      className={`ant-avatar-${props.type}`}
      style={{
        backgroundColor: "violet",
        marginRight: ".6rem",
      }}
    >
      {props.text}
    </Avatar>
  );
};

export const AvatarStatus = (props) => {
  const {
    name,
    suffix,
    id,
    type,
    src,
    icon,
    size,
    shape,
    gap,
    text,
    onNameClick,
    subTitle,
  } = props;
  return (
    <div className="avatar-status d-flex align-items-center">
      {renderAvatar({ icon, src, type, size, shape, gap, text })}
      <div className="ml-2">
        <div>
          {onNameClick ? (
            <div
              onClick={() => onNameClick({ name, subTitle, src, id })}
              className="avatar-status-name clickable"
            >
              {name}
            </div>
          ) : (
            <div className="avatar-status-name">{name}</div>
          )}
          <span>{suffix}</span>
        </div>
        {subTitle && (
          <div
            className="text-muted avatar-status-subtitle"
            style={{ width: "10rem" }}
          >
            {subTitle}
          </div>
        )}
      </div>
    </div>
  );
};

AvatarStatus.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
  onNameClick: PropTypes.func,
};

export default AvatarStatus;
