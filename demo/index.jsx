import 'horizon4-fonts';

import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {Router, Route, IndexRedirect} from 'react-router';
import {FocusManager} from 'sunbeam';
import WebFontLoader from 'webfontloader';
import history from './history';
import Application from './app.jsx';
import ForYou from './pages/for-you.jsx';
import AppStore from './pages/app-store.jsx';

const routerTree = (
  <Router history={history}>
    <Route path="/" component={Application}>
      <IndexRedirect to="/for-you"/>
      <Route path="/for-you" component={ForYou}/>
      <Route path="/app-store" component={AppStore}/>
    </Route>
  </Router>
);

const mountNode = window.document.getElementById('app-container');

function resume() {
  window.addEventListener('keydown', handleKeyDown, false);

  render(routerTree, mountNode);
}

function suspend() {
  window.removeEventListener('keydown', handleKeyDown, false);

  unmountComponentAtNode(mountNode);
}

function handleVisibilityChange(event) {
  if (event.target.hidden) {
    suspend();
  } else {
    resume();
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

window.document.addEventListener('visibilitychange', handleVisibilityChange, false);

WebFontLoader.load({
  custom: {
    families: ['InterstatePro']
  },

  active() {
    if (!window.document.hidden) {
      resume();
    }
  }
});
