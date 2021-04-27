/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {Svg, Path} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default class App extends React.Component {
  animatedLine = new Animated.Value(0);
  animatedCheck = new Animated.Value(0);
  animatedSpring = new Animated.Value(1);
  state = {
    offset: 380,
  };

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.animatedLine, {
        toValue: 2,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedCheck, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const strokeDasharray = 320;
    const strokeDasharrayCheck = 90;
    const translate = this.animatedLine.interpolate({
      inputRange: [0, 2],
      outputRange: [strokeDasharray, 0],
    });
    const translateCheck = this.animatedCheck.interpolate({
      inputRange: [0, 1],
      outputRange: [strokeDasharrayCheck, 0],
    });
    return (
      <View style={styles.container}>
        <Svg width={`${width}`} height={`${height}`}>
          <AnimatedPath
            d={'M50,300 A 50,50 0 1 1 50,301'}
            stroke={'green'}
            strokeWidth={5}
            fill="none"
            strokeDasharray={[strokeDasharray]}
            strokeDashoffset={translate}
            strokeLinecap="round"
          />
          <AnimatedPath
            d={'M75,300 L90,315 L125,275'}
            stroke={'blue'}
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={[strokeDasharrayCheck]}
            strokeDashoffset={translateCheck}
          />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
