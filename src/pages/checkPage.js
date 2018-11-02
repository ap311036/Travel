import React from 'react';
import ShoppingCartList from "../containers/shoppingCartList";
import SliderContainer from '../components/slider';
import TotalPriceContainer from "../containers/totalPriceContainer";

const CheckPage = () => (
  <div className="container">
    <ShoppingCartList/>
    <TotalPriceContainer/>
    <h3>您可能也喜歡</h3>
    <SliderContainer/>
  </div>
)

export default CheckPage