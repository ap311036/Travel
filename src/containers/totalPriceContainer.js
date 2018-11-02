import React from 'react';
import { connect } from 'react-redux';
import { addOrder } from "../saga/firebase";
// import { Icon } from 'react-icons-kit';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';



class TotalPriceContainer extends React.Component {

  componentDidMount() {
    window.addEventListener("message", this.listenFn);
  }
  componentWillUnmount() {
    document.removeEventListener('message', this.listenFn);
  }

  listenFn = async(ev) => {
    // if (ev.origin === window.location.origin) {
    //   console.log("子視窗父向視窗傳送的資料是：" + JSON.stringify(ev.data));
    //   console.log("資料來源是：" + ev.origin);
    // }
    if (JSON.stringify(ev.data) === JSON.stringify({pay: true}) ){
      let cart = [];
      const order = await addOrder(this.props.user, this.props.cart);
      this.props.dispatch({ type: 'CLEAN_CART_SAGA', cart});
      this.props.history.replace({ pathname: '/thanks/' + order.orderNumber });
    }
  }
  
  countPrice = () => {
    const {
      cart
    } = this.props;
    // 處理每個元素後等待回傳結果，第一次處理時代入初始值 0
    let total = cart
      .map(function (element) {
        return element.price;
      }).reduce(function (prev, element) {
      // 與之前的數值加總，回傳後代入下一輪的處理
      return prev + element;
    }, 0);
    return total;
  }

  commafy = (num) => {
    num = num + "";
    var re = /(-?\d+)(\d{3})/
    while (re.test(num)) {
      num = num.replace(re, "$1,$2")
    }
    return num;
  }

  render() {
    const {
      cart,
      user
    } = this.props;
    console.log('user', Object.keys(user).length === 0);
    return (
      <div className="totalPriceContainer row">
      {
        <h4 className="col-12">總計: $ {this.commafy(this.countPrice())}</h4>
      }
        <div className="col-12">
          <Button color="info" disabled={cart.length === 0 || Object.keys(user).length === 0} onClick={() => window.open( process.env.PUBLIC_URL + "/bill", 'payBill', 'top=100,left=100,toolbar=0,location=0,menubar=0,width=500,height=500')}>
            {
              Object.keys(user).length === 0 ? '結帳前請先登入' : '結帳'
            }
          </Button>
        </div>
      </div>
    )
  }

}
const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart
});




export default withRouter(connect(mapStateToProps)(TotalPriceContainer))