import {
  GET_USER_ORDERS,
  ORDER_ERROR,
  SET_ORDER_ADDRESS,
  MAKE_ORDER,
  SET_INSTANT_PURCHASE_INFO,
  CLEAR_INSTANT_PURCHASE_INFO,
  MAKE_GUEST_ORDER,
  MAKE_INSTANT_ORDER,
} from '../actions/types';
import { toast } from 'react-toastify';

const initialState = {
  userOrders: [],
  instantPurchaseInfo: null,
  orderAddress: null,
  lastOrderId: -1,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_ORDERS:
      return {
        ...state,
        userOrders: payload,
        loading: false,
      };

    case MAKE_ORDER:
      return {
        ...state,
        userOrders: [...state.userOrders, payload],
        orderAddress: -1,
        lastOrderId: payload.order_id,
        loading: false,
      };

    case MAKE_INSTANT_ORDER:
      return {
        ...state,
        userOrders: [...state.userOrders, payload],
        orderAddress: -1,
        lastOrderId: payload.order_id,
        loading: false,
      };

    case SET_ORDER_ADDRESS:
      return {
        ...state,
        orderAddress: payload,
        loading: false,
      };

    case ORDER_ERROR:
      toast.error(`ORDER ERROR: ${payload}`);
      return {
        ...state,
        loading: false,
      };

    case SET_INSTANT_PURCHASE_INFO:
      return {
        ...state,
        instantPurchaseInfo: payload,
        loading: false,
      };

    case MAKE_GUEST_ORDER:
      return {
        ...state,
        lastOrderId: payload.order_id,
        loading: false,
      };

    case CLEAR_INSTANT_PURCHASE_INFO:
      return {
        ...state,
        instantPurchaseInfo: null,
        loading: false,
      };

    default:
      return state;
  }
}
