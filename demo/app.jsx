var fonts = require('horizon4-fonts');

var React = require('react');
var ReactDOM = require('react-dom');

var Router = require
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var createHashHistory = require('history/lib/createHashHistory');
var {useQueries} = require('history');
var history = useQueries(createHashHistory)();
window.routerHistory = history;

var FocusManager = require('improved-navigation-concept').FocusManager;

var Menu = require('./components/menu/menu.jsx');
var MenuItem = require('./components/menu/menu-item.jsx');
var pages = {};
pages['for-you'] = require('./pages/for-you.jsx');
pages['app-store'] = require('./pages/app-store.jsx');

var FocusManager = require('improved-navigation-concept').FocusManager;
var FocusableComponent = require('improved-navigation-concept').NavigationContainerClass.default;

class AppStoreRouter extends React.Component {
  componentDidMount() {
    window.router = this.refs['router'];
    window.router.history.listen(FocusManager.initializeFocus);
  }

  render() {

    return (
      <div>
        <Menu>
          <MenuItem>FOR YOU</MenuItem>
          <MenuItem>APP STORE</MenuItem>
        </Menu>
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
    this.container = document.getElementById('app-container');

    this.init();
    this.initLifecycleListeners();
    this.initFocusManager();
  }

  initFocusManager() {
    FocusManager.initializeFocus();
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(e) {
    //console.trace('@S+key down');
    switch (e.keyCode) {
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
    }
  }

  initLifecycleListeners() {
    //document.addEventListener('visibilitychange', this.processVisibilityChange.bind(this), false);
    //window.addEventListener('blur', this.suspend.bind(this), false);
    //window.addEventListener('focus', this.awake.bind(this), false);
  }

  init() {
    ReactDOM.render(React.createElement(AppStoreRouter), this.container);
  }

  processVisibilityChange({target}) {
    if (document.hidden) {
      this.suspend();
    } else {
      this.awake();
    }
  }

  suspend() {
    console.log('Suspending...');
    if (!this.suspended) {
      this.suspended = true;
      window.routerHistory.push('/suspend');
    }
  }

  awake() {
    console.log('Awaking...');
    if (this.suspended) {
      this.suspended = false;
      window.routerHistory.goBack();
    }
  }

  runApp(appId) {
    var appURL = appId;
    window.open(appURL, '_blank');
  }
}

window.appStore = new AppStore();