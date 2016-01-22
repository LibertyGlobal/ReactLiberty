import React from 'react';
import {Focusable} from 'sunbeam';

class ModalButton extends Focusable {
  static styles = {
    height: 54,
    borderRadius: 6,
    fontSize: 24,
    lineHeight: 2.3,
    textAlign: 'center'
  };

  static propTypes = {
    styles: React.PropTypes.object
  };

  static defaultProps = {
    styles: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }

  componentDidReceiveFocus() {
    this.setState({
      focused: true
    });
  }

  componentDidLoseFocus() {
    this.setState({
      focused: false
    });
  }

  render() {
    const styles = {
      ...ModalButton.styles,
      ...this.props.styles,
      background: this.state.focused ? '#3489cd' : '#2a2a34',
      color: this.state.focused ? '#e9e9ea' : '#b8b8bb'
    };

    return (
      <div style={styles}>
        {this.props.label}
      </div>
    );
  }
}

export default ModalButton;
