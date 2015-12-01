var React = require('react');
var ReactDOM = require('react-dom');

var ForYouPage = require('./pages/for-you.jsx');
var MovieAsset = require('./components/movie-asset.jsx');

var fonts = require('horizon4-fonts');

ReactDOM.render(React.createElement(ForYouPage), document.getElementById('app-container'));