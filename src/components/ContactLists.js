import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import List from './List';
import {Color} from '../utils';
import {Row, Col} from 'react-native-responsive-grid-system';
import Container from './Container';
import {useDispatch} from 'react-redux';
import {scrolling} from '../redux/scrollSlice';

const ContactLists = ({data, onDelete, onEdit, onScroll}) => {
  const dispatch = useDispatch();
  const list = ({item}) => (
    <List
      swipeable
      onPress={() => console.log('oke')}
      container={true}
      avatar={{url: item.photo == 'N/A' ? null : item.photo}}
      title={`${item.firstName} ${item.lastName}`}
      firstDesc={`Age: ${item.age}`}
      accent={Color.dark}
      onDelete={() => onDelete(item.id)}
      onEdit={() => onEdit(item.id)}
    />
  );
  return (
    <Container>
      <Row>
        <Col xs={12}>
          {data.length != 0 ? (
            <FlatList
              contentContainerStyle={{paddingBottom: 50}}
              data={data}
              renderItem={list}
              keyExtractor={item => item.id}
              onScrollBeginDrag={() => dispatch(scrolling(0))}
              onScrollEndDrag={() => dispatch(scrolling(1))}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <Text style={styles.textEmpty}>Data not available</Text>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ContactLists;

const styles = StyleSheet.create({
  textEmpty: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: Color.softDark,
    fontSize: 14,
  },
});
