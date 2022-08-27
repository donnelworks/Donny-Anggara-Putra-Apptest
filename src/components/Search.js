import {StyleSheet, TextInput, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-native-responsive-grid-system';
import {Color} from '../utils';

const Search = ({onSearch}) => {
  const [focus, setFocus] = useState(false);

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

  return (
    <Row rowStyles={styles.searchContainer}>
      <Col xs={12} colStyles={styles.searchCol}>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
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
