import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import Avatar from './Avatar';

const List = ({
  container,
  accent,
  iconLeft,
  iconRight,
  title,
  firstDesc,
  secondDesc,
  avatar,
  ...props
}) => {
  const [desc, setDesc] = useState(false);

  useEffect(() => {
    let start = true;
    if (start) {
      if (firstDesc != null || secondDesc != null) {
        setDesc(true);
      }
    }
    return (start = false);
  }, []);

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
    <Ripple
      {...props}
      rippleColor={Color.gray}
      style={{paddingHorizontal: container ? 20 : 0}}>
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
              size={60}
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
  );
};

export default List;

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: 'row',
    // marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.gray,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
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
    color: Color.dark,
  },
  textSecondDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Color.dark,
  },
});
