import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "../components/card";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    return (

      <div className="row">
        {
          Object.values(products).map(product => (
            <Card
              className="col-12 col-md-6 col-lg-4 col-xl-4 "
              uid={product.uid}
              url={product.src}
              price={product.price}
              title={product.title}
              sample={product.sample}
              line={product.location.line}
              city={product.location.city}
              star={product.star}
              key={product.uid}
            />
          ))
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
  }
}
export default connect(mapStateToProps)(ProductList)