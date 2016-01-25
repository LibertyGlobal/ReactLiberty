import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import history from './history';
import {FocusManager, FocusableContainer} from 'sunbeam';

require("babel-polyfill");
var WebFontLoader = require('webfontloader');
var Header = require('./components/header/header.jsx');
var Menu = require('./components/menu/menu.jsx');
var MenuItem = require('./components/menu/menu-item.jsx');
var pages = {};

pages['for-you'] = require('./pages/for-you.jsx');
pages['app-store'] = require('./pages/app-store.jsx');


class AppStoreRouter extends FocusableContainer {
  static styles = {
    header: {
      position: 'relative',
      zIndex: 999
    }
  };

  componentDidMount() {
    window.router = this.refs['router'];
    FocusManager.initializeFocus();
  }

  render() {
    return (
      <div>
        <header style={AppStoreRouter.styles.header}>
          <Header/>
          <Menu>
            <MenuItem onFocus={function(){
              if (window.location.hash.indexOf('for-you') === -1) history.push('/for-you');
            }}>FOR YOU</MenuItem>
            <MenuItem onFocus={function(){
              if (window.location.hash.indexOf('app-store') === -1) history.push('/app-store');
            }}>APP STORE</MenuItem>
          </Menu>
        </header>
        <Router ref='router' history={history}>
          <Redirect from='/' to='/for-you'/>
          <Route path='/for-you' component={pages['for-you']}></Route>
          <Route path='/app-store' component={pages['app-store']}></Route>
          <Route path='/suspend' component={null}/>
        </Router>
      </div>
    );
  }
}

class AppStore {
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
        //PIXI.utils.BaseTextureCache = {};
        //PIXI.utils.TextureCache = {};
        this.suspend();
        break;
      case 65:
        this.awake();
        break;
    }
  }

  initLifecycleListeners() {
    //document.addEventListener('visibilitychange', this.processVisibilityChange.bind(this), false);
  }

  init() {
    WebFontLoader.load({
      custom: {
        families: ['InterstatePro'],
        urls: ['./assets/css/fonts.css']
      },
      active: function(){
        render(React.createElement(AppStoreRouter), document.getElementById('app-container'));
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
      history.push('/suspend');
    }
  }

  awake() {
    if (this.suspended) {
      console.log('Awaking...');
      this.suspended = false;
      history.goBack();
    }
  }

  runApp(appId) {
    var appURL = appId;
    window.open(appURL, '_blank');
  }
}

window.appStore = new AppStore();
