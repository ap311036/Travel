import React, { Component } from 'react'
import Com from "./com";

export default class Spotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
         {name: 'jack', age: 12, favorite: ['apple', 'Strawberries', 'Grape']},
         {name: 'jess', age: 13, favorite: ['Watermelon', 'Peach', 'Orange']},
      ]
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        arr:
          [
            { name: 'jeff', age: 21, favorite: ['Mango', 'Pineapple', 'Blueberry'] },
          ]
      })
    }, 5000);
  }
  
  render() {
  
    return (
      <div className="App">
        <Com arr={this.state.arr}/>
      </div>
    );
  }
}
