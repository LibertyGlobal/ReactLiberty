var React = require('react');
var ReactDOM = require('react-dom');
var ForYouPage = require('./pages/for-you.jsx');
var fonts = require('horizon4-fonts');

class AppStore {
  constructor() {
    this.container = document.getElementById('app-container');
    this.initLifecycleListeners();
    this.init();
  }

  initLifecycleListeners() {
    document.addEventListener('visibilitychange', this.processVisibilityChange.bind(this), false);
  }

  init() {
    ReactDOM.render(React.createElement(ForYouPage), this.container);
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
    return;
    if (!this.suspended) {
      window.routerHistory.pushState(null, '/suspend/');
      this.suspended = true;
    }
  }

  awake() {
    console.log('Awaking...');
    return;
    if (this.suspended) {
      window.routerHistory.go(-1);
      this.suspended = false;
    }
  }

  runApp(appId) {
    var appURL = appId;
    window.open(appURL, '_blank');
  }
}

window.appStore = new AppStore();

/*

 var fonts = require('horizon4-fonts');

 var React = require('react');
 var ReactDOM = require('react-dom');

 var Router = require
 var Router = require('react-router');
 var Route = require('react-router').Route;

 var createHashHistory = require('history/lib/createHashHistory');
 var {useQueries} = require('history');
 var history = useQueries(createHashHistory)();

 var pages = {};
 pages['foryou'] = require('./pages/for-you.jsx');
 pages['appstore'] = require('./pages/for-you.jsx');

 class AppStoreRouter extends React.Component {
 render() {
 (
 <Router history={history}>
 <Redirect from='/' to='/for-you'/>
 <Route path='/' component={pages['foryou']}>
 <Route path='/section/:crid' component={AppStoreUI} onEnter={AppStoreUI.willTransitionTo}/>
 </Route>
 <Route path='/suspend/' component={null}/>
 </Router>
 );
 }
 }

 window.router = React.createElement(AppStoreRouter);
 window.routerHistory = history;

 class AppStore {
 constructor() {
 this.container = document.getElementById('app-container');
 this.initLifecycleListeners();
 this.init();
 }

 initLifecycleListeners() {
 document.addEventListener('visibilitychange', this.processVisibilityChange.bind(this), false);
 }

 init() {
 ReactDOM.render(React.createElement(ForYouPage), this.container);
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
 return;
 if (!this.suspended) {
 window.routerHistory.pushState(null, '/suspend/');
 this.suspended = true;
 }
 }

 awake() {
 console.log('Awaking...');
 return;
 if (this.suspended) {
 window.routerHistory.go(-1);
 this.suspended = false;
 }
 }

 runApp(appId) {
 var appURL = appId;
 window.open(appURL, '_blank');
 }
 }

 window.appStore = new AppStore();
 */