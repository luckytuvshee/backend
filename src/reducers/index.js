import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import product from './product';
import profile from './profile';
import cart from './cart';
import order from './order';

export default combineReducers({
  alert,
  auth,
  product,
  profile,
  cart,
  order,
});
