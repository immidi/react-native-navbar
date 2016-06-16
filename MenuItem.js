/**
 * Created by abhisheksingh on 15/06/16.
 */


import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {getNavbarHeight , getHeight ,getWidth } from './Navbar';

export default class MenuItem extends Component {

  constructor(props) {
    super(props);
  }

  _itemSelected = (item) => () => {
    this.props.onItemSelected(item);
    this.props.closeMenu();
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

const styles = StyleSheet.create({
  menuItem: {
    color: 'rgb(202, 19, 31)',
    marginHorizontal: 20,
    marginVertical: 10
  }
});
