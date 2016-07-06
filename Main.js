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
    hasBack: React.PropTypes.bool,
    show: React.PropTypes.bool,
    isMenuOpen: React.PropTypes.bool,

    backPressed: React.PropTypes.func,
    renderScene: React.PropTypes.func.isRequired,
    setNavigator: React.PropTypes.func,
    configureScene: React.PropTypes.func.isRequired,
    initialRoute: React.PropTypes.object.isRequired,
    sceneStyle: React.PropTypes.any,

    openMenu: React.PropTypes.func,
    closeMenu: React.PropTypes.func,
    menuItemSelected: React.PropTypes.func,
    title: React.PropTypes.string,
    buttonName: React.PropTypes.string,
    statusBarColor: React.PropTypes.string,
    statusBarStyle: React.PropTypes.string,
    backIcon: React.PropTypes.any,
    menuIcon: React.PropTypes.any,
    menuItems: React.PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  _backPressed = () => {
    if(this.props.hasBack)  {
      this.props.backPressed();
    }
  };
  _openMenu = () => {
    if(this.props.openMenu) {
      this.props.openMenu();
    }
  };
  _setNavigator = (nav) => {
    if(this.props.setNavigator) {
      this.props.setNavigator(nav);
    }
  };

  render() {
    const {
        statusBarColor,
        navbarStyle,
        statusBarStyle,
        hasBack,
        show,
        logoIcon,
        logoIconStyle ,
        title,
        backIcon,
        menuIcon,
        sceneStyle,
        menuItems
      } = this.props;

    return (
      <View style={styles.navView}>
        <StatusBar
          animated = {true}
          backgroundColor = {statusBarColor ? statusBarColor : '#19FCE4'}
          barStyle = {statusBarStyle? statusBarStyle : "default"}
        />
        <Navigator
          navigationBar=
            {
              <Navbar
                      title={title}
                      logoIcon={logoIcon}
                      logoIconStyle={logoIconStyle}
                      show={show ? show : false}
                      hasBack={hasBack ? hasBack : false}
                      navbarStyle={navbarStyle}
                      backPressed={this._backPressed}
                      openMenu={this._openMenu}
                      backIcon={backIcon}
                      menuIcon={menuIcon}
                      menuItems={menuItems}
              />
            }
          initialRoute={this.props.initialRoute}
          renderScene={this.props.renderScene}
          ref={(nav) => this._setNavigator(nav)}
          configureScene={this.props.configureScene}
          sceneStyle={sceneStyle}
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
