import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../utils/config";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
  LOG_OUT_FAILED,
} from "../actionTypes";

export const register = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          email: user.email,
        },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
        })
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          errorCode: errorCode,
          errorMessage: errorMessage,
        },
      });
    });
};

export const signIn = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
        },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          accessToken: user.accessToken,
        })
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          errorCode: errorCode,
          errorMessage: errorMessage,
        },
      });
    });
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("products");
      localStorage.removeItem("subscription");
    })
    .catch((error) => {
      dispatch({
        type: LOG_OUT_FAILED,
        payload: error,
      });
    });
};
