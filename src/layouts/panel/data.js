import {
  HomeOutlined,
  FileSearchOutlined,
  UserOutlined,
  DiffOutlined,
  PictureOutlined,
  WechatOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const navData = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Verification", "2", <UserOutlined />, [
    getItem("Place", "3", <PictureOutlined />),
    getItem("Search", "4", <FileSearchOutlined />),
  ]),
  getItem("News Update", "5", <DiffOutlined />),
  getItem("Support Chat", "6", <WechatOutlined />),
];
