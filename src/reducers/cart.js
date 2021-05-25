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
  CLEAR_COOKIE,
  ADD_GUEST_CART_ITEM,
  GET_GUEST_CART_ITEMS,
  IMPORT_CART_ITEM_FROM_COOKIE,
} from "../actions/types";
import { toast } from "react-toastify";

const initialState = {
  cartInfo: null,
  cartItems: [],
  guestCartItems: [],
  cartProducts: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CART_ITEMS:
      const basket_items = payload.length === 0 ? [] : payload.basket_item;

      return {
        ...state,
        cartItems: basket_items,
        cartInfo: {
          id: payload.id,
        },
        loading: false,
      };

    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [payload, ...state.cartItems],
        loading: false,
      };

    case DELETE_CART_ITEM:
      const remainingCartProducts = state.cartProducts;
      delete remainingCartProducts[payload.product_id];
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload.id),
        cartProducts: remainingCartProducts,
        loading: false,
      };

    case DELETE_GUEST_CART_ITEM:
      const newCartProducts = state.cartProducts;
      delete newCartProducts[payload];

      return {
        ...state,
        guestCartItems: state.guestCartItems.filter(
          (item) => item.product_id !== payload
        ),
        cartProducts: newCartProducts,
        loading: false,
      };

    case CLEAR_CART_CACHE:
      return {
        ...state,
        cartItems: [],
        guestCartItems: [],
        cartProducts: {},
        loading: false,
      };

    case CLEAR_COOKIE:
      return {
        ...state,
        loading: false,
      };
    case CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          var temp = item;
          if (item.id === payload.id) {
            temp.quantity = payload.quantity;
          }
          return temp;
        }),
        loading: false,
      };

    case CHANGE_GUEST_ITEM_QUANTITY:
      return {
        ...state,
        guestCartItems: state.guestCartItems.map((item) => {
          var temp = item;
          if (item.product_id === payload.product_id) {
            temp.quantity = payload.quantity;
          }
          return temp;
        }),
        loading: false,
      };

    case GET_CART_PRODUCT:
      state.cartProducts[payload.id] = payload.product;
      return {
        ...state,
        cartProducts: state.cartProducts,
        loading: false,
      };

    case CART_ERROR:
      console.log(payload);
      return {
        ...state,
        loading: false,
      };

    case IMPORT_CART_ITEM_FROM_COOKIE:
      return {
        ...state,
        loading: false,
      };

    case ADD_GUEST_CART_ITEM:
      return {
        ...state,
        guestCartItems: [...state.guestCartItems, payload],
        loading: false,
      };

    case GET_GUEST_CART_ITEMS:
      return {
        ...state,
        guestCartItems: payload,
        loading: false,
      };

    default:
      return state;
  }
}
