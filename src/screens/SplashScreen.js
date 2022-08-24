import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Container} from '../components';
import {Color} from '../utils';
import {Logo} from '../assets/imgs';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  });
  return (
    <Container bgColor={Color.primary} centered>
      <Logo width={150} />
    </Container>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
