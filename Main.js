/**
 * Created by abhisheksingh on 14/06/16.
 */


/**
 * Created by deepaksisodiya on 27/05/16.
 */


import React, {Component} from 'react';
import {
  Text,
  View,
  Navigator,
  StatusBar,
  StyleSheet
} from 'react-native';

import Navbar from './Navbar';
import Menu from './Menu';


export default class NavbarWrapper extends Component {

  static propTypes = {
    hasBack: React.PropTypes.bool.isRequired,
    show: React.PropTypes.bool,
    isMenuOpen: React.PropTypes.bool,

    backPressed: React.PropTypes.func.isRequired,
    openMenu: React.PropTypes.func.isRequired,
    closeMenu: React.PropTypes.func.isRequired,
    menuItemSelected: React.PropTypes.func.isRequired,
    renderScene: React.PropTypes.func.isRequired,
    setNavigator: React.PropTypes.func.isRequired,
    configureScene: React.PropTypes.func.isRequired,

    title: React.PropTypes.string,
    buttonName: React.PropTypes.string,
    statusBarColor: React.PropTypes.string,
    backIcon: React.PropTypes.any,
    menuIcon: React.PropTypes.any,
    menuItems: React.PropTypes.array,
    initialRoute: React.PropTypes.object.isRequired,
    sceneStyle: React.PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {statusBarColor , navbarStyle} = this.props;
    return (
      <View style={styles.navView}>
        <StatusBar
          animated = {true}
          backgroundColor= {statusBarColor ? statusBarColor : '#19FCE4'}
          barStyle="default"
        />
        <Navigator
          navigationBar=
            {
              <Navbar
                      hasBack={this.props.hasBack}
                      backPressed={this.props.backPressed}
                      show={this.props.show}
                      title={this.props.title}
                      openMenu={this.props.openMenu}
                      navbarStyle={navbarStyle}
                      backIcon = {this.props.backIcon}
                      menuIcon = {this.props.menuIcon}
              />
            }
          initialRoute={this.props.initialRoute}
          renderScene={this.props.renderScene}
          ref={(nav) => this.props.setNavigator(nav)}
          configureScene={this.props.configureScene}
          sceneStyle={this.props.sceneStyle}
        />

        { this.props.isMenuOpen ?
          <Menu closeMenu={this.props.closeMenu}
                buttonName={this.props.buttonName}
                menuItems = {this.props.menuItems}
                onItemSelected={this.props.menuItemSelected }/> : null}
      </View>
    );
  }

}
const styles = StyleSheet.create({
  navView: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
