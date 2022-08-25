import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Color} from '../utils';

const LoadingScreen = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Color.primary} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: 100,
  },
});
