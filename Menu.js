
import React, {Component} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import {getNavbarHeight , getHeight ,getWidth } from './Navbar';
import MenuItem from './MenuItem';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      shouldBlock: false
    }
  }

  _animateOut = () => Animated.timing(this.state.opacity, {toValue: 0, duration: 200});
  _animateIn = () => Animated.timing(this.state.opacity, {toValue: 1, duration: 200});

  _itemSelected = (item) => () => {
    this._animateOut().start(() => {
      this.props.onItemSelected(item);
      this.props.closeMenu();
    });
  };

  componentDidMount = () => {
    this._animateIn().start(() => this.setState({shouldBlock: true}));
  };

  _overlayClicked = () => {
    this._animateOut().start(() => {
      if (this.state.shouldBlock) {
        this.props.closeMenu();
      }
    });
  };

  render() {
    const {menuItems} = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={this._overlayClicked}>
        {menuItems ? <View
          style={styles.wrapper}>
          <Animated.View style={[styles.menu, {opacity: this.state.opacity}]}>
            { menuItems
              .map((item) =>  <MenuItem itemName = {item}
                                        onItemSelected ={this.props.onItemSelected}
                                        closeMenu={this.props.closeMenu}/>)}
          </Animated.View>
        </View> : <View/>}
      </TouchableWithoutFeedback>
    );
  }
}

const menuStyle = {
  position: 'absolute',
  top: getNavbarHeight(),
  right: 20,
  width: 168,
  backgroundColor: 'white'
};

if(Platform.OS === 'android') {
  Object.assign(menuStyle, {
    borderWidth: 1,
    borderColor: '#e6e6e6'
  });
} else {
  Object.assign(menuStyle, {
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: .5,
    shadowOffset: {
      height: 2,
      width: 0
    }
  })
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    height: getHeight(),
    width: getWidth()
  },
  menu: menuStyle
});
