import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class TimeLine extends Component {
  static propTypes = {
    section: PropTypes.array,
    infoTitle: PropTypes.string
  }
  static defaultProps = {
    section: [],
    infoTitle: '忘記放標題囉'
  }
  render() {
    return (
      <div className="time-line">
        <h3 className="info-title">{this.props.infoTitle}</h3>
        <div>
          <ul className="time-info">
            {
              this.props.section.map((i, idx) => {
                return (
                  <li key={idx}>
                    <div className="time-info-title">
                      {i.title}
                    </div>
                    <div className="time-info-img">
                      <img src={i.img} alt={i.imgAlt} />
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
