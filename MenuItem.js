/**
 * Created by abhisheksingh on 15/06/16.
 */


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

export default class MenuItem extends Component {

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
    closeMenu: React.PropTypes.func.isRequired
  };

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
    const {itemName} = this.props;
    return (
        <TouchableOpacity underlayColor="white" onPress={this._itemSelected(itemName)}>
          <Text style={styles.menuItem}>{itemName}</Text>
        </TouchableOpacity>
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
  menu: menuStyle,
  menuItem: {
    color: 'rgb(202, 19, 31)',
    marginHorizontal: 20,
    marginVertical: 10
  }
});
