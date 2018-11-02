import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { remove } from 'react-icons-kit/fa/remove';
import { REMOVE_FROM_CART_SAGA } from '../redux/constants/ActionTypes';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { ToastContainer } from "react-toastify";
import { commafy } from "../untils";
import "react-toastify/dist/ReactToastify.css";

const ShoppingCartList = props => {
  return (
    <div className="shoppingCart row">
      <ToastContainer autoClose={2000} />
      {
        props.cart.length === 0 &&
        <div className="col-12 empty">
          購物車內沒有任何行程，
            <br />
          快去購物吧!!!
            <br />
          <Button color="info" onClick={() => props.history.push('./')}>立刻前往</Button>
        </div>
      }
      {
        props.cart.map((item, i) => {
          return (
            <div className="item col-12 col-md-6" key={item.uid + i}>
              <div>
                <div className="d-flex">
                  <div className="img" style={{ backgroundImage: `url( '${item.src}' )` }}></div>
                  <div className="title">{item.title}</div>
                </div>
                <span className="location">地點: {item.location.city}</span>
                <span className="price">金額: $ {commafy(item.price)}</span>
              </div>
              <div className="remove">
                <Icon size={35} icon={remove} onClick={() => props.removeFromCart(i)} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: (product) => dispatch({ type: REMOVE_FROM_CART_SAGA, cart: product }),
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCartList))