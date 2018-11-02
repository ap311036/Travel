import React from 'react';
import SliderContainer from '../components/slider';
import { withRouter } from 'react-router-dom';

const Thanks = (props) => {
  return (
    <div className="container">
      <div className="col-12 d-flex justify-content-center align-items-center flex-column">
        <img src={require('../asset/img/IMG_4481.png')} alt="thanks" style={{ width: '100%' }} />
        <p>訂單編號: {props.location.pathname.split('/')[2]}</p>
        <br/>
        <p>請使用下方加入Line功能加入官方帳號</p>
        <p>便能查詢訂單</p>
        <p>輸入： 查詢訂單加上您的訂單編號（例如： 查詢訂單J212458）</p>
        <br/>
      </div>
      <h3>您可能也喜歡</h3>
      <SliderContainer />
    </div>
  );
}

export default withRouter(Thanks);