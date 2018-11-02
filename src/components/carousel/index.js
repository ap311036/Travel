import React, { Component } from 'react';
import Slider from "react-slick";
import '../../../node_modules/slick-carousel/slick/slick.scss';
import '../../../node_modules/slick-carousel/slick/slick-theme.scss';
import './index.scss';

const items = [
    {
        src: require('../../img/jpg(1).jpg'),
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: require('../../img/jpg(2).jpg'),
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: require('../../img/jpg(3).jpg'),
        altText: 'Slide 3',
        caption: 'Slide 3'
    },
    {
        src: require('../../img/jpg(4).jpg'),
        altText: 'Slide 4',
        caption: 'Slide 4'
    },
    {
        src: require('../../img/jpg(5).jpg'),
        altText: 'Slide 5',
        caption: 'Slide 5'
    },
    {
        src: require('../../img/jpg(6).jpg'),
        altText: 'Slide 6',
        caption: 'Slide 6'
    },
    {
        src: require('../../img/jpg(7).jpg'),
        altText: 'Slide 7',
        caption: 'Slide 7'
    },
    {
        src: require('../../img/jpg(8).jpg'),
        altText: 'Slide 8',
        caption: 'Slide 8'
    },
    {
        src: require('../../img/png.png'),
        altText: 'Slide 9',
        caption: 'Slide 9'
    }
];
export default class Carouseler extends Component {

    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        initialSlide: 0,
        autoplay: true,
        arrows: true,
        className: 'carousel'
      };

        return (
          <Slider {...settings}>
            {
              items.map((item, i) => {
                return <div key={i}><div className="img" style={{ backgroundImage: `url( '${item.src}' )` }} /></div>
              })
            }
          </Slider>
        );
    }
}

