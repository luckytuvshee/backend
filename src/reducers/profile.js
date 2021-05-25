import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_LIKED_PRODUCTS,
  ADD_LIKE,
  REMOVE_LIKE,
  GET_USER_ADDRESSES,
  GET_ALL_ADDRESSES,
  ADD_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
} from '../actions/types';

const initialState = {
  profile: null,
  likedProducts: [],
  userAddresses: [],
  allAddresses: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      // toast.error('profile error kkkk' + JSON.stringify(payload));
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        likedProducts: [],
        loading: false,
      };

    case GET_LIKED_PRODUCTS:
      return {
        ...state,
        likedProducts: payload,
        loading: false,
      };

    case GET_USER_ADDRESSES:
      return {
        ...state,
        userAddresses: payload,
        loading: false,
      };

    case GET_ALL_ADDRESSES:
      return {
        ...state,
        allAddresses: payload,
        loading: false,
      };

    case ADD_USER_ADDRESS:
      return {
        ...state,
        userAddresses: [...state.userAddresses, payload],
        loading: false,
      };

    case DELETE_USER_ADDRESS:
      return {
        ...state,
        userAddresses: state.userAddresses.filter(
          (address) => address.id !== payload
        ),
        loading: false,
      };

    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        userAddresses: state.userAddresses.map((address) =>
          address.id === payload.id ? payload : address
        ),
        loading: false,
      };

    case ADD_LIKE:
      return {
        ...state,
        likedProducts: [...state.likedProducts, payload],
        loading: false,
      };

    case REMOVE_LIKE:
      console.log('in remove like dispatch');
      return {
        ...state,
        likedProducts: state.likedProducts.filter(
          (liked) => liked.id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
}
