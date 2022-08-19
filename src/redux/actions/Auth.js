import {
  AUTHENTICATED,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  UPDATE_ACCESS,
} from "../constants/Auth";

export const authenticated = (token, access) => {
  return {
    type: AUTHENTICATED,
    access,
    token,
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token,
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message,
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};

export const updateAccess = (accessList) => {
  return {
    type: UPDATE_ACCESS,
    accessList,
  };
};
