import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color} from '../utils';

const Header = ({title}) => {
  return (
    <Row rowStyles={styles.headerRow}>
      <Col xs={12} colStyles={styles.headerCol}>
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
