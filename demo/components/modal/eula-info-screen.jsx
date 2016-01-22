import React from 'react';
import {FocusableContainer} from 'sunbeam';

class EULAInfoScreen extends React.Component {
  static styles = {
    position: 'absolute',
    display: 'flex',
    top: 0,
    left: 0,
    width: 1280,
    height: 720,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(100, 100, 100, 0.75)',
    zIndex: 999,

    container: {
      boxSizing: 'border-box',
      width: 1034,
      maxHeight: 600,
      background: 'rgb(0, 0, 0)',
      border: '2px solid #585860',
      borderRadius: 16,
      overflow: 'scroll'
    },

    header: {
      boxSizing: 'border-box',
      paddingTop: 17,
      paddingRight: 50,
      paddingBottom: 43,
      paddingLeft: 50,
      color: '#e9e9ea',
      fontSize: 40,
      lineHeight: '56px',
      textAlign: 'center'
    },

    body: {
      boxSizing: 'border-box',
      marginLeft: 50,
      marginRight: 50,
      background: 'grey'
    }
  };

  render() {
    const styles = EULAInfoScreen.styles;

    return (
      <div style={styles}>
        <div style={styles.container}>
          <div style={styles.header}>
            End User Licence Agreement
          </div>
          <div style={styles.body}>
          </div>
        </div>
      </div>
    );
  }
}

export default EULAInfoScreen;
