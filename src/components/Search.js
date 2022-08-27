import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color} from '../utils';

const Search = ({onSearch}) => {
  return (
    <Row rowStyles={styles.searchContainer}>
      <Col xs={12} colStyles={styles.searchCol}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contact"
          placeholderTextColor={Color.gray}
          onChangeText={key => onSearch(key)}
        />
      </Col>
    </Row>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchCol: {
    height: 50,
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: Color.softGray,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    paddingHorizontal: 16,
    color: Color.primary,
    borderRadius: 15,
  },
});
