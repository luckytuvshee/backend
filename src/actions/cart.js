import axios from "axios";
import {
  GET_CART_ITEMS,
  ADD_CART_ITEM,
  DELETE_CART_ITEM,
  DELETE_GUEST_CART_ITEM,
  CHANGE_ITEM_QUANTITY,
  CHANGE_GUEST_ITEM_QUANTITY,
  CART_ERROR,
  GET_CART_PRODUCT,
  CLEAR_CART_CACHE,
  ADD_GUEST_CART_ITEM,
  GET_GUEST_CART_ITEMS,
  CLEAR_COOKIE,
  IMPORT_CART_ITEM_FROM_COOKIE,
} from "../actions/types";
import { toast } from "react-toastify";
import { clearInstantPurchase } from "./order";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// Get Cart Items
export const getCartItems = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/baskets/${user_id}`);

    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err },
    });
  }
};

// Change Cart Item Quantity
// id is basket item id
export const changeCartItemQuantity = (id, quantity) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ quantity });

  // I trust my api, so I'll dispatch before actually request sent, then my re render'll be fast
  dispatch({
    type: CHANGE_ITEM_QUANTITY,
    payload: {
      id,
      quantity,
    },
  });

  try {
    await axios.post(`/api/basket/change/${id}`, body, config);
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err },
    });
  }
};

export const addCartItem =
  (user_id, product_id, quantity) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch(clearInstantPurchase());

    const body = JSON.stringify({ user_id, product_id, quantity });

    try {
      const res = await axios.post("/api/baskets", body, config);

      console.log("body:", body);
      console.log("res:", res);

      if (res.data.updated === 0) {
        dispatch({
          type: ADD_CART_ITEM,
          payload: res.data.basket,
        });
      } else {
        dispatch({
          type: CHANGE_ITEM_QUANTITY,
          payload: res.data.basket,
        });
      }
    } catch (err) {
      toast.error(JSON.stringify(err));
      dispatch({
        type: CART_ERROR,
        payload: { msg: err },
      });
    }
  };

// Delete Cart Item
// id is basket item id
export const deleteCartItem = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/basket/delete/${id}`);

    dispatch({
      type: DELETE_CART_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err },
    });
  }
};

// clear fetched cart products
export const clearCartCache = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART_CACHE,
    payload: null,
  });
};

export const clearCookie = () => (dispatch) => {
  const cartItems = Object.entries(cookies.getAll());
  for (let i = 0; i < cartItems.length; i++) {
    cookies.remove(cartItems[i][0]);
  }

  dispatch({
    type: CLEAR_COOKIE,
  });
};

// Get Cart Product
export const getProduct = (product_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/basket/product/${product_id}`);
    console.log("res data");
    console.log(res.data.product);
    dispatch({
      type: GET_CART_PRODUCT,
      payload: {
        product: res.data.product,
        id: product_id,
      },
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err },
    });
  }
};

export const importCartItemsFromCookie = (user_id) => async (dispatch) => {
  var cartItems = Object.entries(cookies.getAll());

  cartItems = cartItems.map((item) => {
    return {
      product_id: item[0],
      quantity: item[1],
    };
  });

  console.log("cartItems:", cartItems);
  console.log("user_id:", user_id);

  for (let i = 0; i < cartItems.length; i++) {
    console.log(i + ": " + cartItems[i].product_id);
    console.log(i + ": " + cartItems[i].quantity);
    dispatch(
      addCartItem(user_id, cartItems[i].product_id, cartItems[i].quantity)
    );
  }

  dispatch(clearCookie());

  dispatch({
    type: IMPORT_CART_ITEM_FROM_COOKIE,
  });
};

// GUEST

export const addGuestCartItem = (product_id, quantity) => (dispatch) => {
  const item = cookies.get(product_id);

  if (item) {
    cookies.set(product_id, parseInt(item) + quantity);
    dispatch({
      type: CHANGE_GUEST_ITEM_QUANTITY,
      payload: {
        product_id,
        quantity: parseInt(item) + quantity,
      },
    });
  } else {
    const cartItem = {
      product_id,
      quantity,
    };

    dispatch({
      type: ADD_GUEST_CART_ITEM,
      payload: cartItem,
    });
    cookies.set(product_id, quantity);
  }
};

// Get Guest Cart Items
export const getGuestCartItems = () => async (dispatch) => {
  var cartItems = Object.entries(cookies.getAll());

  cartItems = cartItems.map((item) => {
    return {
      product_id: item[0],
      quantity: item[1],
    };
  });

  console.log(cartItems);

  if (cartItems.length === 0) {
    dispatch({
      type: GET_GUEST_CART_ITEMS,
      payload: [],
    });
  } else {
    dispatch({
      type: GET_GUEST_CART_ITEMS,
      payload: cartItems,
    });
  }
};

// delete guest cart item
export const deleteGuestCartItem = (product_id) => (dispatch) => {
  cookies.remove(product_id);

  dispatch({
    type: DELETE_GUEST_CART_ITEM,
    payload: product_id,
  });
};

// Change Cart Item Quantity
// id is item product_id
export const changeGuestCartItemQuantity =
  (product_id, quantity) => (dispatch) => {
    cookies.set(product_id, quantity);

    dispatch({
      type: CHANGE_GUEST_ITEM_QUANTITY,
      payload: {
        product_id,
        quantity: quantity,
      },
    });
  };
