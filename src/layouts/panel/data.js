import {
  HomeOutlined,
  FileSearchOutlined,
  UserOutlined,
  DiffOutlined,
  PictureOutlined,
  WechatOutlined,
  BankOutlined,
  ControlOutlined,
  FilePdfOutlined,
  PlusCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const navData = {
  documentVerification: getItem(
    "Document Verification",
    "9",
    <FilePdfOutlined />,
    [
      getItem("Place", "3", <PictureOutlined />),
      getItem("Search", "4", <FileSearchOutlined />),
    ]
  ),
  doctorVerification: getItem(
    "Doctor Verification",
    "12",
    <PlusCircleOutlined />,
    [
      getItem("Place", "13", <PictureOutlined />),
      getItem("Search", "14", <FileSearchOutlined />),
    ]
  ),
  news: getItem("News Update", "5", <DiffOutlined />),
  supportChat: getItem("Support Chat", "6", <WechatOutlined />),
  ngo: getItem("Agency ", "7", <BankOutlined />),
  admin: getItem("Admin Control", "8", <ControlOutlined />),
};

export const fetchAdminMenu = (access) => {
  let accessList = [getItem("Home", "1", <HomeOutlined />)];
  access.map((accessWord) => {
    if (navData[accessWord]) {
      accessList.push(navData[accessWord]);
    }
  });
  return accessList;
};
