import React, {Component} from 'react';
import {View, StyleSheet, Animated, Easing, Text} from 'react-native';
import {Svg, Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default class AnimatedButtonPlay extends Component {
  static defaultProps = {
    size: 300,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.animated = new Animated.Value(0);
  }

  componentDidMount() {
    this.onPress();
  }

  onPress = () => {
    Animated.loop(
      Animated.timing(this.animated, {
        toValue: 4,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  render() {
    const size = 300;
    const waveIntensi = 10;
    const path = this.animated.interpolate({
      inputRange: [0, 1, 2, 3, 4],
      outputRange: [
        `M0,${size} L0,-${waveIntensi} Q${size / 6},0 ${
          size / 3
        },${waveIntensi} T${size * (2 / 3)},0 ${size},0 L${size},${size}`,
        `M0,${size} L0,0 Q${size / 6},-${waveIntensi} ${size / 3},0 T${
          size * (2 / 3)
        },${waveIntensi} ${size},-${waveIntensi} L${size},${size}`,
        `M0,${size} L0,${waveIntensi} Q${size / 6},0 ${
          size / 3
        },-${waveIntensi} T${size * (2 / 3)},0 ${size},0 L${size},${size}`,
        `M0,${size} L0,0 Q${size / 6},${waveIntensi} ${size / 3},0 T${
          size * (2 / 3)
        },-${waveIntensi} ${size},${waveIntensi} L${size},${size}`,
        `M0,${size} L0,-${waveIntensi} Q${size / 6},0 ${
          size / 3
        },${waveIntensi} T${size * (2 / 3)},0 ${size},0 L${size},${size}`,
      ],
    });
    return (
      <View style={styles.container}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: 100,
            overflow: 'hidden',
          }}>
          <Svg
            width={`${size}`}
            height={`${size}`}
            style={{backgroundColor: 'cyan'}}>
            <AnimatedPath
              d={path}
              fill="blue"
              style={{transform: [{translateY: 150}]}}
            />
          </Svg>
        </View>
        <Text style={{fontFamily: 'rounded-mplus-1c-medium', fontSize: 30}}>
          75%
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {width: 250, height: 50, backgroundColor: 'red'},
});
