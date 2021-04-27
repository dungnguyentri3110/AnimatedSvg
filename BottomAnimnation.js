import React, {Component} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {Svg, Path, Circle} from 'react-native-svg';
const {width, height} = Dimensions.get('window');
let tabBarWidth = width / 4;

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const TabPosition = width - 50;

export default class BottomAnimnation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animated = new Animated.Value(1);
    this.icon1 = new Animated.Value(1);
    this.icon2 = new Animated.Value(0);
    this.icon3 = new Animated.Value(0);
    this.icon4 = new Animated.Value(0);
    this.count = 1;
  }

  onPressMoveTab = (num) => () => {
    Animated.timing(this[`icon${this.count}`], {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.animated, {
      toValue: num,
      speed: 12,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
    clearTimeout(this.timeMove);
    this.timeMove = setTimeout(() => {
      Animated.timing(this[`icon${num}`], {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start((finish) => {
        this.count = num;
      });
    }, 100);
  };

  render() {
    const translateX = this.animated.interpolate({
      inputRange: [1, 2, 3, 4],
      outputRange: [
        -width + 10,
        -(width - tabBarWidth - 10),
        -(width - tabBarWidth * 2 - 10),
        -(width - tabBarWidth * 3 - 10),
      ],
    });
    const lineToX = TabPosition + tabBarWidth / 2;
    let path = `M0,15 L${lineToX},15 A 0,60 0 0 1 ${lineToX + 80},15 L${
      width * 5
    },15`;

    const transIcon1 = this.icon1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -6],
    });
    const transIcon2 = this.icon2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -6],
    });
    const transIcon3 = this.icon3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -6],
    });
    const transIcon4 = this.icon4.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -6],
    });

    return (
      <View styles={styles.container}>
        <View style={styles.viewScreen}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressMoveTab}
          />
        </View>
        <View style={styles.parentBottomMenu}>
          <View
            style={{
              position: 'absolute',
              width,
              height: 60,
              backgroundColor: '#D53D53',
            }}
          />
          <AnimatedSvg
            width={`${width * 2}`}
            height={'60'}
            style={{transform: [{translateX}]}}>
            <Path d={`${path}`} stroke="grey" strokeWidth={1} fill={'white'} />
          </AnimatedSvg>
          <View style={styles.wrapperTabBar}>
            <TouchableOpacity
              style={styles.buttonTab}
              onPress={this.onPressMoveTab(1)}>
              <Animated.View
                style={[
                  styles.viewIcon,
                  {transform: [{translateY: transIcon1}]},
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTab}
              onPress={this.onPressMoveTab(2)}>
              <Animated.View
                style={[
                  styles.viewIcon,
                  {transform: [{translateY: transIcon2}]},
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTab}
              onPress={this.onPressMoveTab(3)}>
              <Animated.View
                style={[
                  styles.viewIcon,
                  {transform: [{translateY: transIcon3}]},
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTab}
              onPress={this.onPressMoveTab(4)}>
              <Animated.View
                style={[
                  styles.viewIcon,
                  {transform: [{translateY: transIcon4}]},
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewScreen: {
    width,
    height: height - 60,
    backgroundColor: '#D53D53',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentBottomMenu: {
    width: width,
    height: 60,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: 'yellow',
  },
  wrapperTabBar: {
    width,
    height: 60,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
  buttonTab: {
    flex: 1,
    alignItems: 'center',
  },
  viewIcon: {
    width: 35,
    height: 35,
    backgroundColor: 'blue',
    borderRadius: 100,
    position: 'absolute',
    bottom: 5,
  },
});
