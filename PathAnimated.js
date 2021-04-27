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

export default class PathAnimated extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animated = new Animated.Value(0);
    this.count = 0;
  }

  onPressMoveTab = () => {
    this.count += 1;
    if (this.count == 4) this.count = 0;
    Animated.timing(this.animated, {
      toValue: this.count,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // `M0,0 L${lineToX},00  A 10,10 0 0 1 ${lineToX + 5},5 C${
  //   lineToX + 5
  // },5 ${lineToX + 35},80 ${lineToX + 65},5 A 10,10 0 0 1 ${
  //   lineToX + 70
  // },0 L${width * 2},0`

  render() {
    const translateX = this.animated.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [
        -width,
        -(width - tabBarWidth),
        -(width - tabBarWidth * 2),
        -(width - tabBarWidth * 3),
      ],
    });
    const lineToX = TabPosition + tabBarWidth / 2 + 15;
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D53D53',
          }}>
          <TouchableOpacity
            style={styles.parent}
            onPress={this.onPressMoveTab}
          />
        </View>
        {/* <View
          style={{
            width: '100%',
            height: 60,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, backgroundColor: 'green'}}></View>
          <View style={{flex: 1, backgroundColor: 'yellow'}}></View>
          <View style={{flex: 1, backgroundColor: 'blue'}}></View>
          <View style={{flex: 1}}></View>
        </View> */}
        <View
          style={{position: 'absolute', bottom: 0, backgroundColor: 'white'}}>
          <AnimatedSvg
            width={`${width * 2}`}
            height={'50'}
            style={{transform: [{translateX}]}}>
            <Path
              // stroke={'red'}
              fill="#D53D53"
              // strokeWidth={2}
              d={`M0,0 L${lineToX},00  A 10,10 0 0 1 ${lineToX + 5},5 C${
                lineToX + 5
              },5 ${lineToX + 35},80 ${lineToX + 65},5 A 10,10 0 0 1 ${
                lineToX + 70
              },0 L${width * 2},0`}>
                
              </Path>
            {/* <AnimatedCircle
              cx={`${width + 47}`}
              cy="20"
              r="20"
              fill="pink"
              style={{transform: [{translateY: 100}]}}
            /> */}
            <View style={styles.viewIcon} />
          </AnimatedSvg>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    width: 200,
    height: 40,
    backgroundColor: 'yellow',
  },
  viewIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'yellow',
    position: 'absolute',
  },
});
