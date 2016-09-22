import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import {hashHistory} from 'react-router';
import {FocusManager, FocusableContainer} from 'sunbeam';

require('babel-polyfill');
var WebFontLoader = require('webfontloader');
var Header = require('./components/header/header.jsx');
var Menu = require('./components/menu/menu.jsx');
var MenuItem = require('./components/menu/menu-item.jsx');
var pages = {};

pages['for-you'] = require('./pages/for-you.jsx');
pages['app-store'] = require('./pages/app-store.jsx');


class ApplicationComponent extends FocusableContainer {
  static styles = {
    header: {
      position: 'relative',
      zIndex: 999
    }
  };

  constructor(props, context) {
    super(props, context);
    this.menuItems = {};
  }

  componentDidMount() {
    window.router = this.refs['router'];
    FocusManager.initializeFocus();
    this.addMenuConditions();
  }

  componentWillUnmount() {
    this.removeHistoryListener();
  }

  render() {
    return (
      <div>
        <header style={ApplicationComponent.styles.header}>
          <Header/>
          <Menu ref='section-navigation' id='section-navigation'>
            <MenuItem ref={this.registerMenu.bind(this, 'search')} onFocus={this.openSearch}>
              <div className='menu-search-item'></div>
            </MenuItem>
            <MenuItem ref={this.registerMenu.bind(this, 'forYou')} onFocus={this.navigateTo.bind(this, '/for-you')}>
              <div>FOR YOU</div>
            </MenuItem>
            <MenuItem ref={this.registerMenu.bind(this, 'appStore')} onFocus={this.navigateTo.bind(this, '/app-store')}>
              <div>APP STORE</div>
            </MenuItem>
          </Menu>
          <div className='top-fade'></div>
        </header>
        <Router ref='router' history={hashHistory}>
          <Redirect from='/' to='/for-you'/>
          <Route path='/for-you' component={pages['for-you']}></Route>
          <Route path='/app-store' component={pages['app-store']}></Route>
          <Route path='/suspend' component={null}/>
        </Router>
      </div>
    );
  }

  shrinkHeader() {
    this.refs.header
  }

  openSearch() {
    alert('Expecting search integration from Metrological');
  }

  navigateTo(path) {
    hashHistory.push(path);
  }

  registerMenu(name, component) {
    this.menuItems[name] = component;
  }

  //TODO Should be refactored to usage of nextFocused in focus manager callbacks
  //this will reduce amount of hardcoded stuff dramatically
  addMenuConditions() {
    this.removeHistoryListener = hashHistory.listen(location => {
      switch (location.pathname) {
        case '/for-you':
          this.menuItems.forYou.active = true;
          this.menuItems.forYou.setActive();
          this.menuItems.appStore.active = false;
          this.menuItems.appStore.setInactive();
          this.menuItems.search.active = false;
          this.menuItems.search.setInactive();
          break;

        case '/app-store':
          this.menuItems.forYou.active = false;
          this.menuItems.forYou.setInactive();
          this.menuItems.appStore.active = true;
          this.menuItems.appStore.setActive();
          this.menuItems.search.active = false;
          this.menuItems.search.setInactive();
          break;

        case '/search':
          this.menuItems.forYou.active = false;
          this.menuItems.forYou.setInactive();
          this.menuItems.appStore.active = false;
          this.menuItems.appStore.setInactive();
          this.menuItems.search.active = true;
          this.menuItems.search.setActive();
          break;
      }
    });
  }
}

class ApplicationLauncher {
  constructor() {
    this.init();
    this.initLifecycleListeners();
    this.initFocusManager();
  }

  initFocusManager() {
    FocusManager.initializeFocus();
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      case 32:
      case 13:
        FocusManager.doSelect();
        break;
      case 37:
        FocusManager.doLeft();
        break;
      case 39:
        FocusManager.doRight();
        break;
      case 40:
        FocusManager.doDown();
        break;
      case 38:
        FocusManager.doUp();
        break;
      //For testing purpose
      case 83:
        this.suspend();
        break;
      case 65:
        this.awake();
        break;
    }
  }

  initLifecycleListeners() {
    document.addEventListener('visibilitychange', this.processVisibilityChange.bind(this), false);
  }

  init() {
    WebFontLoader.load({
      custom: {
        families: ['InterstatePro', 'icomoon'],
        urls: ['./assets/css/fonts.css']
      },
      active: function () {
        render(React.createElement(ApplicationComponent), document.getElementById('app-container'));
      }
    });
  }

  processVisibilityChange({target}) {
    if (document.hidden) {
      this.suspend();
    } else {
      this.awake();
    }
  }

  suspend() {
    if (!this.suspended) {
      console.log('Suspending...');
      this.suspended = true;
      hashHistory.push('/suspend');
    }
  }

  awake() {
    if (this.suspended) {
      console.log('Awaking...');
      this.suspended = false;
      hashHistory.goBack();
    }
  }

  runApp(appId) {
    var appURL = appId;
    window.open(appURL, '_blank');
  }
}

window.appStore = new ApplicationLauncher();
