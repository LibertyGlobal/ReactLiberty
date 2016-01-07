import React from 'react';
import {FocusManager, FocusableContainer} from 'sunbeam';

var Header = require('./components/header/header.jsx');
var Menu = require('./components/menu/menu.jsx');
var MenuItem = require('./components/menu/menu-item.jsx');

class Application extends FocusableContainer {
  static styles = {
    header: {
      position: 'relative',
      zIndex: 999
    }
  };

  createSectionFocusHandler = targetPath => () => {
    const {history} = this.props;

    if (!history.isActive(targetPath)) {
      history.push(targetPath);
    }
  };

  componentDidMount() {
    FocusManager.initializeFocus();
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.props.children}
      </div>
    );
  }

  renderHeader() {
    return (
      <header style={Application.styles.header}>
        <Header/>
        <Menu>
          <MenuItem onFocus={this.createSectionFocusHandler('/for-you')}>
            FOR YOU
          </MenuItem>

          <MenuItem onFocus={this.createSectionFocusHandler('/app-store')}>
            APP STORE
          </MenuItem>
        </Menu>
      </header>
    );
  }
}

export default Application;
