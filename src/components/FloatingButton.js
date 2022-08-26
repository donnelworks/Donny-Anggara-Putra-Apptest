import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Ripple from 'react-native-material-ripple';
import {Color} from '../utils';
import {Add} from '../assets/imgs';

const boxWidth = 100;

const FloatingButton = ({...props}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [scaled, setScaled] = useState(false);

  const animate = () => {
    Animated.spring(scale, {
      toValue: scaled ? 1 : 2,
      useNativeDriver: true,
    }).start();
    setScaled(!scaled);
  };

  const btnStyle = {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Color.primary,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  };

  return (
    <Ripple
      rippleDuration={600}
      rippleColor={Color.softPrimary}
      rippleContainerBorderRadius={35}
      style={btnStyle}
      {...props}>
      <Add />
    </Ripple>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({});
