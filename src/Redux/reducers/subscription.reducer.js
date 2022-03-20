import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  SUBSCRIPTION_REQUEST,
  SUBSCRIPTION_SUCCESS,
} from "../actionTypes";

const initState = {
  loading: false,
  endAt: localStorage.getItem("subscription")
    ? JSON.parse(localStorage.getItem("subscription")).endAt
    : null,
  role: localStorage.getItem("subscription")
    ? JSON.parse(localStorage.getItem("subscription")).role
    : null,
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : null,
  productsLoading: false,
};

export const subscriptionReducer = (prevState = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case SUBSCRIPTION_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case SUBSCRIPTION_SUCCESS:
      return {
        ...prevState,
        loading: false,
        endAt: payload.endAt,
        role: payload.role,
      };
    case PRODUCTS_REQUEST:
      return {
        ...prevState,
        productsLoading: true,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...prevState,
        productsLoading: false,
        products: payload,
      };
    default:
      return { prevState };
  }
};
