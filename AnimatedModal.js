import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class ModalAnimated extends Component {
  animatedView = new Animated.Value(height);
  offset = 0;
  state = {
    visible: false,
    heightContent: 0,
  };

  constructor(props) {
    super(props);
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return false;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 0 && this.offset === 0;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return gestureState.dy > 0 && this.offset === 0;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animatedView.setOffset(this.animatedView._value);
        this.animatedView.setValue(1);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy >= 1) {
          this.animatedView.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) return;
        if (
          gestureState.dy >= 0 &&
          gestureState.dy <= this.state.heightContent * 0.35
        ) {
          Animated.spring(this.animatedView, {
            toValue: 0,
            bounciness: 0,
            speed: 20,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.timing(this.animatedView, {
            toValue: this.state.heightContent,
            duration: 200,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) {
              this.setState({visible: false, heightContent: 0});
            }
          });
        }
      },
    });
  }

  showModal = ({heightContent}) => {
    if (this.state.heightContent !== 0) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity,
          LayoutAnimation.Presets.linear,
        ),
      );
      this.setState({heightContent});
    } else {
      this.setState({visible: true, heightContent}, () => {
        Animated.spring(this.animatedView, {
          toValue: 0,
          bounciness: 0,
          speed: 20,
          useNativeDriver: false,
        }).start();
      });
    }
  };

  hideModal = () => {
    this.setState({visible: false});
  };

  onScroll = ({nativeEvent}) => {
    this.offset = nativeEvent.contentOffset.y;
  };

  onPressChangeHeight = () => {
    this.showModal({heightContent: 300});
  };

  render() {
    const {heightContent} = this.state;
    if (!this.state.visible) return <View />;
    return (
      <View style={styles.containerAnimated}>
        <Animated.View
          {...this.PanResponder.panHandlers}
          style={[
            styles.content,
            {
              transform: [{translateY: this.animatedView}],
              height: heightContent,
            },
          ]}>
          <View
            style={{position: 'absolute', width: width, paddingHorizontal: 40}}>
            <Text onPress={this.onPressChangeHeight}>CHANGE HEIGHT</Text>
          </View>
          <Animated.ScrollView
            bounces={false}
            onScroll={this.onScroll}
            scrollEventThrottle={16}>
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
            <View style={styles.viewItem} />
          </Animated.ScrollView>
        </Animated.View>
      </View>
    );
  }
}

export default class AnimatedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    this.ModalAnimated.showModal({heightContent: 500});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.onPress}> AnimatedModal </Text>
        <ModalAnimated ref={(refs) => (this.ModalAnimated = refs)} />
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
  containerAnimated: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  content: {
    width: width,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
    position: 'absolute',
    paddingTop: 60,
    overflow: 'hidden',
  },
  viewItem: {
    width: width - 40,
    height: 70,
    backgroundColor: 'green',
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
