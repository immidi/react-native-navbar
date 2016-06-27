# react-native-navbar
Navigation bar component for react native




Use>>

   <NavbarWrapper
      hasBack={true}   // true or false
      backPressed={this.backPressed}
      show={true}   //  true or false
      title={"App title "}
      openMenu={this.openMenu}
      closeMenu = {this.closeMenu}
      initialRoute={APP_ROUTES.HOME}
      renderScene={this.renderScene}
      setNavigator={ this._setNavigator} //use this function if you want to get navigator reference
      configureScene={this.configureScene}
      menuItemSelected = {this._menuItemSelected}
      isMenuOpen = {true} // true or false
      backIcon = {backIcon}  // left button icon
      menuIcon = {menuIcon}  // right button icon
      menuItems = {["button1" , "button2" , "button3"]}  // buttons in menu
      sceneStyle={{}}  // style
    />



// other props :

    navbarStyle : {{}}

    style for navigation bar can be passed through this property


    statusBarColor :  'cyan'

    Use this to change statusBar color in Android


    statusBarStyle ={"light-content"}

    Use this to change status bar style in iOS , Check possible values in official react native doc https://facebook.github.io/react-native/docs/statusbar.html#barstyle

