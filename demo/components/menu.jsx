var React = require('react');
var ReactDOM = require('react-dom');

class Menu extends React.Component {
  render() {
    return (
      <header>
        <ul>
          <li className="icon-zoom-icon"></li>
          <li>FOR YOU</li>
          <li>APP STORE</li>
        </ul>
      </header>
    );
  }
}
;

module.exports = Menu;