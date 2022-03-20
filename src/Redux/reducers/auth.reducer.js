import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
  LOG_OUT_FAILED,
} from "../actionTypes";

const initState = {
  uid: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).uid
    : null,
  email: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).email
    : null,
  error: null,
  loading: false,
};

export const authReducer = (prevState = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        uid: payload.uid,
        email: payload.email,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...prevState,
        uid: null,
        email: null,
        loading: false,
        error: {
          errorCode: payload.errorCode,
          errorMessage: payload.errorMessage,
        },
      };
    case LOG_OUT:
      return {
        ...prevState,
        uid: null,
        email: null,
        loading: false,
      };
    case LOG_OUT_FAILED:
      return {
        ...prevState,
        uid: null,
        email: null,
        loading: false,
        error: payload,
      };
    default:
      return prevState;
  }
};
