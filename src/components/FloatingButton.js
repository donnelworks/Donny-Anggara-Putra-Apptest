import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Ripple from 'react-native-material-ripple';
import {Color} from '../utils';
import {Add} from '../assets/imgs';
import {useSelector} from 'react-redux';

const FloatingButton = ({...props}) => {
  const scaled = useSelector(state => state.scroll.scroll);

  const scale = useRef(new Animated.Value(scaled)).current;
  const buttonSize = 60;

  useEffect(() => {
    animate();
  }, [scaled]);

  const animate = () => {
    Animated.spring(scale, {
      toValue: scaled,
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
