import Panel from "layouts/panel";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { signOutSuccess, updateAccess } from "redux/actions/Auth";
import { connect } from "react-redux";
import { onValue, ref } from "firebase/database";
import { database } from "firebaseConfig/config";

const Dashboard = ({ updateAccess, signOutSuccess, token, access }) => {
  const router = useRouter();

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

  const fetchAccessList = (token) => {
    onValue(ref(database, "admin/" + token), (snapshot) => {
      const value = snapshot.val();
      updateAccess(value.access);
    });
  };

  useEffect(() => {
    if (access?.length === 0) {
      fetchAccessList(token);
    }

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
  const { token, access } = auth;
  return { token, access };
};
export default connect(mapStateToProps, { signOutSuccess, updateAccess })(
  Dashboard
);
