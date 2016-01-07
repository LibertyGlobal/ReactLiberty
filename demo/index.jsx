import 'horizon4-fonts';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect} from 'react-router';
import {FocusManager} from 'sunbeam';
import history from './history';
import Application from './app.jsx';
import ForYou from './pages/for-you.jsx';
import AppStore from './pages/app-store.jsx';

const tree = (
  <Router history={history}>
    <Route path="/" component={Application}>
      <IndexRedirect to="/for-you"/>
      <Route path="/for-you" component={ForYou}/>
      <Route path="/app-store" component={AppStore}/>
      <Route path="/suspended" component={null}/>
    </Route>
  </Router>
);

const mountNode = document.getElementById('app-container');

function handleVisibilityChange(event) {
  if (event.target.hidden) {
    history.push('/suspended');
  } else {
    history.goBack();
  }
}

function handleKeyDown(event) {
  switch (event.keyCode) {
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
  }
}

render(tree, mountNode);

document.addEventListener('visibilitychange', handleVisibilityChange, false);
window.addEventListener('keydown', handleKeyDown, false);
