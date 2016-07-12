# react-native-navbar
Navigation bar component for react native




Example Use:- 

         import NavbarWrapper from 'react-native-navbar-wrapper';
                  
Inside render function 

         <NavbarWrapper
            hasBack={true}   // true or false
            backPressed={this.backPressed}
            show={true}   //  true or false
            title={"App title "}
            openMenu={this.openMenu}
            closeMenu = {this.closeMenu}
            initialRoute={{name:'PageOne', title:'Page One'}}
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


#Required Properties:-
#<h4>renderScene<h4>
<p>renderScene function, something like-> </p>
         renderScene = (route, navigator) =>{
             switch(route.name) {
               case "pageOne":
                 return (<PageOne  navigator={navigator} route={route} />);
               case "pageTwo":
                 return (<PageTwo  navigator={navigator} route={route}/>);
             }
           };

#<h4>configureScene<h4>
<p>configureScene function , example</p>  
     configureScene = () => {
       return Navigator.SceneConfigs.FloatFromRight;
     };
#<h4>initialRoute<h4>
<p>initialRoute, example</p>   
     initialRoute = {name: 'pageOne'}
#<h4>sceneStyle<h4>
<p>scene style, eg:</p>  
          sceneStyle={{flex:1, backgroundColor:'white'}}


#Optional Properties:- 

#<h4>hasBack<h4>
<p>True to enable back button otherwise false</p>
#<h4>backPressed<h4>
<p>Handler function for back button clicked</p>

#<h4>setNavigator<h4>
<p>setNavigator function , use this as callback function to set navigator reference for example:</p>
      _setNavigator = (nav) =>{
         this.navigator = nav;
      };

style for navigation bar can be passed through this property

    navbarStyle : {{}}
    
Use this to change statusBar color in Android

    statusBarColor :  'cyan'
    
 Use this to change status bar style in iOS , Check possible values in official react native doc https://facebook.github.io/react-native/docs/statusbar.html#barstyle
         
    statusBarStyle ={"light-content"}
    
Menu in right side is optional 
to set menuIcon pass reference of image in this parameter 

     menuIcon = {menuIconRef} 
     
List of action button in menu  

    menuItems = {["button1" , "button2" , "button3"]}  



