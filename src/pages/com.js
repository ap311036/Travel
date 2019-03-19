import React, { Component } from 'react'

export default class Com extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: this.props.arr
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps, prevState)
  //   if(nextProps.arr[0].name === prevState.arr[0].name){
  //     return null;
  //   }
  //   return {
  //     arr: [nextProps.arr, prevState.arr],
  //   }
  // } 
  componentWillReceiveProps(nextProps){
    console.log('======')
    console.log(nextProps)
    const names = this.state.arr.map(item => item.name)
    console.log(names)
    if ( !names.includes(nextProps.arr[0].name) ) {
      this.setState({ arr: [...this.state.arr, ...nextProps.arr ] })
    }
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.state.arr)}
      </div>
    )
  }
}
