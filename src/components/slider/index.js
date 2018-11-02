import React, { Component } from 'react';
import Slider from "react-slick";
import '../../../node_modules/slick-carousel/slick/slick.scss';
import '../../../node_modules/slick-carousel/slick/slick-theme.scss';
import './index.scss';

export default class SliderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picSrc: []
    };
  };

  componentWillMount = () => {
    fetch('https://tun-hsiang.000webhostapp.com/kkajax.php?page=2&country=A01-003&city=A01-003-00001&sort=hdesc')
      .then((res) => { return res.json() })
      .then((result) => {
        console.log(result)
        const picSrc = [];
        result.data.forEach((item) => {
          picSrc.push(item.img_url);
        })
        this.setState({ picSrc });
      })
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      autoplay: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings} className="col-12">
        {
          this.state.picSrc.map((item, i) => {
            return <div key={i}><div className="img" style={{ backgroundImage: `url( '${item}' )` }} /></div>
          })
        }
      </Slider>
    )
  }
}
// {
//   this.state.picSrc.map((item) => {
//     return <div className="img" style={{ backgroundImage: `url( '${item.img_url}' )` }} />
//   })
// }