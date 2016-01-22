'use strict';

var React = require('react');
var ReactLiberty = require('../../src/index');
var AppAsset = require('../components/app-asset.jsx');
var CategoryAsset = require('../components/category-asset.jsx');
var List = require('../components/list/list.jsx');
var appService = require('../services/applications-service');
var BackToTopButton = require('../components/back-to-top.jsx');
var FocusManager = require('sunbeam').FocusManager;

import launchApp from '../actions/launch-app';

class ForYou extends React.Component {

  handleAppLaunch = appId => {
    if (appId) {
      launchApp(appId);
    }
  };

  goToTop = () => {
    const {mainList} = this.refs;

    mainList.goTo(0);
    FocusManager.setFocusTarget(mainList._focusable.children[0]._focusable.children[0]);
  };

  render() {
    var styles = {
      container: {
        flexDirection: 'column'
      },
      verticalList: {
        height: 600
      },
      caruselRow: {
        height: 292
      },
      categoriesCaruselRow: {
        height: 292
      },
      categoriesCarusel: {
        paddingTop: 70,
        width: 1140,
        height: 206
      },
      carusel: {
        marginBottom: 55,
        width: 1140,
        height: 237
      },
      headerStyle: {
        fontFamily: 'InterstatePro',
        fontWeight: 300,
        height: 20,
        marginBottom: 10,
        fontSize: 24,
        color: '#ffffff'
      }
    };

    //Change after getRecent is implemented
    var recentlyUsed = appService.getApplicationsByCategory('games');
    var recentRow = recentlyUsed.length && (<Div style={styles.caruselRow}>
        <P style={styles.headerStyle}>Recently used</P>
        <List style={styles.carusel}
              itemClass={AppAsset}
              data={recentlyUsed.slice(0,18)}
              onItemSelect={this.handleAppLaunch}/>
      </Div>);

    return (
      <main style={styles.divStyle}>
        <Div style={styles.container}>
          <List cyclic={false} ref="mainList" style={styles.verticalList} orientation="vertical">
            <Div style={styles.caruselRow}>
              <P style={styles.headerStyle}>Featured</P>
              <List style={styles.carusel}
                    itemClass={AppAsset}
                    data={appService.getFeatured().slice(0,18)}
                    onItemSelect={this.handleAppLaunch}/>
            </Div>
            {recentRow}
            <BackToTopButton onSelect={this.goToTop} style={styles.caruselRow}/>
          </List>
        </Div>
      </main>
    );
  }
}

module.exports = ForYou;
