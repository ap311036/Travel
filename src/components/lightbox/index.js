import React, { Component } from 'react';
import './index.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle);

export default class LightBox extends Component {
  state = {
    show: 'overlay',
  }
  _onClick = () => {
    console.log('click');
    this.state.show === 'overlay' && this.setState({ show: 'overlay is-active' });
    this.state.show === 'overlay is-active' && this.setState({ show: 'overlay' });
  }
  render() {
    return (
      <div className="lightBox">
        <a onClick={this._onClick}>
          <div className="img card-img-top" style={{ backgroundImage: `url(${this.props.url})` }} />
        </a>
        <div id="single" className={this.state.show}>
          <figure className="content bounceIn col-md-20 col-xs-24 col-lg-20">
            <img src={this.props.url} alt="pic" />
          </figure>
          <a className="close" onClick={this._onClick}><FontAwesomeIcon icon={faTimesCircle} size="2x" color="white" /></a>
        </div>
      </div>
    )
  }
}
