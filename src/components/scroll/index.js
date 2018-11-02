import React, {Component} from 'react'

class Stepper extends Component {
  state = {
    stage: this.props.stage
  }
  static defaultProps = {
    stage: 1
  }
  handleClick = () => {
    this.setState({ stage: this.state.stage + 1 })
  }
  render() {
    const { stage } = this.state;
    return (
      <div style={styles.container}>
        <Progress stage={stage} />
        <Steps handleClick={this.handleClick} stage={stage} />
      </div>
    );
  }
}

export default Stepper;
