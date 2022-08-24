import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Color} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {initial} from '../helpers';

const Avatar = ({
  size,
  bgColor,
  color,
  url,
  icon,
  editable,
  borderColor,
  ...props
}) => {
  const editImage = () => {
    if (editable) {
      alert('Edit Image');
    }
  };

  const avatarStyle = {
    width: size,
    height: size,
    backgroundColor: url ? 'transparent' : bgColor,
    borderRadius: size / 0.5,
    borderWidth: borderColor ? 3 : 0,
    borderColor: borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: 999,
  };

  const textStyle = {
    marginTop: 6,
    fontSize: size / 2.5,
    fontFamily: 'Poppins-SemiBold',
    color: color,
  };

  const editStyle = {
    width: size / 2.5,
    height: size / 2.5,
    backgroundColor: Color.black,
    opacity: 0.8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  };

  return (
    <>
      <Pressable onPress={() => editImage()}>
        <View style={avatarStyle} {...props}>
          {url ? (
            <Image source={{uri: url}} style={imageStyle} />
          ) : icon ? (
            <Icon name={icon} size={size / 2} color={Color.primary} />
          ) : (
            <Text style={textStyle}>{initial(props.children)}</Text>
          )}
          {editable && (
            <View style={editStyle}>
              <Icon
                name="image-edit-outline"
                size={size / 4.5}
                color={Color.white}
              />
            </View>
          )}
        </View>
      </Pressable>
    </>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
