import React, { Component } from 'react';
import './index.scss';

export default class Banner extends Component {
  render() {
    return (
        <div className="product-banner"
            style={
              this.props.url ? { backgroundImage: `url( '${this.props.url}' )` } : { background: `${this.props.background}` }
            }
        >
          {this.props.children && this.props.children}
        </div>
    )
  }
};
