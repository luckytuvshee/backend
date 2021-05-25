import {
  GET_USER_ORDERS,
  ORDER_ERROR,
  SET_ORDER_ADDRESS,
  SET_INSTANT_PURCHASE_INFO,
  MAKE_ORDER,
  MAKE_GUEST_ORDER,
  MAKE_INSTANT_ORDER,
  CLEAR_INSTANT_PURCHASE_INFO,
} from "./types";
import axios from "axios";
import { getCartItems, clearCartCache, clearCookie } from "./cart";
import { toast } from "react-toastify";

export const getUserOrders = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/orders/${id}`);

    dispatch({
      type: GET_USER_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: err,
    });
  }
};

export const instantPurchase =
  ({ user_id, product_id, quantity, price }) =>
  (dispatch) => {
    dispatch({
      type: SET_INSTANT_PURCHASE_INFO,
      payload: {
        user_id,
        product_id,
        quantity,
        price,
      },
    });
  };

export const clearInstantPurchase = () => (dispatch) => {
  dispatch({
    type: CLEAR_INSTANT_PURCHASE_INFO,
  });
};

export const makeInstantOrder =
  ({ user_id, product_id, quantity, address_id, account_number }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      user_id,
      product_id,
      quantity,
      address_id,
      account_number,
    });

    try {
      const res = await axios.post("/api/orders/instant", body, config);

      dispatch({
        type: MAKE_INSTANT_ORDER,
        payload: res.data,
      });

      dispatch({
        type: CLEAR_INSTANT_PURCHASE_INFO,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err,
      });
    }
  };

export const makeOrder =
  ({ user_id, basket_id, address_id, account_number, amount }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      user_id,
      basket_id,
      address_id,
      account_number,
      amount,
    });

    try {
      const res = await axios.post("/api/orders", body, config);

      dispatch({
        type: MAKE_ORDER,
        payload: res.data,
      });

      dispatch(getCartItems(user_id));
      dispatch(clearCartCache());
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err,
      });
    }
  };

export const makeGuestOrder =
  ({ user_id, cartItems, address_id, account_number, amount }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      user_id,
      cartItems,
      address_id,
      account_number,
      amount,
    });

    try {
      const res = await axios.post("/api/orders/guest", body, config);

      dispatch({
        type: MAKE_GUEST_ORDER,
        payload: res.data,
      });

      dispatch(clearCookie());
      dispatch(clearCartCache());
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err,
      });
    }
  };

export const setOrderAddress = (id) => (dispatch) => {
  dispatch({
    type: SET_ORDER_ADDRESS,
    payload: id,
  });
};
