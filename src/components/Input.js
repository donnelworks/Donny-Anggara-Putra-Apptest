import React, {useState, useEffect} from 'react';
import {TextInput, View, Animated, Keyboard} from 'react-native';
import {Color} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';

const Input = ({
  label,
  value,
  iconRight,
  iconLeft,
  secure,
  outline,
  lg,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [iconSecure, setIconSecure] = useState('eye-outline');
  const [secureText, setSecureText] = useState(secure);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  useEffect(() => {
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    });

    return () => {
      hideKeyboard.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: focus || value != '' ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [focus, value]);

  const labelStyle = {
    fontFamily: 'Poppins-Medium',
    backgroundColor: Color.white,
    paddingHorizontal: 5,
    color: focus ? Color.primary : Color.gray,
    position: 'absolute',
    left: 5,
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: lg ? [14, -12] : [13, -8],
    }),
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: lg ? [18, 14] : [14, 12],
    }),
    zIndex: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const inputStyle = {
    fontSize: lg ? 18 : 14,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: lg ? 13 : 10,
    minHeight: lg ? 55 : 45,
    color: Color.primary,
    position: 'relative',
  };

  const iconLeftStyle = {
    padding: iconLeft ? 5 : 0,
    justifyContent: 'center',
  };

  const iconRightStyle = {
    padding: iconRight ? 5 : 0,
    justifyContent: 'center',
  };

  const secureStyle = {
    padding: iconRight ? 5 : 0,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const wrapperStyle = {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: outline ? 2 : 1,
    borderWidth: outline ? 2 : 0,
    borderRadius: outline ? 10 : 0,
    borderColor: focus ? Color.primary : Color.gray,
  };

  const handleSecure = () => {
    if (secureText == true) {
      setIconSecure('eye-off-outline');
      setSecureText(false);
    } else {
      setIconSecure('eye-outline');
      setSecureText(true);
    }
  };

  return (
    <View style={wrapperStyle}>
      <View style={iconLeftStyle}>
        <Icon name={iconLeft} size={25} color={Color.primary} />
      </View>
      <View style={{flex: 1}}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          value={value}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secure ? secureText : false}
          onSubmitEditing={Keyboard.dismiss}
          {...props}
        />
      </View>
      {secure ? (
        <Ripple
          style={secureStyle}
          rippleColor={Color.gray}
          rippleContainerBorderRadius={50}
          onPress={() => handleSecure()}>
          <Icon name={iconSecure} size={25} color={Color.primary} />
        </Ripple>
      ) : (
        <View style={iconRightStyle}>
          <Icon name={iconRight} size={25} color={Color.primary} />
        </View>
      )}
    </View>
  );
};

export default Input;
