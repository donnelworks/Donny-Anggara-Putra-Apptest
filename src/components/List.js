import React, {useEffect, useState, useRef} from 'react';
import Interactable from 'react-native-interactable';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Color} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import Avatar from './Avatar';
import {Delete, Edit} from '../assets/imgs';

const List = ({
  container,
  accent,
  iconLeft,
  iconRight,
  title,
  firstDesc,
  secondDesc,
  avatar,
  swipeable,
  onEdit,
  onDelete,
  ...props
}) => {
  const [desc, setDesc] = useState(false);
  const [deltaX, setDeltaX] = useState(new Animated.Value(0));
  const [deltaY, setDeltaY] = useState(new Animated.Value(0));
  const interactRef = useRef(null);

  useEffect(() => {
    let start = true;
    if (start) {
      if (firstDesc != null || secondDesc != null) {
        setDesc(true);
      }
    }
    return (start = false);
  }, []);

  const deleteOption = () => {
    interactRef.current.snapTo({index: 0});
    onDelete();
  };

  const editOption = () => {
    interactRef.current.snapTo({index: 0});
    onEdit();
  };

  const iconLeftWrapper = {
    padding: iconLeft ? 5 : 0,
    justifyContent: 'center',
  };

  const iconRightWrapper = {
    padding: iconRight ? 5 : 0,
    justifyContent: 'center',
  };

  const avatarWrapper = {
    padding: avatar ? 5 : 0,
    justifyContent: 'center',
  };

  const textJudul = {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: accent ? accent : Color.dark,
  };

  return (
    <View style={styles.listContainer}>
      <View style={{backgroundColor: Color.primary}}>
        {/* Back */}
        <View
          style={{
            position: 'absolute',
            right: 0,
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Animated.View
            style={[
              styles.button,
              {
                opacity: deltaX.interpolate({
                  inputRange: [-165, -165, -115, -115],
                  outputRange: [1, 1, 0, 0],
                }),
                transform: [
                  {
                    scale: deltaX.interpolate({
                      inputRange: [-165, -165, -115, -115],
                      outputRange: [1, 1, 0.8, 0.8],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity onPress={() => deleteOption()}>
              <Delete />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.button,
              {
                opacity: deltaX.interpolate({
                  inputRange: [-100, -100, -50, -50],
                  outputRange: [1, 1, 0, 0],
                }),
                transform: [
                  {
                    scale: deltaX.interpolate({
                      inputRange: [-100, -100, -50, -50],
                      outputRange: [1, 1, 0.8, 0.8],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity onPress={() => editOption()}>
              <Edit />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Cover */}
        <Interactable.View
          ref={interactRef}
          horizontalOnly={true}
          snapPoints={[{x: 0}, {x: -165}]}
          boundaries={{right: 0}}
          // onSnap={this.onDrawerSnap}
          animatedValueX={deltaX}
          animatedValueY={deltaY}>
          <Ripple
            {...props}
            disabled={swipeable ? true : false}
            rippleColor={Color.softDark}
            style={{
              paddingHorizontal: container ? 20 : 0,
              backgroundColor: Color.white,
            }}>
            <View style={styles.listWrapper}>
              <View style={iconLeftWrapper}>
                <Icon
                  name={iconLeft}
                  size={30}
                  color={accent ? accent : Color.dark}
                />
              </View>

              {avatar && (
                <View style={avatarWrapper}>
                  <Avatar
                    size={55}
                    bgColor={Color.softPrimary}
                    color={Color.primary}
                    url={avatar.url}
                    icon={avatar.icon}>
                    {title}
                  </Avatar>
                </View>
              )}

              <View style={styles.contentWrapper}>
                <View style={styles.itemCenter}>
                  <Text style={textJudul}>{title}</Text>
                  <View style={styles.descWrapper}>
                    {desc && (
                      <View style={styles.firstDescWrapper}>
                        <Text style={styles.textFirstDesc} numberOfLines={1}>
                          {firstDesc}
                        </Text>
                      </View>
                    )}
                    {desc && (
                      <View style={styles.secondDescWrapper}>
                        <Text style={styles.textSecondDesc} numberOfLines={1}>
                          {secondDesc}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              <View style={iconRightWrapper}>
                <Icon name={iconRight} size={25} color={Color.softDark} />
              </View>
            </View>
          </Ripple>
        </Interactable.View>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Color.softGray,
  },
  listWrapper: {
    flexDirection: 'row',
    // marginTop: 10,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  itemCenter: {
    flex: 1,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  descWrapper: {
    flexDirection: 'row',
  },
  firstDescWrapper: {
    flex: 1,
    paddingRight: 5,
  },
  secondDescWrapper: {
    flex: 1,
    paddingRight: 5,
    alignItems: 'flex-end',
  },
  textFirstDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Color.softDark,
  },
  textSecondDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Color.softDark,
  },
  button: {
    width: 40,
    height: 40,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
