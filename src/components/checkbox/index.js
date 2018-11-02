import React, { Component } from 'react';
import './index.scss';

export default class CheckBox extends Component {
  render() {
    return (
      <label className={`beautyCheck ${this.props.className}`}>
        <input
          type="checkbox"
          className="indicator"
          name={this.props.name}
          checked={this.props.checked || false}
          onChange={this.props.onChange}
        />
        <span className={'indicator'}></span>
        {
          this.props.label && this.props.label
        }
      </label>
    )
  }
}
