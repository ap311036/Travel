import React from 'react';
import './index.scss';

const ToggleContext = React.createContext({
  on: false,
  toggle: () => { }
});
export default class Toggle extends React.Component {
  static On = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => contextValue.on && children}
    </ToggleContext.Consumer>
  );
  static Off = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => !contextValue.on && children}
    </ToggleContext.Consumer>
  );
  static Button = ({ children }) => (
    <ToggleContext.Consumer>
      {contextValue => <button onClick={contextValue.toggle}> {children} </button>}
    </ToggleContext.Consumer>
  );
  static defaultProps = { onToggle: () => { } };
  state = { on: false };
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  render() {
    // 由於不用傳遞 props 給 children，也就不用 React.Children.map 了，直接使用 this.props.children 即可
    return (
      <ToggleContext.Provider
        value={{
          on: this.state.on,
          toggle: this.toggle
        }}
      >
        {this.props.children}
      </ToggleContext.Provider>
    );
  }
}
