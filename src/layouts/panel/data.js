import {
  HomeOutlined,
  FileSearchOutlined,
  UserOutlined,
  DiffOutlined,
  PictureOutlined,
  WechatOutlined,
  BankOutlined,
  ControlOutlined,
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
  verification: getItem("Verification", "2", <UserOutlined />, [
    getItem("Place", "3", <PictureOutlined />),
    getItem("Search", "4", <FileSearchOutlined />),
  ]),
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
