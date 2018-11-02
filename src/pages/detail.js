import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ADD_TO_CART_SAGA } from '../redux/constants/ActionTypes';
// import { addToCart } from '../redux/actions';
import firebase from 'firebase/app';
import Timeline from "../components/timeLine";
import Banner from "../components/banner";
import { Button } from 'reactstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      product: {
        src: 'https://sites.google.com/site/puddingchen35/2011-06-blogger-image-lazy-load/grey.gif'
      },
    }

    const database = firebase.database();
    database.ref(`/product/${this.props.location.search.split('?')[1]}`)
      .once('value')
      .then((snapshot) => {
        let newData = JSON.parse(JSON.stringify(snapshot.val()));
        console.log(newData)
        newData.timeline.forEach(async (element, index) => {
          const storage = firebase.storage();
          const p = await storage.ref('/images/').child(element.img).getDownloadURL().then(function (url) {
            return url;
          });
          newData.timeline[index].img = p;
          this.setState({ product: newData, loaded:true });
        });
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  commafy = (num = 0) => {
    num = String(num);
    let re = /(-?\d+)(\d{3})/;
    while (re.test(num)) {
      num = num.replace(re, '$1,$2');
    }
    return num;
  }
  render() {
    // console.log(JSON.stringify(this.props.location.search.split('?')[1]));
    const {
      product
    } = this.state;
    return (
      <div>
        {!this.state.loaded ?
          <div className="col-12 loading-container"><div className="loading"></div></div> :
          <div className="detail">
            <ToastContainer autoClose={2000} />
            <Banner url={product.src} />
            <br /><br />
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <Timeline
                    infoTitle="行程表"
                    section={product.timeline}
                  />
                </div>
                <div className="col-md-4">
                  <div className="booking-bar">
                    <div className="booking-bar-content">
                      <div className="btnContainer">
                          {
                            this.state.product.location &&
                            <div className="d-flex justify-content-between align-items-end">
                              <span>
                                地點
                              </span>
                              <div>
                                {this.state.product.location.city}{' '}{this.state.product.location.line}
                              </div>
                            </div>
                          }
                        <div className="price d-flex justify-content-between align-items-end">
                          <span>
                            最低價
                          </span>
                          <div className="product-pricing">
                            <span>
                              TWD
                            </span>
                            <h2>
                              {this.commafy(this.state.product.price)}
                            </h2>
                          </div>
                        </div>
                        <Button className="col-xs-12 col-md-10 offset-md-1 order btn btn-primary btn-lg btn-block mt-1" color="primary" size="lg" block onClick={() => this.props.addToCart(product)}>立即訂購</Button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        }
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => dispatch({ type: ADD_TO_CART_SAGA, cart: product }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
