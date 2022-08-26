import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color} from '../utils';
import {Back} from '../assets/imgs';

const Header = ({title, isHome = false, ...props}) => {
  return (
    <Row rowStyles={styles.headerRow}>
      {!isHome && (
        <Col xs={2} colStyles={styles.headerCol}>
          <TouchableOpacity {...props}>
            <Back />
          </TouchableOpacity>
        </Col>
      )}
      <Col xs={isHome ? 12 : 10} colStyles={styles.headerCol}>
        <Text style={styles.textTitle}>{title}</Text>
      </Col>
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: 20,
  },
  headerCol: {
    height: 80,
    justifyContent: 'center',
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Color.dark,
  },
});
