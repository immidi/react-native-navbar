/**
 * Created by abhisheksingh on 03/06/16.
 */

import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Animated,
  StyleSheet
} from 'react-native';

export default class MenuButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1)
    }
  };

  static propTypes = {
    onPress: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
  };

  componentWillUpdate = (nextProps) => {
    if (!this.props.show && nextProps.show ) {
      Animated.timing(this.state.opacity, {toValue: 1, duration: 100}).start();
    } else if (this.props.show && !nextProps.show) {
      Animated.timing(this.state.opacity, {toValue: 0, duration: 100}).start();
    }
  };

  render() {
    const {menuIcon} = this.props;
    return (
      <Animated.View style={{opacity: this.state.opacity}}>
        <TouchableOpacity style={this.props.style}
                          onPress={this.props.onPress}>
          {menuIcon ?
            <Image style={styles.menu} source={menuIcon}/> : null
          }
        </TouchableOpacity>
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  menu: {
    alignSelf: 'flex-end',
    marginRight: 10
  }
});