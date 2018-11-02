import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from "react-router-dom";
import EmailAuth from "../emailAuth";
import { Icon } from 'react-icons-kit';
import { user } from 'react-icons-kit/fa/user';
import { shoppingCart } from 'react-icons-kit/fa/shoppingCart';
import { signOut } from 'react-icons-kit/fa/signOut';
// import PropTypes from 'prop-types';
import firebase from 'firebase';
import './index.scss';

class Hearder extends Component {
  // static propTypes = {
  //   components: PropTypes.object.isRequired,
  // }
  state = {
    collapsed: true
  };
  
  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('登出');
      this.props.logoutMemberSaga();
    }).catch((res) => {
      console.log('登出失敗', res)
    });
  };

  render() {
    return (
      <div className="container header">
        <Navbar color="faded" light>
          <NavbarBrand onClick={() => this.props.history.push("/")}><img src="https://www.liontravel.com/_shared/bundle/files/49d7c8edb044a517f45c95589c969797.png" alt="logo" className="header-logo" /></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2">
            <span className="navbar-toggler-icon"></span>
            {(this.state.collapsed && this.props.cart.length !== 0) && <span className="count">{this.props.cart.length}</span>}
          </NavbarToggler>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink>
                  <Icon size={35} icon={user} style={{ paddingRight: 10 }} />
                  {Object.keys(this.props.user).length > 0 ?
                    <div style={{ color: 'black' }}> {this.props.user.displayName || this.props.user.email}</div> :
                    <EmailAuth
                      logoutMemberSaga={this.props.logoutMemberSaga}
                      loginMemberSaga={this.props.loginMemberSaga}
                    />
                  }
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.props.history.push("/checkPage")}>
                  <Icon size={32} icon={shoppingCart} style={{ paddingRight: 10 }} />購物車 {(!this.state.collapsed && this.props.cart.length !== 0) && <span className="count">{this.props.cart.length}</span>}
                </NavLink>
              </NavItem>
              {/* 如果有會員登入資料，則增加顯示購物車及登出鈕 */}
              {this.props.user.email &&
                <NavItem>
                  <NavLink onClick={this.logout}><Icon size={35} icon={signOut} style={{ paddingRight: 10 }} />登出</NavLink>
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Hearder);