import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ADD_TO_CART_SAGA } from '../redux/constants/ActionTypes';
// import { addToCart } from '../redux/actions';
// import firebase from 'firebase/app';
// import Timeline from "../components/timeLine";
import Banner from "../components/banner";
// import { Button } from 'reactstrap';

import SearchContainer from '../containers/searchContainer';

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

class Search extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       loaded: false,
       page: 1,
       startPage: 1,
    }
    const countryQuery = this.props.match.params.id;
    const sortQuery = this.props.location.search.split('?')[1] || 'sort=hdsec';
    fetch(`https://tun-hsiang.000webhostapp.com/kkajaxcountry.php?page=${this.state.page}&country=${countryQuery}&${sortQuery}`)
      .then((res) => { return res.json() })
      .then((data) => {
        console.log(data);
        this.setState({ loaded: true, data }, () => {
          // !this.props.location.search.split('?')[1] && this.props.history.replace(location)
        })
      })
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
    // const fetchServer = () => {
    //   const location = {
    //     pathname: `/search/${this.props.match.params.id}`,
    //     search: `?sort=hdesc`
    //   }
    //   const countryQuery = this.props.match.params.id;
    //   const sortQuery = this.props.location.search.split('?')[1] || 'sort=hdsec';
    //   return fetch(`https://tun-hsiang.000webhostapp.com/kkajaxcountry.php?page=1&country=${countryQuery}&${sortQuery}`)
    //     .then((res) => { return res.json() })
    //     .then((data) => {
    //       console.log(data);
    //       this.setState({ loaded: true, data }, () => {
    //         // !this.props.location.search.split('?')[1] && this.props.history.replace(location)
    //       })
    //     })
    // };
    // fetchServer();
  }

  commafy = (num = 0) => {
    num = String(num);
    let re = /(-?\d+)(\d{3})/;
    while (re.test(num)) {
      num = num.replace(re, '$1,$2');
    }
    return num;
  }
  onChangeSort = (sort) => {
    const location = {
      pathname: `/search/${this.props.match.params.id}`,
      search: `?sort=${sort}`
    }
    this.props.history.replace(location);
    this.setState({loaded: false})
    fetch(`https://tun-hsiang.000webhostapp.com/kkajaxcountry.php?page=${this.state.page}&country=${this.props.match.params.id}&sort=${sort}`)
      .then((res) => { return res.json() })
      .then((data) => {
        this.setState({ loaded: true, data })
      })
  }

  onChangePage = (i) => {
    let groupCount = 5;
    let currentPage = i;
    window.scrollTo(0, 0);
    if (currentPage >= groupCount) {
      this.setState({
        startPage: currentPage - 2,
      })
    }
    if (currentPage < groupCount) {
      this.setState({
        startPage: 1,
      })
    }

    if (currentPage === 1) {
      this.setState({
        startPage: 1,
      })
    }
    this.setState({
      page: currentPage, loaded: false
    })

    const countryQuery = this.props.match.params.id;
    const sortQuery = this.props.location.search.split('?')[1] || 'sort=hdsec';
    fetch(`https://tun-hsiang.000webhostapp.com/kkajaxcountry.php?page=${i}&country=${countryQuery}&${sortQuery}`)
      .then((res) => { return res.json() })
      .then((data) => {
        this.setState({ loaded: true, data, page: i }, () => {
          // !this.props.location.search.split('?')[1] && this.props.history.replace(location)
        })
      })
  }

  render() {
    // console.log(JSON.stringify(this.props.location.search.split('?')[1]));
    return (
      <div className="search">
        <Banner background={'linear-gradient(rgba(250,250,250,0) 20%, #f5f5f5 100%), linear-gradient(45deg,#64b3f4 0%,#26bec9 50%)'}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>{this.state.data && this.state.data.page_title}</h3>
            </div>
          </div>
        </div>
        </Banner>
        {
          this.state.data &&
          <SearchContainer
            products={this.state.data}
            onChangeSort={this.onChangeSort}
            onChangePage={this.onChangePage}
            startPage={this.state.startPage}
          />
        }
        {
          !this.state.loaded &&
          <div className="col-12 loading-container"><div className="loading"></div></div>
        }
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (product) => dispatch({ type: ADD_TO_CART_SAGA, cart: product }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
