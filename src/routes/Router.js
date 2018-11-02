import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Detail from '../pages/detail';
import Search from '../pages/search';
import CheckPage from "../pages/checkPage";
import Bill from "../pages/bill";
import Thanks from "../pages/thanks";
import Main from '../pages/main';
import Header from '../components/header';
import Footer from "../components/footer";
import { connect } from 'react-redux';
import { LOGIN_MEMBER_SAGA, LOGOUT_MEMBER_SAGA } from "../redux/constants/ActionTypes";
const RouteFallback = (props) => {
  console.log('route fallback with location: ', props.location);
  return <Redirect to={{
    pathname: '/',
    from: props.location
  }} />
}
class Router extends Component {

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <div>
          <Header
            user={this.props.user}
            cart={this.props.cart}
            logoutMemberSaga={this.props.logoutMemberSaga}
            loginMemberSaga={this.props.loginMemberSaga}
          />
          <Switch>
            <Route path="/" exact render={Main} />
            <Route path="/detail" component={Detail} />
            <Route path="/search/:id" component={Search} />
            <Route path="/checkPage" component={CheckPage} />
            <Route path="/bill" component={Bill} />
            <Route path="/thanks" component={Thanks} />
            <Route component={RouteFallback} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  };
};

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginMemberSaga: (user) => dispatch({ type: LOGIN_MEMBER_SAGA, user }),
    logoutMemberSaga: (user) => dispatch({ type: LOGOUT_MEMBER_SAGA, user })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
