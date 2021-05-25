import axios from 'axios';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOGOUT,
  CHANGE_USER_INFORMATION,
  REGISTER,
  REGISTER_FAIL,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';
import { getLikedProducts, getUserAddresses, getAllAddresses } from './profile';
import {
  getCartItems,
  clearCartCache,
  getGuestCartItems,
  importCartItemsFromCookie,
} from './cart';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(getLikedProducts(res.data.id));
    dispatch(importCartItemsFromCookie(res.data.id));
    dispatch(getCartItems(res.data.id));
    dispatch(getUserAddresses(res.data.id));
    dispatch(getAllAddresses());
  } catch (err) {
    dispatch(getGuestCartItems());
    dispatch(getAllAddresses());
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    toast.success('Амжилттай нэвтэрлээ');
    dispatch(clearCartCache());
    dispatch(loadUser());
  } catch (err) {
    toast.error('Хэрэглэгчийн имэйл эсвэл нууц үг буруу байна');
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Register
export const register = (
  { first_name, last_name, email, mobile_number, password },
  history
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    mobile_number,
    password,
  });

  try {
    const res = await axios.post('/api/auth/register', body, config);

    dispatch({
      type: REGISTER,
      payload: res.data,
    });

    history.push('/');

    toast.success('Амжилттай бүртгэгдлээ, та өөрийн мэдээллээр нэвтэрнэ үү');
    dispatch(loadUser());
  } catch (err) {
    toast.error('Имэйл давхцаж байна');
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Change information
export const changeInformation = (id, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ formData });

  try {
    const res = await axios.post(`/api/auth/${id}`, body, config);
    dispatch({
      type: CHANGE_USER_INFORMATION,
      payload: res.data,
    });
  } catch (err) {
    console.log('error while changing user information');
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch(clearCartCache());
  dispatch(getGuestCartItems());
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
