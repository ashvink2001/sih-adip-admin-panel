import Panel from "layouts/panel";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { signOutSuccess } from "redux/actions/Auth";
import { connect, useSelector } from "react-redux";
import { AUTH_TOKEN } from "redux/constants/Auth";

const Dashboard = () => {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);

  const setAutoLogout = (remainingTime) => {
    setTimeout(() => {
      signOutSuccess();
    }, remainingTime);
  };

  const handleAutologout = () => {
    const token = localStorage.getItem("auth_token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      signOutSuccess();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAutoLogout(remainingMilliseconds);
  };

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    console.log(authToken);
    if (!token) {
      router.push("/login");
    } else {
      handleAutologout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Panel />
    </div>
  );
};
const mapStateToProps = ({ auth }) => {
  const { token } = auth;
  return { token };
};
export default connect(mapStateToProps, { signOutSuccess })(Dashboard);
