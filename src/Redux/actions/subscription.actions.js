import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_SUCCESS,
} from "../actionTypes";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/config";

export const getSubscription = (userId) => async (dispatch) => {
  dispatch({
    type: SUBSCRIPTION_REQUEST,
  });
  let subscription = null;
  const ref = collection(db, `customers/${userId}/subscriptions`);
  const snapshot = await getDocs(ref);
  snapshot.forEach((doc) => {
    if (doc.data().status) {
      subscription = {
        endAt: doc.data().current_period_end.seconds,
        role: doc.data().role,
      };
      localStorage.setItem(
        "subscription",
        JSON.stringify({
          endAt: doc.data().current_period_end.seconds,
          role: doc.data().role,
        })
      );
    }
  });
  dispatch({
    type: SUBSCRIPTION_SUCCESS,
    payload: subscription,
  });
};

export const getProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_REQUEST,
  });
  let products = {};
  const conditional_fetch = query(
    collection(db, "products"),
    where("active", "==", true)
  );
  const querySnapshot = await getDocs(conditional_fetch);

  querySnapshot.forEach((doc) => {
    products[doc.id] = doc.data();
  });
  dispatch({
    type: PRODUCTS_SUCCESS,
    payload: products,
  });
  localStorage.setItem("products", JSON.stringify(products));
};
