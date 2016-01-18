var React = require('react');
var ReactDOM = require('react-dom');

class Header extends React.Component {
  updateTime() {
    this.forceUpdate();
  }
  render() {
    var date = new Date();
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var timeString = date.getHours() + ":" + minutes;

    var styles = {
      main: {
        position: 'relative',
        fontSize: 30,
        fontFamily: 'InterstatePro',
        color: '#ffffff',
        fontWeight: 300,
        width: '100%'
      },
      headerLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'inline-block',
        color: '#B8B8BB'
      },
      headerCenter: {
        color: '#7D7D84',
        fontSize: 18,
        display: 'inline-block',
        width: '100%',
        textAlign: 'center'
      },
      headerRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'inline-block',
        color: '#B8B8BB'
      }
    };

    return (
      <div style={styles.main}>
        <div style={styles.headerLeft}>APPS</div>
        <div style={styles.headerCenter}>LiveTV: The Hunger Games</div>
        <div style={styles.headerRight}>{timeString}</div>
      </div>
    );
  }

  componentWillMount () {
    this.interval = setInterval(this.updateTime.bind(this), 20000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }
}

module.exports = Header;