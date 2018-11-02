import { LOGIN_MEMBER, LOGOUT_MEMBER, ADD_TO_CART, RECEIVE_PRODUCTS, REMOVE_FROM_CART, CLEAN_CART } from "../constants/ActionTypes";
export const login = (action) => ({ type: LOGIN_MEMBER, user: action });
export const logout = (action) => ({ type: LOGOUT_MEMBER, user: action.user });
export const addToCart = (action) => ({ type: ADD_TO_CART, cart: action.cart });
export const removeFromCart = (action) => ({ type: REMOVE_FROM_CART, cart: action.cart });
export const cleanCart = (action) => ({ type: CLEAN_CART, cart: action.cart });
export const receiveProducts = (action) => ({ type: RECEIVE_PRODUCTS, products: action });