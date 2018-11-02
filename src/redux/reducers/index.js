import { combineReducers } from 'redux';
import member from './member';
import cart from "./cart";
import products from "./product";

const rootReducer = combineReducers({
  user: member,
  cart,
  products
});
export default rootReducer;