import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Ripple from 'react-native-material-ripple';
import {Color} from '../utils';
import {Add} from '../assets/imgs';

const FloatingButton = ({onScale, ...props}) => {
  const scale = useRef(new Animated.Value(onScale)).current;
  const buttonSize = 60;

  useEffect(() => {
    animate();
  }, [onScale]);

  const animate = () => {
    Animated.spring(scale, {
      toValue: onScale,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const btnStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: 30,
    backgroundColor: Color.primary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  };

  return (
    <Animated.View style={[btnStyle, {transform: [{scale}]}]}>
      <Ripple
        rippleDuration={600}
        rippleColor={Color.softPrimary}
        rippleContainerBorderRadius={35}
        {...props}>
        <Add width={25} />
      </Ripple>
    </Animated.View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({});
