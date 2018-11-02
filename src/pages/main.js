import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Search from "../components/search";
import Carouseler from "../components/carousel";
import ProductList from '../containers/productList';

const Main = props => {
  return (
    <div>
      <Carouseler />
      <Search history={props.history} />
      <div className="container">
        <h2>Best Experience</h2>
        <ProductList />
      </div>
      <div className="container-fluid whywe">
        <div className="section-head">
          <h2 className="title">為什麼選擇我們的網站？</h2>
          <h4 className="sub-title">你知道世界上有超過百萬名自由行旅客選擇我們的網站作為旅遊規劃網站嗎？他們透過我們的網站找到安全又安心的體驗行程！</h4>
        </div>
        <a className="btn btn-warning" href="./">更多內容</a>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    state
  }
}

export default withRouter(connect(mapStateToProps)(Main));