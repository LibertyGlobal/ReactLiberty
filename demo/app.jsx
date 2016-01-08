import React from 'react';
import {FocusManager, FocusableContainer} from 'sunbeam';
import Header from './components/header/header.jsx';
import Menu from './components/menu/menu.jsx';
import MenuItem from './components/menu/menu-item.jsx';

class Application extends FocusableContainer {
  static styles = {
    header: {
      position: 'relative',
      zIndex: 999
    }
  };

  navigateTo = path => {
    const {history} = this.props;

    if (!history.isActive(path)) {
      history.push(path);
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
          <MenuItem onFocus={() => this.navigateTo('/for-you')}>
            FOR YOU
          </MenuItem>

          <MenuItem onFocus={() => this.navigateTo('/app-store')}>
            APP STORE
          </MenuItem>
        </Menu>
      </header>
    );
  }
}

export default Application;
