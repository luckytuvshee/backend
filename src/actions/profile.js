import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  ADD_LIKE,
  REMOVE_LIKE,
  GET_LIKED_PRODUCTS,
  GET_USER_ADDRESSES,
  ADD_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  GET_ALL_ADDRESSES,
} from './types';
import { setOrderAddress } from './order';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      typ: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Liked Product
export const addLikedProduct = (user_id, product_id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ user_id, product_id });

  console.log(body);

  try {
    const res = await axios.post('/api/profile/liked', body, config);

    dispatch({
      type: ADD_LIKE,
      payload: res.data.product,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Remove Liked Product
export const removeLikedProduct = (user_id, product_id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ user_id, product_id });

  try {
    const res = await axios.post('/api/profile/unliked', body, config);

    console.log('dispatching remove like');
    console.log('dispatching remove like: ' + res.data.liked_id);

    dispatch({
      type: REMOVE_LIKE,
      payload: res.data.liked_id,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Get liked products
export const getLikedProducts = (user_id) => async (dispatch) => {
  if (user_id === -1) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: 'Хэрэглэгч нэвтрээгүй байна', status: 400 },
    });
    return;
  }

  try {
    const res = await axios.get(`/api/profile/liked/${user_id}`);

    dispatch({
      type: GET_LIKED_PRODUCTS,
      payload: res.data.liked_products,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Get user addresses
export const getUserAddresses = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/address/${user_id}`);

    dispatch({
      type: GET_USER_ADDRESSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Get all addresses
export const getAllAddresses = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/address');

    dispatch({
      type: GET_ALL_ADDRESSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Get all addresses
export const addAddress = ({
  user_id,
  city_id,
  district_id,
  subdistrict_id,
  details,
  receiver_name,
  mobile_number,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    user_id,
    city_id,
    district_id,
    subdistrict_id,
    details,
    receiver_name,
    mobile_number,
  });
  try {
    const res = await axios.post('/api/address', body, config);

    dispatch({
      type: ADD_USER_ADDRESS,
      payload: res.data,
    });

    dispatch(setOrderAddress(res.data.id));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Change address
export const changeAddress = ({
  address_id,
  city_id,
  district_id,
  subdistrict_id,
  details,
  receiver_name,
  mobile_number,
}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    city_id,
    district_id,
    subdistrict_id,
    details,
    receiver_name,
    mobile_number,
  });

  try {
    const res = await axios.post(`/api/address/${address_id}`, body, config);

    dispatch({
      type: UPDATE_USER_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Get all addresses
export const deleteAddress = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/address/${id}`);

    dispatch({
      type: DELETE_USER_ADDRESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err },
    });
  }
};

// Update profile

// Delete account
