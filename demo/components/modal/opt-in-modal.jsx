import React from 'react';
import {FocusableContainer} from 'sunbeam';
import ModalButton from './modal-button.jsx';

class OptInModal extends FocusableContainer {
  static styles = {
    position: 'absolute',
    display: 'flex',
    top: 0,
    left: 0,
    width: 1280,
    height: 720,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.75)',
    zIndex: 999,

    container: {
      boxSizing: 'border-box',
      width: 650,
      background: 'rgb(0, 0, 0)',
      border: '2px solid #585860',
      borderRadius: 16
    },

    header: {
      paddingTop: 15,
      paddingRight: 50,
      paddingBottom: 45,
      paddingLeft: 50,
      color: '#e9e9ea',
      fontSize: 40,
      lineHeight: '56px',
      textAlign: 'center'
    },

    body: {
      paddingRight: 50,
      paddingBottom: 50,
      paddingLeft: 50
    },

    message: {
      marginBottom: 36,
      color: '#b8b8bb',
      fontSize: 24,
      lineHeight: '34px',
      textAlign: 'center'
    }
  };

  render() {
    const styles = OptInModal.styles;

    return (
      <div style={styles}>
        <div style={styles.container}>
          <div style={styles.header}>
            APPS Opt-in
          </div>

          <div style={styles.body}>
            <div style={styles.message}>
              By accessing APPS, you agree with the Terms of Service of the Horizon TV App Store.
              <br/>
              For more information you can read the Terms&nbsp;&amp;&nbsp;Conditions.
            </div>

            <ModalButton label="Agree" styles={{marginBottom: 20}}/>
            <ModalButton label="Not now" styles={{marginBottom: 20}}/>
            <ModalButton label="Terms &amp; Conditions" active={true}/>
          </div>
        </div>
      </div>
    );
  }
}

export default OptInModal;
