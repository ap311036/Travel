import React from 'react';
import SliderContainer from '../components/slider';
import PhoneAuth from "../components/phoneAuth";

const Bill = () => (
  <div className="d-flex justify-content-center flex-column align-items-center">
    <PhoneAuth/>
    <h3>您可能也喜歡</h3>
    <SliderContainer />
  </div>
)

export default Bill