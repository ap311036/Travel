import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { mapMarker } from 'react-icons-kit/fa/mapMarker';
import { fire } from 'react-icons-kit/fa/fire';
import { Link } from "react-router-dom";
import LightBox from "../lightbox";
import PropTypes from 'prop-types';
import './index.scss';

export default class Card extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sample: PropTypes.number.isRequired,
  }
  state = {
    style: {}
  }
  transform = () => {
    this.setState({ style: { transform: 'scale(0.95, 0.95)' } })
  }
  removeTransform = () => {
    this.setState({ style: {} });
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
    let createStar = () => {
      let stars = [];
      for (let i = 0; i < this.props.star; i++) {
        stars.push(<div className="star star-100" key={i} />);
      }
      return stars;
    }
    return (
      <div className={`${this.props.className} card_section`}>
        <div className="card" style={this.state.style}>
          <LightBox url={this.props.url} />
          <div className="card-body" onTouchStart={this.transform} onTouchEnd={this.removeTransform}>
            <h5 className="card-title">{this.props.title}</h5>
            { 
              this.props.introduction && 
              <h5 className="card-introduction">{this.props.introduction}</h5>
            }
            <h6 className="card-subtitle">
              <Icon size={10} icon={fire} style={{ color: '#666' }} />{' '}2.9K+ 個已訂購
            </h6>
            <div className="card-text">
              <Icon size={10} icon={mapMarker} style={{ color: '#666' }} />{' '}{this.props.line} {this.props.city}
            </div>
            <div className="card-foot d-flex justify-content-between">
              <div>
                {createStar()}
                <span className="ml-3">({this.props.sample})</span>
              </div>
              <div>
                <h4 className="mr-3 d-inline-block">$ {this.commafy(this.props.price)}</h4>
                <Link to={{
                  pathname: '/detail',
                  search: `${this.props.uid}`,
                  hash: '#the-hash',
                  state: { fromDashboard: true }
                }}
                  className="btn btn-secondary">訂購</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// <div className="img" style={{ backgroundImage: `url( ${item.src})` }} /><img width="100%" src="https://image.kkday.com/image/get/w_600%2Cc_fit/s1.kkday.com/product_5996/20160129135702_GLvvW/jpg" alt="Card image cap" className="card-img-top" />
