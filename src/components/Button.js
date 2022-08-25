import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {Color} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({
  children,
  iconLeft,
  iconRight,
  disabled,
  loading,
  bgColor,
  color,
  rounded,
  size,
  borderColor,
  ...props
}) => {
  const btnStyle = {
    backgroundColor: bgColor ? bgColor : '',
    minHeight: size == 'sm' ? 35 : size == 'lg' ? 60 : 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: size == 'sm' ? 15 : size == 'lg' ? 30 : 20,
    borderWidth: borderColor ? 1 : 0,
    borderColor: borderColor,
    borderRadius: rounded ? 100 : 20,
  };

  const textStyle = {
    color: color ? color : Color.gray,
    fontFamily: 'Poppins-Bold',
    fontSize: size == 'sm' ? 14 : size == 'lg' ? 20 : 18,
  };

  const iconLeftStyle = {
    marginRight: iconLeft ? 5 : 0,
  };

  const iconRightStyle = {
    marginLeft: iconRight ? 5 : 0,
  };

  const loadingColor = color ? color : Color.gray;

  const ButtonRender = () => (
    <>
      <Icon
        style={iconLeftStyle}
        name={iconLeft}
        size={size == 'sm' ? 16 : size == 'lg' ? 25 : 20}
        color={color ? color : Color.gray}
      />
      <Text style={textStyle}>{children}</Text>
      <Icon
        style={iconRightStyle}
        name={iconRight}
        size={size == 'sm' ? 16 : size == 'lg' ? 25 : 20}
        color={color ? color : Color.gray}
      />
    </>
  );

  return (
    <Ripple
      rippleDuration={600}
      rippleColor={Color.softPrimary}
      rippleContainerBorderRadius={rounded ? 50 : 20}
      style={btnStyle}
      disabled={disabled}
      {...props}>
      {loading ? <ActivityIndicator color={loadingColor} /> : <ButtonRender />}
    </Ripple>
  );
};

export default Button;

const styles = StyleSheet.create({});
