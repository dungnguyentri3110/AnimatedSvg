import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Svg, Path, Circle} from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('screen');
const AnimatedSVG = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

const tabWidth = width / 4;

class Tab extends Component {
  animated = new Animated.Value(this.props.index === 0 ? 1 : 0);

  shouldComponentUpdate(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      if (nextProps.currentIndex !== this.props.index) {
        Animated.spring(this.animated, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      } else {
        Animated.spring(this.animated, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 0,
        }).start();
      }
    }
    return true;
  }

  onPressMoveTab = () => {
    this.props.onPressMoveTab(this.props.index);
    Animated.spring(this.animated, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  render() {
    const {index} = this.props;
    const translateY = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -26],
    });
    let iconName = 'home';
    if (index === 1) {
      iconName = 'search1';
    } else if (index === 2) {
      iconName = 'bells';
    } else if (index === 3) {
      iconName = 'user';
    }
    return (
      <TouchableOpacity
        style={styles.buttonTab}
        key={index}
        onPress={this.onPressMoveTab}>
        <Animated.View style={[styles.viewTab, {transform: [{translateY}]}]}>
          <AntDesign name={iconName} size={20} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

export default class AnimatedSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.animatedMove = new Animated.Value(-width);
    this.animatedCircle = new Animated.Value(0);
    this.index = 0;
  }

  onPressMoveTab = (index) => {
    if (this.state.currentIndex !== index) {
      this.animatedCircle.setValue(0);
      Animated.spring(this.animatedMove, {
        toValue: -width + index * tabWidth,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      Animated.spring(this.animatedCircle, {
        toValue: 2,
        bounciness: 0,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          this.animatedCircle.setValue(0);
        }
      });
      this.setState({currentIndex: index});
    }
  };

  renderTab = (item, index) => {
    return (
      <Tab
        onPressMoveTab={this.onPressMoveTab}
        index={index}
        key={index}
        currentIndex={this.state.currentIndex}
      />
    );
  };

  render() {
    const translateY = this.animatedCircle.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 50, 0],
    });
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.viewContent}>
            <Text onPress={this.onPressMoveTab}>Pressssssssssss</Text>
          </View>
          <AnimatedSVG
            width={`${width * 2}`}
            height="80"
            style={[
              styles.containerSvg,
              {transform: [{translateX: this.animatedMove}]},
            ]}>
            <Path
              d={`M0,55 L${width},55 Q${width + tabWidth / 2},110 ${
                width + tabWidth
              },55 L${width * 2}, 55`}
              strokeLinejoin="round"
              stroke="white"
              strokeWidth={50}
            />
            <AnimatedCircle
              cx={`${width + tabWidth / 2}`}
              cy={30}
              r={20}
              fill={'white'}
              style={{transform: [{translateY}]}}
            />
          </AnimatedSVG>
          <View style={styles.wrapperBottomTabBar}>
            {data.map(this.renderTab)}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSvg: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 0,
  },
  viewContent: {
    flex: 1,
    backgroundColor: '#F2EFF3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperBottomTabBar: {
    width: width,
    height: 75,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
  buttonTab: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  viewTab: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
