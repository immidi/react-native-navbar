/**
 * Created by abhisheksingh on 03/06/16.
 */


import React , {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  BackAndroid,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Platform
} from 'react-native';

import MenuButton from './MenuButton.js';

export function getWidth() {
  const { width } = Dimensions.get('window');
  return width;
}
export function getHeight() {
  const { height } = Dimensions.get('window');
  return height;
}

const width = getWidth();
const NAV_HEIGHT = (Platform.OS === 'android' ? 48 : 44);
const STATUSBAR_HEIGHT = (Platform.OS === 'android' ? 0 : 20);

export function getNavbarHeight() {
  return (Platform.OS === 'android' ? 48 : 44) + (Platform.OS === 'android' ? 0 : 20);
}

export default class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backButtonOpacity: new Animated.Value(0),
      showMenu: false
    };
  }

  static propTypes = {
    backPressed: React.PropTypes.func.isRequired,
    hasBack: React.PropTypes.bool.isRequired,
    show: React.PropTypes.bool,
    title: React.PropTypes.string,
    openMenu: React.PropTypes.func.isRequired
  };

  componentDidMount = () => {
    if (StatusBar && Platform.OS === 'ios') {
      StatusBar.setBarStyle('default', true);
    }

    if (BackAndroid) {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (this.props.hasBack) {
          this.props.backPressed();
          return true;
        } else {
          return false;
        }
      });
    }
  };

  componentWillUpdate = (nextProps) => {
    if (!this.props.hasBack  && nextProps.hasBack) {
      Animated.timing(this.state.backButtonOpacity, {
        toValue: 1,
        duration: 100
      }).start();
    } else if (this.props.hasBack && !nextProps.hasBack) {
      Animated.timing(this.state.backButtonOpacity, {
        toValue: 0,
        duration: 200
      }).start();
    }
  };

  _backPressed = () => {
    if(this.props.backPressed()){
      Animated.timing(this.state.backButtonOpacity, {
        toValue: 0,
        duration: 200
      }).start();
    }
  };

  _openMenu = (event) => {
    event.stopPropagation();
    setTimeout(() => this.props.openMenu(), 0);
  };

  render() {
    const {title , navbarStyle} = this.props;
    return (
      <View style={[navbarStyle ? navbarStyle : styles.wrapper, {opacity: this.props.show ? 1 : 0}]}>
        <View style={styles.main}>
          <View style={styles.backgroundWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            { Platform.OS === 'ios' ?
              <TouchableOpacity style={styles.menuWrapper} onPress={this._backPressed}>
                <Animated.Image
                  style={[styles.back, {opacity: this.state.backButtonOpacity}]}
                  source={require('./assets/ic_back_arrow.png')}/>
              </TouchableOpacity> : <View /> }
            <MenuButton style={styles.menuWrapper} show={this.props.show} onPress={this._openMenu}/>
          </View>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  back: {
    width: 14,
    height: 20,
    marginHorizontal: 10
  },
  buttonWrapper: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuWrapper: {
    height: NAV_HEIGHT,
    width: 50,
    justifyContent: 'center',
    overflow: 'visible'
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: getWidth(),
    height: getHeight()
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    overflow: 'visible',
    backgroundColor: '#19FCE4',
    borderRadius: 2,
    width,
    height: getNavbarHeight(),
    alignItems:'center'
  },
  main: {
    top: STATUSBAR_HEIGHT,
    width,
    height: NAV_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backgroundWrapper: {
    position: 'absolute',
    width,
    height: NAV_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    width: width * .4,
    justifyContent: 'space-between',
    /** to prevent a jump of the topbar on enter animation */
    marginRight: 5
  },
  title: {
    fontWeight: 'bold',
    color: "#ffffff",
    fontSize:20
  }
});

