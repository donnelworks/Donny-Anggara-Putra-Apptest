import React from 'react';
import {SafeAreaView} from 'react-native';
import {Color} from '../utils';

const Container = ({bgColor, centered, children}) => {
  const containerStyle = {
    flex: 1,
    justifyContent: centered && 'center',
    alignItems: centered && 'center',
    backgroundColor: bgColor ? bgColor : Color.white,
  };

  return <SafeAreaView style={containerStyle}>{children}</SafeAreaView>;
};

export default Container;
