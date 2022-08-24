import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import List from './List';
import {Color} from '../utils';
import {Row, Col} from 'react-native-responsive-grid-system';

const ContactLists = ({data}) => {
  const list = ({item}) => (
    <List
      container={true}
      avatar={{url: item.photo == 'N/A' ? null : item.photo}}
      title={`${item.firstName} ${item.lastName}`}
      firstDesc={`Age: ${item.age}`}
      accent={Color.dark}
    />
  );
  return (
    <Row>
      <Col xs={12}>
        <FlatList
          contentContainerStyle={{paddingBottom: 50}}
          data={data}
          renderItem={list}
          keyExtractor={item => item.id}
        />
      </Col>
    </Row>
  );
};

export default ContactLists;

const styles = StyleSheet.create({});
