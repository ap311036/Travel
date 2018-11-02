import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
export default class Animate extends React.Component {
    render () {
        return (
          <ReactCSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={2500}
              transitionLeaveTimeout={2300}>
              {this.props.children}
          </ReactCSSTransitionGroup>
        )
    }
}