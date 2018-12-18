import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import './example.scss'
export default class Animate extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={500}

        transitionAppear={true}
        transitionAppearTimeout={5000}
        transitionEnter={true}
        transitionLeave={true}
        >
          {this.props.children}
      </ReactCSSTransitionGroup>
    )
  }
}